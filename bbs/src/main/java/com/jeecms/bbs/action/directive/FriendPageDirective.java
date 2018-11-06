package com.jeecms.bbs.action.directive;

import static com.jeecms.common.web.freemarker.DirectiveUtils.OUT_PAGINATION;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.jeecms.bbs.manager.BbsUserMng;
import com.jeecms.bbs.web.FrontUtils;
import com.jeecms.common.page.Pagination;
import com.jeecms.common.web.freemarker.DefaultObjectWrapperBuilderFactory;
import com.jeecms.common.web.freemarker.DirectiveUtils;

import freemarker.core.Environment;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateDirectiveModel;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;

/**
 *江西金磊科技发展有限公司jeecms研发
 */
@Component("friend_page")
public class FriendPageDirective implements TemplateDirectiveModel {
	public static final String PARAM_USERNAME = "username";

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void execute(Environment env, Map params, TemplateModel[] loopVars,
			TemplateDirectiveBody body) throws TemplateException, IOException {
		String username = getUsername(params);
		//修改为list查询
		Pagination pagination = bbsUserMng.getPage(username, null, null, false,
		false,false,null,null,
		null, FrontUtils.getPageNo(env), FrontUtils.getCount(params));
		//List<BbsUser> list = bbsUserMng.getList(username, null, false, false, false, 0, Integer.MAX_VALUE);
		Map<String, TemplateModel> paramWrap = new HashMap<String, TemplateModel>(
				params);
		paramWrap.put(OUT_PAGINATION, DefaultObjectWrapperBuilderFactory.getDefaultObjectWrapper().wrap(pagination));
		Map<String, TemplateModel> origMap = DirectiveUtils
				.addParamsToVariable(env, paramWrap);
		body.render(env.getOut());
		DirectiveUtils.removeParamsFromVariable(env, paramWrap, origMap);
	}

	private String getUsername(Map<String, TemplateModel> params)
			throws TemplateException {
		String username = DirectiveUtils.getString(PARAM_USERNAME, params);
		return username == null ? "" : username;
	}

	@Autowired
	private BbsUserMng bbsUserMng;
}
