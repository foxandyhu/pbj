<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
  <head>
   	<base href="<%=basePath%>"> 
	<title>跑步鸡详情</title>
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
	<link rel="stylesheet" href="<%=basePath%>resources/plugin/bootstrap3.3.2/css/bootstrap.min.css">
	<style> 
		.header{background-color: #2cb796;text-align: center;padding: 0.5rem 0;}
		.header p:nth-child(1){font-size:2rem;color:#fff;} 
		.content{padding:0.5rem;background-color:#fff;margin-top:0.5rem;}  
		.left-title { width: 100%; border-left: 1px solid #2cb796; font-size:1.2em; color: #2cb796; text-align: left; margin:0.5rem 0 1rem 0; padding-left:0.5rem; letter-spacing: 1px; }
		body{background-color:#ecf0f5 !important;}   
		.remark{text-indent: 2rem;padding:0 0.5rem;line-height: 2rem; letter-spacing: 1px;}
		ul { margin: 0px auto ; border-radius: 4px; display: -webkit-box; display: -ms-flexbox; display: flex; height: 30px; width: 260px; list-style: none; }
		ul li { -webkit-box-flex: 1; -ms-flex: 1 1 0%; flex: 1 1 0%; border: 1px solid #2cb796; text-align: center; height: 100%; line-height: 30px; z-index: 0; }
	    ul li:first-of-type { margin-right:-1px;color:#2cb796;}
	    ul li:hover{ border: 1px solid #2cb796; z-index: 1; }
	    .detail{height:185px;margin-top:1rem;}     
	    .breeds{margin-right: -15px;text-align:center;  background-color:#2cb796;color:#fff;line-height:3rem;height:3rem;border-top-right-radius:2rem;border-bottom-right-radius:2em;margin-left: -15px;}
	    .status{text-align:center;background-color: #f4c171;color:#fff;line-height:3rem;height:3rem;border-top-left-radius:2rem; border-bottom-left-radius:2rem;margin-left: 15px;margin-right: -15px; }
	</style>   
  </head> 
  <body> 
    <div class="container-fluid">
	    <div class="row header">  
	    	<p style="margin-bottom: 0px;">跑步鸡详情</p> 
	    </div> 
	     <div class="row detail">
	    	<div class="col-xs-3">
	    		<div class="breeds">${chicken.breeds }</div> 
	    	</div>
	    	<div class="col-xs-6">   <div style="position:relative; margin-left:-15px;margin-right:-15px;">   
				<div id="pieData" style="display:none;position:absolute;top:40px;left:0px;width:100%;height: 100%; width: 100px; overflow: hidden;text-align:center;"> 
					<span style="color: #8cb4aa">-总步数-</span><br> 
					<span id="totalStep" style="color: #2cb796; font-size: 3rem;font-weight:bold;">${totalStep}</span><br>
					<span style="font-size: 1.5rem; color: #f1b03d;display:block;margin-top:0.5rem;">日龄 ${chicken.days}</span> 
				</div> 
					<div id="pie" style="min-width:100%;height:160px;margin: 0 auto;"></div>     
				</div>     
		    </div>   
	    	<div class="col-xs-3"><div class="status">${chicken.statusStr }</div></div>
	    	<div class="clearfix"></div> 
	    	<div class="pull-right" style="margin-right:1rem;color:#999;margin-top: 5px;">编号${outSerialNo}</div>
	    </div>
	    <div class="row content" style="padding-left:0.5rem;"> 
	    	<p class="left-title">生长情况</p>
			<p>脚环佩戴日：<span><fmt:formatDate value="${chicken.wearTime}" pattern="yyyy-MM-dd"/> </span></p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;佩戴日龄：<span>${chicken.wearDays}天</span></p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;出栏日期：<span><fmt:formatDate value="${chicken.sellTime}" pattern="yyyy-MM-dd"/></span></span></p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;养殖场：<span>${chicken.farm } </span></p>
			<p>养殖场位置：<span><a href="http://api.map.baidu.com/geocoder?location=${lat},${lon}&output=html&src=lwintel|iot">${location }</a></span></p>
	    </div> 
	    <div class="row content">
	    	<p class="left-title">计步信息</p>
		    <div  id="chart" style="margin-top:1rem;min-width: 100%;height:200px;margin: 0 auto;"></div>
		    <div class="date-tabs">
		    	<ul><li>按月</li><li>按日</li></ul>
		    </div>
	    </div>
	    <div class="row content">
	    	<p class="left-title">品种特点</p>
	    	<p class="remark">${chicken.remark }</p>
	    </div>
	</div>
  </body>
  <script src="resources/plugin/jquery/jquery.min.js"></script>
  <script src="resources/plugin/jquery/jquery.animateNumber.min.js"></script>
  <script src="resources/plugin/highchart/js/highcharts.js"></script>
  <script type="text/javascript">
    var baseColor = "#2cb796";
  	var dayDatas = ${dayDatas};
  	var monDatas = ${monDatas};
	var options={
		credits: { enabled:false },
		chart : { renderTo:'chart', type : "spline" },
		legend: { enabled: false },
		title : { text : null },
		subtitle : { text : null  },
		xAxis:{ labels:{ enabled:false } },
		yAxis : {
			title : { text : "单位（步）"}, 
			labels: { formatter: function() { return this.value + ""; } },
			min : 0, startOnTick : false
		},
		tooltip: { shared: true, useHTML: true, headerFormat: '<span>日期 {point.key}</span><br>', pointFormat: '<span>步数 {point.y}步</span>' },
		series : [ { color: baseColor } ]
	};
	var chart =  new Highcharts.Chart(options);	 
	options.series[0].data=monDatas; chart.update(options);
	$('ul li:first').bind('click',function(e){
		options.series[0].data=monDatas; chart.update(options);$(this).css('color',baseColor).siblings().css('color','#000');
	})
	$('ul li:last').bind('click',function(e){
		options.series[0].data=dayDatas; chart.update(options);$(this).css('color',baseColor).siblings().css('color','#000');
	})
	
	var pieOptions={
		credits: { enabled:false },
        chart: {
        	renderTo:'pie',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            backgroundColor:'rgba(255, 255, 255, 0)',
            spacing:[0,0,0,0], 
            plotShadow: false 
        },
        title: {
        	text:'' 
           //float:true, 
           //text:'<p style="color: #8cb4aa">-总步数-</p><p style="color: #2cb796; font-size: 2rem">'+totalStep+'</p><p style="font-size: 1.5rem; color: #f1b03d">日龄 '+days+'天</p>' 
        }, 
        tooltip: { enabled: false },
        plotOptions: {
            pie: { size:'115%',allowPointSelect: false, dataLabels: { enabled: false } ,colors:[baseColor]}  
        },      
        series: [{  
            type: 'pie',
            innerSize: '85%',  
            animation: { duration: 3000 },
            data: [ 
                [ 100],
            ]
        }]
    };
	var totalStep = ${totalStep};
	if(totalStep==0){pieOptions.series[0].animation=false;} 
	var chartPie =  new Highcharts.Chart(pieOptions);
	var piewidth = $('#pie').width();
	$('#pieData').css('width',piewidth);
	$('#pieData').css('display','block'); 
	$('#totalStep').prop('number',0).animateNumber( { number: totalStep, color: 'green', easing: 'linear' }, 3000 );
	if('${chicken.serialNo}'!=''){
		setInterval(function() {
			$.ajax({
				url : "qrcode/${outSerialNo}/dynamic.html",
				dataType : "json", 
				success : function(msg) {
					var tempTotalStep = parseInt(msg);
					if (tempTotalStep > totalStep) {
						$('#totalStep').prop('number',totalStep).animateNumber(
							  {
							    number: tempTotalStep,
							    color: 'green', 
							    easing: 'linear'
							  },
							  1500  
						); 
						totalStep = tempTotalStep;
					}
				}
			});
		}, 2000);
	} 
</script>
<script src="resources/plugin/bootstrap3.3.2/js/bootstrap.min.js"></script>
</html>
