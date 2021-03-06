define(["IotApp"],function(IotApp){
	IotApp.filter("dateFormat",function(){
		return function(input){
			var date=new Date(input);
			return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
		};
	});
	IotApp.controller("EquipmentController",function($scope,$http,$location,$filter,$routeParams,Dialog,Resource,Util,DateFormat){
		var rule={valid:"glyphicon glyphicon-ok",invalid:"glyphicon glyphicon-remove",validating:"glyphicon glyphicon-refresh"};
		
		/*****************************脚环数据统计*******************************/
		$scope.loadPedometerChartData=function() 
		{
			Resource.init(["typeahead","datepicker-zh","highchart"],function(){ 
				var serialNo=""; var btime=DateFormat.btime(parseInt(1)); var etime=DateFormat.etime(parseInt(1));
		        $("#word").typeahead({
		            source: function(query, process) {
		            	$http.get("manage/pedometer/search.html?pageNo=1&word="+query,{cache:false}).success(function(data){
							if(data){ process(data); }
						}); 
		            },
		            afterSelect: function (item) {
		            	serialNo = item;
		            	$scope.getPetometerData();
		            },
		        });
 
				$scope.changeChart=function(type){ options.chart.type = type; chart.update(options) }
				Highcharts.setOptions({ lang: { numericSymbolMagnitude: 10000, numericSymbols: ['万', '亿'] } });
				var options = {				
					 	credits: { enabled:false }, 
						chart : {renderTo:'chart', type : $scope.chartType ,backgroundColor:'rgba(255, 255, 255, 0)'},
						legend: { enabled: false },
						title : { text : "脚环步数变化图" },
						subtitle:{text:"编号："+serialNo},
						xAxis:{ labels:{ enabled:false } },  
						yAxis : {
							title : { text : "单位（步）" },
							minRange:50,   
							softMin:0
						},
						tooltip: {
						    shared: true, useHTML: true,
						    headerFormat: '<span>日期 {point.key}</span><br>',
						    pointFormat: '<span>步数 {point.y}</span>'
						},
						series : [ {
							color: '#2cb796'
						} ]
					};
				var chart = new Highcharts.Chart(options);	
				
				$scope.changeDays=function(type){ 
					if(type!="5"){ btime = DateFormat.btime(parseInt(type)); etime = DateFormat.etime(parseInt(type)); $scope.getPetometerData() }
				}
				 
				$scope.getPetometerData=function(){
					if(serialNo!="")  
						$http.get("manage/pedometer/data/chart.html?pageNo=1&btime="+btime+"&etime="+etime+"&serialNo="+serialNo,{cache:false}).success(function(data){
							if(data){ options.subtitle.text = "编号："+serialNo ;options.series[0].data=data;chart.update(options); }  
						});  
				}
				$('.input-daterange').datepicker( {language: 'zh-CN',format: 'yyyy-mm-dd',endDate:'0d', autoclose: true}) .on('hide', function(){btime=$('#btime').val()==""?"":($('#btime').val()+" 00:00:00"); etime=$('#etime').val()==""?"":($('#etime').val()+" 23:59:59"); if(btime!=""&&etime!=""){$scope.dayType="5",$scope.getPetometerData();} })
			}); 
		};
		
		
		/*****************************计步器阅读器*******************************/
		$scope.loadPedometerReader=function()
		{
			$http.get("manage/pedometer/reader/list.html?&pageNo="+$scope.currentPage,{cache:false}).success(function(data){
				if(data){$scope.items=data.datas;$scope.pageCount = data.totalPage;}
			});
		};
		
		$scope.delPedometerReader=function()
		{
			var serialNo=this.item.serialNo;
			Dialog.confirm("cabinetDialog","您确定要删除该设备吗?",function(r){
				if(r){
					$http.get("manage/pedometer/reader/del/"+serialNo+".html",{cache:false}).success(function(data){
						Dialog.successTip("删除成功!");
						$scope.loadPedometerReader();
					});
				}
			});
		};
		
		$scope.enablePedometerReader=function()
		{
			var serialNo=this.item.serialNo;
			$http.get("manage/pedometer/reader/enable/"+serialNo+".html",{cache:false}).success(function(data){
				Dialog.successTip("操作成功!");
				$scope.loadPedometerReader();
			});
		};
		
		$scope.initPedometerReaderValidate=function(){
			Resource.init(["bootstrapValidator"],function(){
				$("#pedometerReaderForm").bootstrapValidator({
					feedbackIcons:rule,
					fields:
					{
						seriesNo:{validators: {notEmpty:{message:"请输入设备序编号!"},stringLength:{min:1,max:50,message:"编号在1~50个字符之间!"}}},
						address:{validators: {notEmpty:{message:"请输入设备序安装地址!"},stringLength:{min:1,max:50,message:"地址在1~50个字符之间!"}}}
					}
				});
			});
		};

		$scope.addPedometerReader=function()
		{
			$("#pedometerReaderForm").data("bootstrapValidator").validate();
			if($("#pedometerReaderForm").data("bootstrapValidator").isValid())
			{	
				$http.get("manage/pedometer/reader/post.html?"+$("#pedometerReaderForm").serialize(),{cache:false}).success(function(data){
					Dialog.successTip("新增成功!");
					$location.path("/pedometer/reader");
				});
			}
		};
		
		$scope.editPedometerReader=function()
		{
			$("#pedometerReaderForm").data("bootstrapValidator").validate();
			if($("#pedometerReaderForm").data("bootstrapValidator").isValid())
			{
				$http.get("manage/pedometer/reader/edit.html?"+$("#pedometerReaderForm").serialize(),{cache:false}).success(function(data){
					Dialog.successTip("修改成功!");
					$location.path("/pedometer/reader");
				});
			}
		};
		
		$scope.pedometerReaderDetail=function()
		{
			var serialNo=$routeParams.serialNo;
			$http.get("manage/pedometer/reader/"+serialNo+".html",{cache:false}).success(function(data){
				$scope.item=data;
			});
		};
		
		/************************************脚环计步器*************************************/
		$scope.loadPedometer=function()
		{
			$http.get("manage/pedometer/list.html?&pageNo="+$scope.currentPage,{cache:false}).success(function(data){
				if(data){$scope.items=data.datas;$scope.pageCount = data.totalPage;}
			});
		};
		
		$scope.delPedometer=function()
		{
			var serialNo=this.item.serialNo;
			Dialog.confirm("cabinetDialog","您确定要删除该设备吗?",function(r){
				if(r){
					$http.get("manage/pedometer/del/"+serialNo+".html",{cache:false}).success(function(data){
						Dialog.successTip("删除成功!");
						$scope.loadPedometer();
					});
				}
			});
		};
		
		$scope.addPedometer=function()
		{
			$("#pedometerForm").data("bootstrapValidator").validate();
			if($("#pedometerForm").data("bootstrapValidator").isValid())
			{	
				$http.get("manage/pedometer/post.html?"+$("#pedometerForm").serialize(),{cache:false}).success(function(data){
					Dialog.successTip("新增成功!");
					$location.path("/pedometer");
				});
			}
		};
		
		$scope.initPedometerValidate=function(){
			Resource.init(["bootstrapValidator"],function(){
				$("#pedometerForm").bootstrapValidator({
					feedbackIcons:rule,
					fields:
					{
						seriesNo:{validators: {notEmpty:{message:"请输入设备序编号!"},stringLength:{min:1,max:50,message:"编号在1~50个字符之间!"}}}
					}
				});
			});
		};
		
		$scope.showQrcode=function()
		{
			var serialNo=this.item.outSerialNo;
			$scope.seerialNo=serialNo;
			Resource.init(["qrcode"],function(){
				$("#qrcodeDialog").modal("toggle");
				$("#qrcodeDialog").on("shown.bs.modal",function(){
					$("#pedometerQrcode").children().remove();
					$("#pedometerQrcode").qrcode({width:220,height:220, text:"sdsfsdfsdfsd"});
				});
			});
		};
		
		/*************************脚环数据***************************/
		$scope.loadPedometerData=function()
		{
			$http.get("manage/pedometer/data/list.html?&pageNo="+$scope.currentPage,{cache:false}).success(function(data){
				if(data){$scope.items=data.datas;$scope.pageCount = data.totalPage;}
			});
		};
		
	});
});