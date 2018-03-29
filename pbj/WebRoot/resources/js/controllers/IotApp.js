define(["angular","jquery"], function (angular,$) {
    var IotApp = angular.module("IotApp", ["ngRoute","ng-pagination"]);
    IotApp.config(["$httpProvider","TimerBarProvider",function($httpProvider,TimerBarProvider){
    	TimerBarProvider.start();
    	$httpProvider.defaults.headers.common["X-Requested-With"] ="XMLHttpRequest";
    	$httpProvider.interceptors.push("httpInterceptor");
    }]).directive("tipsuccess",function(){
    	return{
			replace:true,restrict:"AE",templateUrl:"resources/js/views/tip_success.html"
    		};
    		
     }).directive("loading",function(){
    	return {
    		replace:true,restrict:"AE",templateUrl:"resources/js/views/loading.html",
    		link:function(){
    			var top=$(window).height()/2-25;var left=$(window).width()/2-25;
    			$(".load_layer").css({top:top,left:left,position:"fixed","z-index":1000});
    		}
    	};
    }).directive("fileUpload",["$parse","fileReader","Util","Dialog",function($parse,fileReader,Util,Dialog){
    	return {
    		restrict:"A",
    		link:function(scope,element,attrs,ngModel){
    			var model=$parse(attrs.fileUpload);
    			var modelSetter=model.assign;
    			element.bind("change",function(event){
    				scope.$apply(function(){modelSetter(scope,element[0].files[0]);});
    				scope.imageFile=(event.srcElement||event.target).files[0];
    				if(!Util.checkImage(scope.imageFile.name))
    				{
    					Dialog.show("亲,您上传的文件非图片类型哦!");
    					return;
					}
    				fileReader.readAsDataUrl(scope.imageFile,scope).then(function(result){
    					scope.imageSrc = result;
    					var http=Util.uploadImg(scope.imageFile);
    					http.success(function(data){
    						scope.imageResult=data;
    						Dialog.successTip("上传成功!");
    					});
					});
    			});
    		}
    	};
    }]).factory("fileReader",["$q", "$log",function($q,$log){
    	var onLoad = function(reader, deferred, scope){return function(){scope.$apply(function(){deferred.resolve(reader.result);});};};
    	var onError = function(reader,deferred,scope){return function () {scope.$apply(function(){deferred.reject(reader.result);});};};
    	var getReader = function(deferred, scope) {var reader = new FileReader();reader.onload = onLoad(reader, deferred, scope);reader.onerror = onError(reader, deferred, scope);return reader;};
    	var readAsDataURL = function (file, scope) {var deferred = $q.defer();var reader = getReader(deferred, scope);reader.readAsDataURL(file);return deferred.promise;};
    	return {
    		readAsDataUrl: readAsDataURL  
    	};
    }]).factory("httpInterceptor",function($q,Dialog,$rootScope,$location,Location){
    	$rootScope.$on("loginEvent",function(errorType){Location.forward("/manage/login.html");});
    	$rootScope.$on("norightEvent",function(errorType){$location.path("/noright");});
    	return {
    				request:function(config){if((config.url.indexOf("views/loading.html")<0)&&config.url.indexOf("views/tip_success.html")<0){console.log(config.url);$(".load_layer").show();}return config || $q.when(config);},
    				response:function(response){$(".load_layer").hide();return response || $q.when(response);},
		    		responseError:function(rejection)
			    		{
			    			$(".load_layer").hide();var title="错误代码："+rejection.status+"<br>"+rejection.data;
			    			if(-1==rejection.status){title="网络连接失败,服务器无响应!";}
			    			else if(404==rejection.status){title="错误代码："+rejection.status+"<br>找不到对应的资源!";}
			    			else if(403==rejection.status){
			    				$rootScope.$emit("norightEvent","needRight",rejection);
			    				return;
			    			}
			    			else if(401==rejection.status)
			    			{
			    				$rootScope.$emit("loginEvent","needLogin",rejection);
			    				return;
			    			}
			    			Dialog.show(title);
			    			return $q.reject(rejection);
			    		}
    			};
    })
    .factory("Resource",function(){
    	return {
    		init:function(resourceNames,fn){
    			require(resourceNames,function(){fn();});
    		}
    	};
    })
    .provider("TimerBar",function(){
    		return {
	    			doTime:function(){try{var d=new Date();var formatdate=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();$("#timerBar").html(formatdate);}catch(e){}},
	    			start:function(){setInterval(this.doTime,1000);},
	    			$get:function(){} 
    			};
    })
    .factory("DateFormat",function(){ 
    	var doHandleMonth=function(m){return m<10?"0"+m:m }; 
    	var getMonthDay = function(nowYear,myMonth){ var monthStartDate = new Date(nowYear, myMonth, 1); var monthEndDate = new Date(nowYear, myMonth + 1, 1); var days = (monthEndDate - monthStartDate)/(1000*60*60*24); return days; }
    	var getDayStart=function(day){ var today = new Date(); var targetday_milliseconds=today.getTime() + 1000*60*60*24*day; today.setTime(targetday_milliseconds); var tYear = today.getFullYear(); var tMonth = today.getMonth(); var tDate = today.getDate(); tMonth = doHandleMonth(tMonth + 1); tDate = doHandleMonth(tDate); return tYear+"-"+tMonth+"-"+tDate+" 00:00:00"; }
    	var getDayEnd=function(day){ var today = new Date(); var targetday_milliseconds=today.getTime() + 1000*60*60*24*day; today.setTime(targetday_milliseconds); var tYear = today.getFullYear(); var tMonth = today.getMonth(); var tDate = today.getDate(); tMonth = doHandleMonth(tMonth + 1); tDate = doHandleMonth(tDate); return tYear+"-"+tMonth+"-"+tDate+" 23:59:59"; }
    	var getWeekStart = function(){ var now = new Date(); now.setDate(now.getDate() - now.getDay()+1); var myyear = now.getFullYear(); var mymonth =doHandleMonth(now.getMonth()+1); var myweekday = doHandleMonth(now.getDate()); return myyear+"-"+mymonth + "-" + myweekday+" 00:00:00"; }
    	var getWeekEnd = function(){ var now = new Date(); now.setDate(now.getDate()- now.getDay()+7); var myyear = now.getFullYear(); var mymonth =doHandleMonth(now.getMonth()+1); var myweekday = doHandleMonth(now.getDate()); return myyear+"-"+mymonth + "-" + myweekday+" 23:59:59"; }
    	var getMonthStart = function(){ var now = new Date(); var date = new Date(now.getFullYear(), now.getMonth(), 1); var myyear = date.getFullYear(); var mymonth =doHandleMonth(date.getMonth()+1); var myweekday = doHandleMonth(date.getDate()); return myyear+"-"+mymonth + "-" + myweekday+" 00:00:00"; }
    	var getMonthEnd = function(){ var now = new Date(); var date = new Date(now.getFullYear(), now.getMonth(), getMonthDay(now.getFullYear(), now.getMonth())); var myyear = date.getFullYear(); var mymonth =doHandleMonth(date.getMonth()+1); var myweekday = doHandleMonth(date.getDate()); return myyear+"-"+mymonth + "-" + myweekday+" 23:59:59"; }
    	return { btime : function(type) { switch (type) { case 1: return getDayStart(-6); case 2: return getDayStart(-29); case 3: return getWeekStart(); case 4: return getMonthStart(); default: console.log(type); return ""; } }, etime : function(type) { switch (type) { case 1: return getDayEnd(0); case 2: return getDayEnd(0); case 3: return getWeekEnd(); case 4: return getMonthEnd(); default: return ""; } } }
    });
    return IotApp;
});
