package com.jeecms.plug.live.directive;

import static com.jeecms.common.web.freemarker.DirectiveUtils.OUT_PAGINATION;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.jeecms.bbs.web.FrontUtils;
import com.jeecms.common.page.Pagination;
import com.jeecms.common.web.freemarker.DefaultObjectWrapperBuilderFactory;
import com.jeecms.common.web.freemarker.DirectiveUtils;
import com.jeecms.plug.live.manager.BbsLiveUserAccountMng;

import freemarker.core.Environment;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateDirectiveModel;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;

@Component("live_host_page")
public class LiveHostPageDirective implements TemplateDirectiveModel {
	/**
	 * 输入参数，排序 
	 * 1总收益降序 2总收益升序 3年收益降序 4年收益升序  5月收益降序 6月收益升序  
	 * 7日收益降序 8日收益升序  11账户余额降序 12账户余额升序   13总门票降序 14总门票升序  
	 * 15总礼物数降序 16总礼物数升序 17置顶降序 18置顶升序 
	 */
	public static final String PARAM_ORDER_BY = "orderBy";

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void execute(Environment env, Map params, TemplateModel[] loopVars,
			TemplateDirectiveBody body) throws TemplateException, IOException {
		Integer orderBy = getOrderBy(params);
		Pagination page=liveUserAccountMng.getPage(null,orderBy, FrontUtils.getPageNo(env), 
				FrontUtils.getCount(params));
		Map<String, TemplateModel> paramWrap = new HashMap<String, TemplateModel>(
				params);
		paramWrap.put(OUT_PAGINATION, DefaultObjectWrapperBuilderFactory.getDefaultObjectWrapper().wrap(page));
		Map<String, TemplateModel> origMap = DirectiveUtils
				.addParamsToVariable(env, paramWrap);
		body.render(env.getOut());
		DirectiveUtils.removeParamsFromVariable(env, paramWrap, origMap);
	}
	
	private Integer getOrderBy(Map<String, TemplateModel> params)
			throws TemplateException {
		return DirectiveUtils.getInt(PARAM_ORDER_BY, params);
	}

	@Autowired
	private BbsLiveUserAccountMng  liveUserAccountMng;
}
