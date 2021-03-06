package com.lw.iot.pbj.core.base.action;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.lw.iot.pbj.common.constant.SysConst;
import com.lw.iot.pbj.common.page.Pager;
import com.lw.iot.pbj.common.util.DataConvertUtils;
import com.lw.iot.pbj.common.util.ResponseUtil;
import com.lw.iot.pbj.users.entity.Users;

/**
 * 父类Action
 * @author 胡礼波
 * 2012-4-25 下午06:26:17
 */
@Controller("BaseAction")
public class BaseAction{

	/**
	 * 每页显示记录数
	 */
	private int rows;
	
	/**
	 * 当前页数
	 */
	private int page;
	
	public int getPage() {
			page=DataConvertUtils.convertToInteger(getRequest().getParameter("pageNo"));
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getRows() {
			//rows=DataConvertUtils.convertToInteger(getRequest().getParameter("rows"));	
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}


	/**
	 * 实例化Pager对象
	 * @author 胡礼波
	 * 2012-4-28 下午02:12:25
	 */
	public void instantPage()
	{
		Pager.setPager(new Pager(getPage(),getRows(),Integer.MAX_VALUE));
	}
	
	/**
	 * 实例化Pager对象
	 * @author 胡礼波
	 * 2013-7-4 下午6:16:01
	 * @param rows 每页显示条数
	 */
	public void instantPage(int rows)
	{
		setRows(rows);
		Pager.setPager(new Pager(getPage(),rows,Integer.MAX_VALUE));
	}

	/**
	 * 实例化Pager对象
	 * @author 胡礼波-andy
	 * @2013-6-22下午8:24:00
	 * @param pageNo页面
	 * @param rows每页显示数据
	 */
	public void instantPage(int pageNo,int rows)
	{
		setRows(rows);
		setPage(pageNo);
		Pager.setPager(new Pager(pageNo,rows,Integer.MAX_VALUE));
	}
	
	/**
	 * 实例化Pager对象
	 * @author 胡礼波
	 * @param pageNo 页码 rows 每页显示数据 total总共数据
	 * 2012-4-28 下午02:12:25
	 */
	public void instantPage(int pageNo,int rows,int total)
	{
		Pager.setPager(new Pager(pageNo,rows,total));
	}	
	
	/**
	 * 获得httpservletrequest
	 * @author 胡礼波
	 * 2012-4-26 下午07:51:00
	 * @return
	 */
	public HttpServletRequest getRequest() {
		HttpServletRequest request=((ServletRequestAttributes)getRequestAttribute()).getRequest();
		return request;
	}

	/**
	 * 获得httpsession
	 * @author 胡礼波
	 * 2012-4-26 下午07:51:10
	 * @return
	 */
	public HttpSession getSession() {
		return getRequest().getSession();
	}
	
	/**
	 * 获取RequestAttributes
	 * @author 胡礼波-andy
	 * @2013-6-22下午2:23:52
	 * @return
	 */
	protected RequestAttributes getRequestAttribute()
	{
		RequestAttributes attr=RequestContextHolder.getRequestAttributes();
		return attr;
	}
	
	/**
	 * 获得登录的用户对象
	 * @author 胡礼波
	 * 2012-4-26 上午10:02:56
	 * @return 用户对象
	 */
	public Users getLoginedUser()
	{
		return (Users) getSession().getAttribute(SysConst.LOGIN_FLAG);
	}
	
	/**
	 * 时间的处理
	 * @author 胡礼波-Andy
	 * @2014年11月13日下午4:20:44
	 * @param binder
	 */
	@InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        dateFormat.setLenient(false);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }
	
	/**
	 * 统一异常处理
	 * @author 胡礼波-Andy
	 * @2016年9月9日下午5:05:49
	 * @param request
	 * @param response
	 * @param ex
	 */
	@ExceptionHandler({Throwable.class})
	public void exceptionHandler(HttpServletRequest request,HttpServletResponse response,Exception ex)
	{
		String xmlRquest=request.getHeader("X-Requested-With");
		if(SysConst.AJAXREQUEST.equals(xmlRquest))
		{
			response.setStatus(500);
			ResponseUtil.writeHtml(response, ex.getMessage());
		}
		else
		{
			String contextPath=request.getContextPath();
			try 
			{
				response.sendRedirect(contextPath+"/error.html");
			} catch (IOException e) 
			{
				e.printStackTrace();
			}
		}
		ex.printStackTrace();
	}
}
