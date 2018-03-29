﻿<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<header class="main-header">
		<a href="#" class="logo">
          	<span class="logo-mini" title="${sysConfig.appName}">${sysConfig.appName}</span>
          	<span class="logo-lg"><b><h3>脚环管理系统</h3>  </b></span>
       	</a>

        <nav class="navbar navbar-static-top" role="navigation">
          <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
          </a>
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
              <li class="dropdown messages-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-envelope-o"></i>
                  <span class="label label-success">4</span>
                </a>
                <ul class="dropdown-menu">
                  <li class="header">您有4条未读消息</li>
                  <li>
                    <ul class="menu">
                      <li>
                        <a href="#">
                          <div class="pull-left">
                            <img src="<%=basePath%>resources/images/user_default.jpg" class="img-circle" alt="User Image">
                          </div>
                          <h4>
                          	明天开年会
                            <small><i class="fa fa-clock-o"></i> 5 mins</small>
                          </h4>
                          <p>明天开年会请准时到达!</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li class="footer"><a href="#">查看所有</a></li>
                </ul>
              </li>

              <li class="dropdown notifications-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-bell-o"></i>
                  <span class="label label-warning">10</span>
                </a>
                <ul class="dropdown-menu">
                  <li class="header">您有10条未读通知</li>
                  <li>
                    <ul class="menu">
                      <li>
                        <a href="#">
                          <i class="fa fa-users text-aqua"></i>系统备份异常
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li class="footer"><a href="#">查看所有</a></li>
                </ul>
              </li>
              <li class="dropdown tasks-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-flag-o"></i>
                  <span class="label label-danger">9</span>
                </a>
                <ul class="dropdown-menu">
                  <li class="header">9个正在运行的任务</li>
                  <li>
                    <ul class="menu">
                      <li>
                        <a href="#">
                          <h3>
                           	正在下载日志<small class="pull-right">20%</small>
                          </h3>
                          <div class="progress xs">
                            <div class="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                              <span class="sr-only">20% Complete</span>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li class="footer">
                    <a href="#">查看所有</a>
                  </li>
                </ul>
              </li>
              <li class="dropdown user user-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <img src="<%=basePath%>resources/images/user_default.jpg" class="user-image">
                  <span class="hidden-xs">${loginUser.name}</span>
                </a>
                <ul class="dropdown-menu">
                  <li class="user-header">
                    <img src="<%=basePath%>resources/images/user_default.jpg" class="img-circle" alt="User Image">
                    <p>${loginUser.name}
                    	<small>上次登录:<fmt:formatDate value="${loginLogs.time}" type="both"/> </small>
                      	<small>${loginLogs.ip} ${loginLogs.ipArea}</small>
                    </p>
                  </li>
                  <li class="user-footer">
                    <div class="pull-left">
                      <a href="#/users/editpwd" class="btn btn-default btn-flat">密码修改</a>
                    </div>
                    <div class="pull-right">
                      <a href="<%=basePath%>manage/logout.html" class="btn btn-default btn-flat">退出</a>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>	