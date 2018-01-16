define(["App"],function(App){
	App.config(function($routeProvider){
		$routeProvider.when("/home",{
			templateUrl:"home.html",
			controller:"SysController"
		}).when("/error",{
			templateUrl:"error.html"
		}).when("/noright",{
			templateUrl:"noright.html"
		}).when("/sys/config",{
			templateUrl:"system/config.html",
			controller:"SysController"
		}).when("/sys/logs",{
			templateUrl:"logs/sys_logs.html",
			controller:"LogsController"
		}).when("/sys/login/logs",{
			templateUrl:"logs/sys__login_logs.html",
			controller:"LogsController"
		}).when("/sys/menus",{
			templateUrl:"system/sys_menu.html",
			controller:"SysMenuController"
		}).when("/sys/roles",{
			templateUrl:"system/sys_role.html",
			controller:"SysRoleController"
		}).when("/weixin",{
			templateUrl:"system/weixin_config.html",
			controller:"SysController"
		}).otherwise({
			templateUrl:"home.html",
			controller:"SysController"
		});
	});
	
	App.config(function($routeProvider){
		$routeProvider
		 .when("/users/editpwd",{
			templateUrl:"users/editpwd.html",
			controller:"UserController"
		}).when("/users",{
			templateUrl:"users/user_list.html",
			controller:"UserController"
		}).when("/users/add",{
			templateUrl:"users/user_add.html",
			controller:"UserController"
		}).when("/users/:userId",{
			templateUrl:"users/user_detail.html",
			controller:"UserController"
		});
	});
	
	App.config(function($routeProvider){
		$routeProvider
			.when("/members",{
				templateUrl:"members/member_list.html",
				controller:"MemberController"
			}).when("/members/:memberId",{
				templateUrl:"members/member_detail.html",
				controller:"MemberController"
			}).when("/sellers",{
				templateUrl:"members/seller_list.html",
				controller:"MemberController"				
			}).when("/sellers/:sellerId",{
				templateUrl:"members/seller_detail.html",
				controller:"MemberController"
			});
	});

	App.config(function($routeProvider){
		$routeProvider
			.when("/message/sms",{
				templateUrl:"message/sms_history.html",
				controller:"MessageController"
			});
	});	
	
	App.config(function($routeProvider){
		$routeProvider
			.when("/goods",{
				templateUrl:"goods/goods_list.html",
				controller:"GoodsController"
			}).when("/goods/:goodsNo",{
				templateUrl:"goods/goods_detail.html",
				controller:"GoodsController"
			});
	});
	
	App.config(function($routeProvider){
		$routeProvider
			.when("/restaurant",{
				templateUrl:"restaurant/restaurant_list.html",
				controller:"RestaurantController"
			}).when("/restaurant/add",{
				templateUrl:"restaurant/restaurant_add.html",
				controller:"RestaurantController"
			}).when("/restaurant/:restaurantId",{
				templateUrl:"restaurant/restaurant_detail.html",
				controller:"RestaurantController"
			});
	});
});