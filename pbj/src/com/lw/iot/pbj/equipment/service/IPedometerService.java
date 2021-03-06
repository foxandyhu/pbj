package com.lw.iot.pbj.equipment.service;

import com.lw.iot.pbj.core.base.service.IBaseService;
import com.lw.iot.pbj.equipment.entity.Pedometer;

/**
 * 脚环计步器业务接口
 * @author andy_hulibo@163.com
 * @2017年10月31日 下午3:27:31
 */
public interface IPedometerService extends IBaseService<Pedometer> {

	/**
	 * 根据设备编号查找设备
	 * @author andy_hulibo@163.com
	 * @2017年10月31日 下午3:39:23
	 * @param serialNo
	 * @return
	 */
	public Pedometer getPedometer(String serialNo);
	
	
	/**
	 * 删除计步器阅读器设备
	 * @author andy_hulibo@163.com
	 * @2017年10月31日 下午3:53:38
	 * @param serialNo
	 */
	public void del(String serialNo);
	
	/**
	 * 根据二维码识别号获取设备
	 * @author sunships
	 * @date 2018年1月18日下午4:38:39
	 * @param outSerialNo
	 * @return
	 */
	public Pedometer getPedometerByQr(String outSerialNo);
}
