from urllib.request import urlopen
from urllib.parse import urlencode
from utils import json_utils
from datetime import datetime
from utils.ip2Region import Ip2Region
import os


def get_city_ip(ip):
    """根据IP获得城市"""

    path = os.path.dirname(os.path.abspath(__file__))
    query = Ip2Region(os.path.join(path, "ip2region.db"))
    if not query.isip(ip):
        return None

    data = query.btreeSearch(ip)
    query.close()
    return data


def get_city_weather(name):
    """获取城市天气信息"""

    location = urlencode({"location": name})
    weather_url = "http://api.map.baidu.com/telematics/v3/weather?output=json&ak=1LrIn254h4UEd72vrMVFBsFf&" + location

    content = get_net_request(weather_url)
    if not content:
        return None
    content = json_utils.to_json_str(content)
    if "status" not in content or content.get("status") != "success":
        return None
    json = content.get("results")
    json = json[0]
    json = json.get("weather_data")

    json = json[0]
    pic = json.get("nightPictureUrl")
    hour = int(datetime.now().strftime("%H"))

    if hour >= 6 and hour <= 18:
        pic = json.get("dayPictureUrl")

    return dict(city=name, weather=json.get("weather"), date=json.get("date"), pic=pic)


def get_net_request(url):
    """远程访问url请求"""

    content = urlopen(url).read()
    content = content.decode("utf-8")
    return content
