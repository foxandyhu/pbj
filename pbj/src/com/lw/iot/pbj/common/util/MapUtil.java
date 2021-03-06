package com.lw.iot.pbj.common.util;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSONObject;
import com.lw.iot.pbj.common.json.JsonUtil;
import com.lw.iot.pbj.common.util.NetUtil.ContentTypeEnum;

/**
 * 百度API调用
 * @author sunships
 * @date 2018年1月9日下午5:43:22
 */

public class MapUtil {
	private static final Logger logger = Logger.getLogger(MapUtil.class);
	/**百度地图ak*/
	private static final String AK = "1LrIn254h4UEd72vrMVFBsFf";
	private static Map<String, String> addressCache = new ConcurrentHashMap<String, String>();
	
	/**
	 * 获取某点所在位置
	 * @author sunships
	 * @date 2015年12月10日上午11:56:31
	 * @param lat
	 * @param lng
	 * @return
	 * @throws Exception
	 */
	public static String getLocationDesc(String lat,String lng){
		String addr = "";
		try {
			addr = addressCache.get(lat+"_"+lng);
			if(StringUtils.isBlank(addr)){
				String url = "http://api.map.baidu.com/geocoder/v2/?ak="+AK+"&output=json&location="+lat+","+lng;
				String result =  NetUtil.getHttpResponseData(url,"","POST",false,ContentTypeEnum.JSON);
				ResponseData data = JsonUtil.parse(result,ResponseData.class);
				if(ResponseData.OK==data.status){
					addr =  ((JSONObject)data.result).getString("formatted_address");
					addressCache.put(lat+"_"+lng, addr);
				}
			}
		} catch (Exception e) {
			logger.error("根据坐标获取地址失败");
		}
		return addr;
	}
	
	/**
	 * 地图接口返回结果参数
	 * @author sunships
	 * @date 2018年1月9日下午5:50:36
	 */
	static class ResponseData{
		
		/**返回结果状态值， 成功返回0*/
		public int status;

		/**返回结果*/
		public Object result;
		
		/**成功返回结果状态值0*/
		public final static int OK=0;

	}
	
	public static void main(String[] args) {
		System.out.println(getLocationDesc(39.934+"",116.329+""));
	}
}
