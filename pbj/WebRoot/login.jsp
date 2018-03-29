<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>脚环管理系统后台登录</title>
		<link rel="stylesheet" href="<%=basePath%>resources/plugin/bootstrap3.3.2/css/bootstrap.min.css">
		<link rel="stylesheet" href="<%=basePath%>resources/plugin/framework/css/AdminLTE.min.css">
		<link rel="stylesheet" href="<%=basePath%>resources/css/system.css">
		<link rel="shortcut icon" href="<%=basePath%>favicon.ico" type="image/x-icon" />
	</head>
	<body class="loginbg">
		<div class="login-box">
			<div class="well loginbox">
				<div class="login-box-body">
		        	<h2 style="color:#FF6B00;font-weight:bold;"><p class="login-box-msg">脚环管理系统</p></h2>
			        <form action="<%=basePath%>manage/login.html" method="post">
							<div class="form-group has-feedback">
							  	<span class="glyphicon glyphicon-user form-control-feedback" style="left:0"></span>
								<input type="text" class="form-control" placeholder="请输入用户名" style="height: 40px;padding-left:32px" name="userName" autocomplete="off">
							</div>
							<div class="form-group has-feedback">
							  	<span class="glyphicon glyphicon-lock form-control-feedback" style="left:0"></span>
								<input type="password" class="form-control" placeholder="请输入密码" style="height: 40px;padding-left:32px" name="password" autocomplete="off">
							</div>
							<div class="row">
							  <div class="col-xs-12 text-right"><span class="red">${errorMsg}</span>
							    <div class="checkbox icheck">
							      <label><input type="checkbox" name="autoLogin"> 自动登录</label>
							    </div>
							  </div>
							</div>
							<div class="social-auth-links text-center">
							  <button type="submit" class="btn btn-lg btn-block " style="background:#FF6600;color:#ffffff;font-weight:bold;font-size:20px;"> 登&nbsp;&nbsp;录</button>
							</div>
			        </form>
		      	</div>
	      	</div>
    	</div>
		<footer class="main-footer footer" style="text-align:center; background:#222;color:#fff;margin:0px 0px 0px 0px;" id="loginFooter">
			<p><a href="#">关于我们</a>|<a href="#">法律条款</a>|<a href="#">联系我们</a></p>
			<p>${sysConfig.copyRight} ${sysConfig.record}</p>
			<p>建议使用google chrome3.4以上，IE9以上，360极速浏览器7.0以上版本，浏览器访问本系统</p>
		</footer>
	</body>
</html>