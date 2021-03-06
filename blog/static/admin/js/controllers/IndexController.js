define(["BlogApp"],function(BlogApp){
    BlogApp.controller("IndexController",function($scope,$http,$location,$routeParams,Dialog,Resource,$interval){
        $scope.initReport=function(){
            Highcharts.setOptions({ global: { useUTC: false } });
            var pv_chart = Highcharts.chart('pv_report', {credits: {enabled: false},tooltip:{shared: true, crosshairs: true},
                title: {text:"今日网站流量统计"},subtitle:{text:"当日流量"}, yAxis: {title: {text: "访问量"}}, xAxis: {title: {text: "时间段"}},
                legend:{layout: "vertical", align: "right", verticalAlign: "middle"}
            });

            var source_chart = Highcharts.chart("source_report", {
                credits:{enabled: false},title:{text:"网站访问统计"},subtitle:{text:"数据截至今日"},chart:{type:"pie", options3d: {enabled: true,beta: 0, alpha: 45}},
                plotOptions: {pie:{allowPointSelect: true, cursor: 'pointer', depth: 35, slicedOffset: 20, point: {events: {mouseOver: function() {this.slice();}, mouseOut: function() {this.slice();}, click: function() {return false;}}}}
                },colors:["#77a1e5", "#c42525", "#a6c96a"],series: [{data: []}]
            });
            var keywords_chart = Highcharts.chart("keywords_report", {
                chart:{type:"column",options3d:{enabled: true,alpha: 15,beta: 15,depth: 50,viewDistance: 25
				}},credits:{enabled: false},title:{text:"搜索关键词"}, subtitle:{text:"数据截至今日"},
                xAxis:{type:"category", labels:{rotation: -45}},yAxis:{min:0,title:{text:"PV"}}, legend:{enabled: false},
                tooltip:{pointFormat: "PV: <b>{point.y}</b>"},series:[{name:"搜索关键词", data: []}]
            });
            var cpu_chart = Highcharts.chart("cpu_report", {
                title:{text:"CPU使用率"},credits: {enabled: false}, tooltip: {enabled: false}, chart: {type:"solidgauge"},plotOptions: {solidgauge: {dataLabels: {y: 5, borderWidth: 0, useHTML: true}}},credits: {enabled: false},
		        yAxis: {min: 0, max:100,stops: [[0.1,"#55BF3B"], [0.5,"#DDDF0D"], [0.9,"#ca0808"]],lineWidth: 0,minorTickInterval: null,tickPixelInterval: 400,tickWidth: 0,labels:{y:16}},
		        pane: {center: ["50%","85%"],startAngle:-90,endAngle:90,background:{backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || "#EEE",innerRadius:"60%", outerRadius:"100%", shape:"arc"}},
		        series: [{name:"CPU",data: [80],dataLabels:{format: '<div style="text-align:center"><span style="font-size:15px;color:' + ((Highcharts.theme && Highcharts.theme.contrastTextColor) || '#69c782') + '">{y}%</span><br/>'}}]
            });

            var mem_chart = Highcharts.chart("mem_report", {
                title:{text:"内存使用率"}, tooltip: {enabled: false}, chart: {type:"solidgauge"}, plotOptions: {solidgauge: {dataLabels: {y: 5, borderWidth: 0, useHTML: true}}},credits: {enabled: false},
		        yAxis: {min: 0, max:100,stops: [[0.1,"#55BF3B"], [0.5,"#DDDF0D"], [0.9,"#ca0808"]],lineWidth: 0,minorTickInterval: null,tickPixelInterval: 400,tickWidth: 0,labels:{y:16}},
		        pane: {center: ["50%","85%"],startAngle:-90,endAngle:90,background:{backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || "#EEE",innerRadius:"60%", outerRadius:"100%", shape:"arc"}},
		        series: [{name:"CPU",data: [80],dataLabels:{format: '<div style="text-align:center"><span style="font-size:15px;color:' + ((Highcharts.theme && Highcharts.theme.contrastTextColor) || '#69c782') + '">{y}%</span><br/>'}}]
            });
            var cpu_chart_line = Highcharts.chart("cpu_report_line",{
                chart:{type:"spline",marginRight: 10}, title: {text:null},legend: {enabled: false},
                xAxis: {type:"datetime", tickPixelInterval: 150},yAxis:{labels:{formatter:function(){return this.value+" %";}},title: {text: null}},credits:{enabled: false},
		        tooltip:{formatter: function () {return Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + Highcharts.numberFormat(this.y, 1)+"%";}},
                series: [{name:"时间",data: [{}]}]
            });
            var mem_chart_line = Highcharts.chart("mem_chart_line",{
                chart:{type:"spline",marginRight: 10}, title: {text:null},legend: {enabled: false},
                xAxis: {type:"datetime", tickPixelInterval: 150},yAxis:{labels:{formatter:function(){return this.value+" %";}},title: {text: null}},credits:{enabled: false},
		        tooltip:{formatter: function () {return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + Highcharts.numberFormat(this.y, 1);}},
                series: [{name:"时间",data: []}]
            });

            $scope.pv_chart=pv_chart;
            $scope.source_chart=source_chart;
            $scope.keywords_chart= keywords_chart;
            $scope.cpu_chart=cpu_chart;
            $scope.mem_chart=mem_chart;
            $scope.cpu_chart_line=cpu_chart_line;
            $scope.mem_chart_line=mem_chart_line;
        };
        $scope.loadCpu =function(){
            $(".load_layer").hide();
            $scope.cpu_timer=$interval(function(){
                $http.get("/manage/seo/sys_res.html", {cache: false}).success(function (data) {
                    if (data) {
                        var cpu_series = $scope.cpu_chart_line.series[0];
                        var cpu_points = $scope.cpu_chart_line.series[0].points;
                        var mem_series = $scope.mem_chart_line.series[0];
                        var flag=false;
                        if (cpu_points.length >=20){
                            flag=true;
                        }
                        $scope.mem={total:data[3],used:data[2]};
                        $scope.mem_chart.setTitle({text:"内存使用率"},{style:{color:"#ff0000"},text:"("+data[2]+"/"+data[3]+")"},true);
                        $scope.cpu_chart.series[0].points[0].update(data[0]);
                        $scope.mem_chart.series[0].points[0].update(data[1]);
                        cpu_series.addPoint([data[4], data[0]], true, flag,true);
                        mem_series.addPoint([data[4], data[1]], true, flag,true);
                        if(!flag){
                            cpu_series.addPoint([data[4], data[0]], true, true,true);
                            mem_series.addPoint([data[4], data[1]], true, true,true);
                        }
                    }
                });
            },1000);
        };
        $scope.$on("$destroy",function(){
            if($scope.cpu_timer){
                $interval.cancel($scope.cpu_timer);
            }
        });
        $scope.loadPv=function (type) {
            $http.get("/manage/seo/pv.html",{params:{type:type}},{cache:false}).success(function(data){
                var ips=new Array(),uvs=new Array(),pvs= new Array(),x_points=new Array();
                $(data.list).each(function(index,item){
                    for(var key in item){
                        x_points.push(key);
                        var ip=item[key][0],uv=item[key][1],pv=item[key][2],hour =item[key][3];
                        ips.push({name:hour,y:ip});
                        uvs.push({name:hour,y:uv});
                        pvs.push({name:hour,y:pv});
                    }
                });
                $scope.pv_chart.xAxis[0].update({categories: x_points})
                $scope.pv_chart.addSeries({name:"独立IP统计",data:ips,color:"#40ff3b"});
                $scope.pv_chart.addSeries({name:"UV统计",data:uvs,color:"#8c2d7e"});
                $scope.pv_chart.addSeries({name:"PV统计",data:pvs,color:"#15ccad"});
            });
        };
        $scope.loadSource=function () {
            $http.get("/manage/seo/source.html",{cache:false}).success(function(data){
                var pie_date=new Array();
                $(data.items).each(function(index,item){
                    for(var key in item){
                     pie_date.push([key,item[key][2]])
                    }
                });
                $scope.source_chart.addSeries({name:"访问来源PV:",data:pie_date,color:"#8c2d7e"});
            });
        };
        $scope.loadKeywords=function(){
            $http.get("/manage/seo/source.html?category=keyword",{cache:false}).success(function(data){
                var pie_date=new Array();
                $(data.items).each(function(index,item){
                    for(var key in item){
                     pie_date.push([key,item[key][2]])
                    }
                });
                $scope.keywords_chart.addSeries({name:"关键字来源PV:",data:pie_date,color:"#2eff7b"});
            });
        };
        $scope.loadLink=function(){
            $http.get("/manage/seo/source.html?category=link",{cache:false}).success(function(data){
                var pie_date=new Array();
                $(data.items).each(function(index,item){
                    for(var key in item){
                     pie_date.push([key,item[key][2]])
                    }
                });
                $scope.links=pie_date;
            });
        };
        $scope.loadData=function(){
            Resource.init(["solid-gauge"],function(){
                $scope.initReport();
                $scope.loadPv();
                $scope.loadSource();
                $scope.loadKeywords();
                $scope.loadLink();
                $scope.loadCpu();
            });
        };
    });
});