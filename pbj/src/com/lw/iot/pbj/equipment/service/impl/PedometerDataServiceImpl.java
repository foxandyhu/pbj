package com.lw.iot.pbj.equipment.service.impl;

import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lw.iot.pbj.common.util.ContextUtil;
import com.lw.iot.pbj.core.annotation.ActionModel;
import com.lw.iot.pbj.core.base.service.impl.BaseServiceImpl;
import com.lw.iot.pbj.equipment.entity.Pedometer;
import com.lw.iot.pbj.equipment.entity.PedometerData;
import com.lw.iot.pbj.equipment.persistence.PedometerDataMapper;
import com.lw.iot.pbj.equipment.service.IPedometerDataService;
import com.lw.iot.pbj.equipment.service.IPedometerService;

/**
 * 脚环计步器数据业务实现类
 * @author andy_hulibo@163.com
 * @2017年10月31日 下午3:28:27
 */
@Service("PedometerDataServiceImpl")
@Transactional(rollbackFor=Exception.class)
@ActionModel(description="脚环计步器数据")
public class PedometerDataServiceImpl extends BaseServiceImpl<PedometerData> implements IPedometerDataService {

	@Autowired
	private PedometerDataMapper pedometerDataMapper;
	@Autowired
	private IPedometerService pedometerService;
	
	@Override
	@Transactional(rollbackFor=Exception.class)
	public void save(Collection<PedometerData> list)
	{
		synchronized (PedometerData.class) {
			if(list==null)
			{
				return;
			}
			Iterator<PedometerData> it=list.iterator();
			Pedometer pedometer=null;
			PedometerData tmpData=null;
			while(it.hasNext())
			{
				PedometerData data=it.next();
				pedometer=pedometerService.getPedometer(data.getSerialNo());
				//存在该脚环计步器
				if(pedometer!=null)
				{
					//查找是否存在该脚环计步器当天的数据记录
					tmpData=getPedometerData(data.getSerialNo(),data.getTime());
					//不存在该脚环计步器数据则新增否则修改
					if(tmpData==null)
					{
						pedometerDataMapper.save(data);
					}else
					{
						data.setId(tmpData.getId());
						if(data.getStep()>tmpData.getStep())
						{
							pedometerDataMapper.editById(data);
						}
					}
					pedometer.setUtime(new Date());
					pedometerService.edit(pedometer);
				}
			}
		}
	}

	@Override
	public PedometerData getPedometerData(String serialNo,Date date) {
		return pedometerDataMapper.getPedometerData(serialNo, date);
	}

	@Override
	public List<Map<Object, Object>> getPedometerDataSum() {
		return pedometerDataMapper.getPedometerDataSum(null);
	}

	@Override
	public List<Map<Object, Object>> getPedometerDataSum(Map<String, Object> params) {
		if(params!=null)
		{
			params.putAll(ContextUtil.getThreadLocalPagerMap());
		}else
		{
			params=ContextUtil.getThreadLocalPagerMap();
		}		
		return pedometerDataMapper.getPedometerDataSum(params);
	}
	
	

}
