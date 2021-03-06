package com.lw.iot.pbj.equipment.action;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.lw.iot.pbj.common.json.JsonUtil;
import com.lw.iot.pbj.common.page.Pager;
import com.lw.iot.pbj.common.util.DateUtil;
import com.lw.iot.pbj.common.util.ResponseUtil;
import com.lw.iot.pbj.core.base.action.BaseAction;
import com.lw.iot.pbj.equipment.entity.PedometerData;
import com.lw.iot.pbj.equipment.service.IPedometerDataService;

/**
 * 脚环计步器数据Action
 * @author andy_hulibo@163.com
 * @2017年10月31日 下午6:22:27
 */
@Controller("PedometerDataAction")
@RequestMapping(value = "/manage/pedometer/data")
public class PedometerDataAction extends BaseAction {
	
	@Autowired
	private IPedometerDataService pedometerDataService;

	/**
	 * 脚环计步器数据集合
	 * @author andy_hulibo@163.com
	 * @2017年10月31日 下午3:40:01
	 * @param response
	 */
	@RequestMapping(value = "/list")
	public void list(HttpServletResponse response) {
		instantPage(10);
		List<PedometerData> list = pedometerDataService.getList();
		int total = pedometerDataService.getCount();
		
		Pager pager=new Pager(super.getPage(),super.getRows(),total);
		
		pager.setDatas(list);
		ResponseUtil.writeJson(response, JsonUtil.toJsonStringFilterPropter(pager).toJSONString());
	}
	
	/**
	 * 脚环计步器数据统计
	 * @author sunships
	 * @date 2018年1月2日上午11:48:56
	 * @param response
	 */
	@RequestMapping(value = "/chart")
	public void chart(HttpServletResponse response,Date btime,Date etime,String serialNo) {
		Map<String,Object> params = new HashMap<String,Object>(4);
		params.put("etime", etime);
		params.put("btime", btime);
		params.put("serialNo", serialNo);
		List<PedometerData> list=pedometerDataService.getList(params);
		
		Map<String,Object> result = new LinkedHashMap<String,Object>();
		if(etime!=null&&btime!=null)
		{
			int days = (int) ((etime.getTime() - btime.getTime()) / (1000*3600*24));
			do{
				result.put(DateUtil.formatterDate(btime), 0);
				btime.setTime(btime.getTime()+1000*3600*24);
				days--;
			}while(days>=0);
		}
		
		if(list!=null)
		{
			Collections.reverse(list);
			for (int i=0;i<list.size();i++) {
				PedometerData pedometerData = list.get(i);
				result.put(DateUtil.formatterDate(pedometerData.getTime()),pedometerData.getStep());
			}
		}
		
		JSONArray array=new JSONArray();JSONArray son=null;
		for (Map.Entry<String, Object> entry : result.entrySet()) {  
            son = new JSONArray();
			son.add(entry.getKey());
			son.add(entry.getValue());
			array.add(son);
        }  
		
		ResponseUtil.writeJson(response, array.toJSONString());
	}
}
