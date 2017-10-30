package com.lw.iot.pbj.equipment.entity;

import java.io.Serializable;
import java.util.Date;

import com.alibaba.fastjson.JSON;

/**
 * 计步器数据
 * @author 胡礼波  andy_hulibo@163.com
 * @2017年10月30日 上午11:40:01
 */
public class PedometerData implements Serializable {

	/**
	 * @author 胡礼波  andy_hulibo@163.com
	 * @2017年10月30日 上午11:47:35
	 */
	private static final long serialVersionUID = 3550091582147709980L;
	
	private int id;
	private String serialNo;		//设备编号
	private Date time;				//记录时间
	private int step;				//步数
	private float electricity;		//电量
	private float version;			//版本号
	
	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getSerialNo() {
		return serialNo;
	}


	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}


	public Date getTime() {
		return time;
	}


	public void setTime(Date time) {
		this.time = time;
	}


	public int getStep() {
		return step;
	}


	public void setStep(int step) {
		this.step = step;
	}


	public float getElectricity() {
		return electricity;
	}


	public void setElectricity(float electricity) {
		this.electricity = electricity;
	}


	public float getVersion() {
		return version;
	}


	public void setVersion(float version) {
		this.version = version;
	}


	public static void main(String[] args) {
		PedometerData data=new PedometerData();
		data.setElectricity(10);
		data.setSerialNo("666666");
		data.setStep(23);
		data.setTime(new Date());
		data.setVersion(1.0f);
		
		System.out.println(JSON.toJSON(data));
	}
}
