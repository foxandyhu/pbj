from flask import Blueprint, redirect, current_app, render_template
from io import BytesIO
from utils import captch_utils, context_utils
from flask import make_response, request
from extensions import cache, logger
from services import system_service
from models import SysServer
import functools

webBp = Blueprint("webBp", __name__)


def NoCheckServerStatus(fun):
    """该函数作为目标函数的装饰器用来标识目标函数是否需要检测服务器状态"""

    @functools.wraps(fun)
    def no_check_server(*args, **kwargs):
        return fun()

    return no_check_server


from web.actions import index, flow_action


@webBp.app_context_processor
def context_processor_data():
    """处理模板公共数据"""

    SYSINFO, COPYRIGHT = "sysinfo", "copyright"
    sysinfo = cache.get(SYSINFO)
    if not sysinfo:
        sysinfo = system_service.SystemService.get_sys_info()
        cache.set(SYSINFO, sysinfo, 0)

    copyright = cache.get(COPYRIGHT)
    if not copyright:
        copyright = system_service.SystemService.get_sys_copyright()
        cache.set(COPYRIGHT, copyright, 0)

    return dict(sysinfo=sysinfo, copyright=copyright)


@webBp.before_request
def request_beofore():
    """请求拦截"""

    fun = current_app.view_functions[request.url_rule.endpoint]
    if fun.__code__.co_name != NoCheckServerStatus(None).__name__:
        if not check_server_enable():
            return redirect("/upgrade.html")


def check_server_enable():
    """检测网站是否访问"""
    return SysServer.get_instance().server_enable


@webBp.app_errorhandler(404)
def page_not_found(e):
    """404错误"""

    logger.error(f"{request.full_path} not found!")
    return redirect("/404.html")


@webBp.app_errorhandler(500)
def inner_error(e):
    """500错误"""

    logger.error(e)
    return redirect("/500.html")


@webBp.route("/404.html")
def page_404():
    """404页面"""

    return render_template("404.html")


@webBp.route("/500.html")
def page_500():
    """500页面"""

    return render_template("500.html")


@webBp.route("/upgrade.html")
@NoCheckServerStatus
def sys_upgrade():
    """系统升级提示页面"""

    sys_info = system_service.SystemService.get_sys_info()
    if sys_info:
        SysServer.get_instance().server_enable = sys_info.is_enable
        if sys_info.is_enable:
            return redirect("/index.html")
    return render_template("upgrade.html")


@webBp.route("/captch.html")
@NoCheckServerStatus
def get_captch():
    """生成验证码响应输出"""

    image, code = captch_utils.get_captch()

    buf = BytesIO()  # 图片以二进制形式写入
    image.save(buf, 'png')
    buf_str = buf.getvalue()

    response = make_response(buf_str)  # 把buf_str作为response返回前端，并设置首部字段
    response.headers['Content-Type'] = 'image/png'
    context_utils.put_to_session("captch", code)  # 将验证码字符串储存在session中
    return response
