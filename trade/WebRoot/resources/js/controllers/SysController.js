define(["App"],function(App){
	App.controller("SysController",function($rootScope,$http,$scope,Dialog,Util,Resource){
		$scope.loadSysConfig=function()
		{
			$http.get("manage/system/config/load.html",{cache:false}).success(function(data){
				$scope.config=data;
			});
		};
		$scope.editSysConfig=function()
		{
			$http.get("manage/system/config/post.html?"+$("#sysConfigForm").serialize(),{cache:false}).success(function(data){
				Dialog.successTip("新增成功!");
			});
		};
	});
});