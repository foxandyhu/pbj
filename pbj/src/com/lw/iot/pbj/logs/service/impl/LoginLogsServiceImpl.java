package com.lw.iot.pbj.logs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import com.lw.iot.pbj.core.annotation.ActionModel;
import com.lw.iot.pbj.core.annotation.LogRecord;
import com.lw.iot.pbj.core.annotation.RecordType;
import com.lw.iot.pbj.core.base.service.impl.BaseServiceImpl;
import com.lw.iot.pbj.logs.entity.LoginLogs;
import com.lw.iot.pbj.logs.persistence.LoginLogsMapper;
import com.lw.iot.pbj.logs.service.ILoginLogsService;
import com.lw.iot.pbj.member.entity.Member;
import com.lw.iot.pbj.member.service.IMemberService;
import com.lw.iot.pbj.users.entity.Users;
import com.lw.iot.pbj.users.service.IUserService;

@Service("LoginLogsServiceImpl")
@Transactional(propagation=Propagation.SUPPORTS)
@ActionModel(description="登录日志管理")
@LogRecord(record=RecordType.IGNORE)
public class LoginLogsServiceImpl extends BaseServiceImpl<LoginLogs> implements ILoginLogsService {

	@Autowired
	private LoginLogsMapper loginLogsMapper;
	@Autowired
	private IMemberService memberService;
	@Autowired
	private IUserService userService;

	@Override
	public LoginLogs getLatestLog(int memberId,int index,int type)
	{
		Assert.isTrue(index>0,"记录数必须大于0");
		index=index-1;
		String userName=null;
		if(LoginLogs.MEMBER_LOGIN==type)
		{
			Member member=memberService.get(memberId);
			userName=member==null?null:member.getPhone();
		}else if(LoginLogs.USERS_LOGIN==type)
		{
			Users user=userService.get(memberId);
			userName=user==null?null:user.getUserName();
		}
		if(userName!=null)
		{
			return loginLogsMapper.getLatestLog(userName,index);
		}
		return null;
	}

}