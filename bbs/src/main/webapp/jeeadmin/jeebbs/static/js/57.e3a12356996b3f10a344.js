webpackJsonp([57],{579:function(t,e,i){function a(t){i(861)}var o=i(66)(i(673),i(948),a,null,null);t.exports=o.exports},660:function(t,e,i){"use strict";function a(t){return i.i(k.a)({url:"/api/admin/forum/listGroupByCategory",method:"post",data:t})}function o(t){return i.i(k.a)({url:"/api/admin/category/list",method:"post",data:t})}function s(t){return i.i(k.a)({url:"/api/admin/forum/list",method:"post",data:t})}function n(t){return i.i(k.a)({url:"/api/admin/forum/batchupdate",method:"post",signValidate:!0,data:t})}function r(t){return i.i(k.a)({url:"/api/admin/category/delete",method:"post",signValidate:!0,data:t})}function p(t){return i.i(k.a)({url:"/api/admin/forum/delete",method:"post",signValidate:!0,data:t})}function l(t){return i.i(k.a)({url:"/api/admin/category/o_priority_update",method:"post",signValidate:!0,data:t})}function u(t){return i.i(k.a)({url:"/api/admin/forum/o_priority_update",method:"post",signValidate:!0,data:t})}function c(t){return i.i(k.a)({url:"/api//admin/forum/get",method:"post",data:t})}function d(t){return i.i(k.a)({url:"/api/admin/forum/update",method:"post",signValidate:!0,data:t})}function f(t){return i.i(k.a)({url:"/api/admin/topicType/tree",method:"post",signValidate:!1,data:t})}function m(t){return i.i(k.a)({url:"/api/admin/topicType/list",method:"post",signValidate:!1,data:t})}function y(t){return i.i(k.a)({url:"/api/admin/topicType/get",method:"post",signValidate:!1,data:t})}function g(t){return i.i(k.a)({url:"/api/admin/topicType/delete",method:"post",signValidate:!0,data:t})}function h(t){return i.i(k.a)({url:"/api/admin/topicType/update",method:"post",signValidate:!0,data:t})}function v(t){return i.i(k.a)({url:"/api/admin/topicType/save",method:"post",signValidate:!0,data:t})}function T(t){return i.i(k.a)({url:"/api/admin/sensitivity/list",method:"post",signValidate:!1,data:t})}function b(t){return i.i(k.a)({url:"/api/admin/sensitivity/delete",method:"post",signValidate:!0,data:t})}function I(t){return i.i(k.a)({url:"/api/admin/sensitivity/save",method:"post",signValidate:!0,data:t})}function _(t){return i.i(k.a)({url:"/api/admin/sensitivity/batch_update",method:"post",signValidate:!0,data:t})}function $(t){return i.i(k.a)({url:"/api/admin/sensitivity/batch_save",method:"post",signValidate:!0,data:t})}function C(t){return i.i(k.a)({url:"/api/admin/report/list",method:"post",data:t})}function V(t){return i.i(k.a)({url:"/api/admin/report/get",method:"post",data:t})}function x(t){return i.i(k.a)({url:"/api/admin/report/process",signValidate:!0,method:"post",data:t})}function q(t){return i.i(k.a)({url:"/api/admin/report/delete",signValidate:!0,method:"post",data:t})}e.t=a,e.q=o,e.a=s,e.u=n,e.v=r,e.w=p,e.x=l,e.y=u,e.r=c,e.s=d,e.k=f,e.o=m,e.l=y,e.p=g,e.m=h,e.n=v,e.g=T,e.j=b,e.h=I,e.i=_,e.f=$,e.d=C,e.b=V,e.e=x,e.c=q;var k=i(150),w=i(101);i.n(w)},673:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(68),o=i.n(a),s=i(660);e.default={data:function(){var t=function(t,e,i){if(""===e)i(new Error("请输入路径"));else{/[\W]/g.test(e)?i(new Error("路径只能输入数字，字母")):i()}};return{fileState:!0,dialogVisible:!1,loading:!0,count:0,state:!1,imgPath:"",rootId:0,upobj:{type:"image",sessionKey:localStorage.getItem("sessionKey"),appId:this.$store.state.appId},topicTypeInfo:{},topicTypeTree:[],rules:{name:[{required:!0,message:"请填写一个主题分类名",trigger:"blur"}],path:[{validator:t,trigger:"blur"}],priority:[{required:!0,type:"number",message:"请填写一个数字排序",trigger:"blur"}]}}},methods:{showBig:function(){this.dialogVisible=!0},getTopicTypeTree:function(){var t=this;s.k().then(function(e){"100"==e.code?(t.topicTypeTree=[],t.tree(e.body),t.loading=!1):t.$message.error(e.message)})},tree:function(t){for(var e=0;e<t.length;e++)"object"==o()(t[e].child)?(this.topicTypeTree.push({count:t[e].count,name:t[e].name,id:t[e].id}),this.tree(t[e].child)):this.topicTypeTree.push({count:t[e].count,name:t[e].name,id:t[e].id})},getTopicTypeInfo:function(t){var e=this;s.l({id:t}).then(function(t){"100"==t.code?(e.loading=!1,"add"==e.$route.query.type&&(t.body.parentId=e.$route.query.rootId),e.topicTypeInfo=t.body,""==e.topicTypeInfo.typeLog?e.state=!0:(e.imgPath=t.body.typeLog,e.state=!1)):(e.loading=!1,e.$message.error(t.message))}).catch(function(t){e.loading=!1,e.$message.error("网络异常")})},setChange:function(t){this.topicTypeInfo.root=t},updateTopicTypeInfo:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return!1;var i=e.topicTypeInfo;s.m(i).then(function(t){"100"==t.code?(e.$message.success("修改成功"),setTimeout(function(){e.$router.push({path:"/topictypelist"})},1e3)):e.$message.error(t.message)}).catch(function(t){e.$message.error("修改失败")})})},addTopictype:function(t){this.$router.push({path:"/topictypeadd",query:{type:"add",id:0,rootId:t}})},addTopicTypeInfo:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return!1;var i=e.topicTypeInfo;s.n(i).then(function(t){"100"==t.code?(e.$message.success("添加成功"),setTimeout(function(){e.$router.push({path:"/topictypelist"})},1e3)):e.$message.error(t.message)}).catch(function(t){e.$message.error("修改失败")})})},back:function(){this.$router.push({path:"/topictypelist",query:{id:this.topicTypeInfo.root,noceStr:Math.round(10*Math.random())}})},beforeAvatarUpload:function(t){this.fileState=!0;var e="image/jpeg"===t.type||"image/png"===t.type||"image/gif"===t.type,i=t.size/1024/1024<2;return e||this.$message.error("上传头像图片只能是 JPG 格式!"),i||this.$message.error("上传头像图片大小不能超过2MB!"),e&&i},getImgPath:function(t,e,i){this.imgPath=t.body.url,this.fileState=!1,this.state=!1,this.topicTypeInfo.typeLog=t.body.url},resetForm:function(t){this.$route.query.id;this.$refs[t].resetFields()}},created:function(){var t=this.$route.query.type,e=this.$route.query.id,i=this.$route.query.rootId;this.rootId=i,this.getTopicTypeTree(),"add"==t?this.getTopicTypeInfo(e):"edit"==t&&this.getTopicTypeInfo(e)},watch:{$route:function(t,e){var i=this.$route.query.id;this.loading=!0,this.getTopicTypeTree(),this.getTopicTypeInfo(i)}}}},775:function(t,e,i){e=t.exports=i(570)(!1),e.push([t.i,"",""])},861:function(t,e,i){var a=i(775);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i(571)("092a186e",a,!0)},948:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"forum-module"},[i("div",{staticClass:"forum-header"},[i("span",{staticClass:"forum-name"},[t._v(t._s(t.$route.name))]),t._v(" "),i("div",{staticClass:"pull-right"})]),t._v(" "),i("div",{directives:[{name:"loading",rawName:"v-loading.body",value:t.loading,expression:"loading",modifiers:{body:!0}}],staticClass:"table-body table-responsive"},[i("el-form",{ref:"topicInfo",attrs:{rules:t.rules,model:t.topicTypeInfo}},[i("el-form-item",{staticClass:"form-group",attrs:{label:"上级分类"}},[i("el-col",{attrs:{span:6}},[i("el-select",{attrs:{placeholder:"分类"},on:{change:t.setChange},model:{value:t.topicTypeInfo.parentId,callback:function(e){t.$set(t.topicTypeInfo,"parentId",e)},expression:"topicTypeInfo.parentId"}},[i("el-option",{attrs:{label:"根目录",value:""}}),t._v(" "),t._l(t.topicTypeTree,function(e,a){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}},[e.count>1?i("span",{style:{paddingLeft:10*e.count+"px"}},[t._v(">"+t._s(e.name))]):i("span",{style:{paddingLeft:10*e.count+"px"}},[t._v(t._s(e.name))])])})],2),t._v(" "),i("label")],1)],1),t._v(" "),i("el-form-item",{staticClass:"form-group",attrs:{label:"名称",prop:"name"}},[i("el-col",{attrs:{span:6}},[i("el-input",{model:{value:t.topicTypeInfo.name,callback:function(e){t.$set(t.topicTypeInfo,"name",e)},expression:"topicTypeInfo.name"}})],1),t._v(" "),i("el-col",{staticClass:"required",attrs:{span:1}},[t._v("* ")])],1),t._v(" "),i("el-form-item",{staticClass:"form-group",attrs:{label:"路径",prop:"path"}},[i("el-col",{attrs:{span:6}},[i("el-input",{model:{value:t.topicTypeInfo.path,callback:function(e){t.$set(t.topicTypeInfo,"path",e)},expression:"topicTypeInfo.path"}})],1),t._v(" "),i("el-col",{staticClass:"required",attrs:{span:1}},[t._v("* ")])],1),t._v(" "),i("el-form-item",{staticClass:"form-group",attrs:{label:"排序",prop:"priority"}},[i("el-col",{attrs:{span:6}},[i("el-input",{model:{value:t.topicTypeInfo.priority,callback:function(e){t.$set(t.topicTypeInfo,"priority",t._n(e))},expression:"topicTypeInfo.priority"}})],1),t._v(" "),i("el-col",{staticClass:"required",attrs:{span:1}},[t._v("* ")])],1),t._v(" "),i("el-form-item",{staticClass:"form-group",attrs:{label:"是否显示"}},[i("el-col",{attrs:{span:1}},[i("el-switch",{attrs:{"on-text":"是","off-text":"否"},model:{value:t.topicTypeInfo.display,callback:function(e){t.$set(t.topicTypeInfo,"display",e)},expression:"topicTypeInfo.display"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"form-group",attrs:{label:"图标预览"}},[i("el-col",{attrs:{span:6}},[i("el-input",{model:{value:t.topicTypeInfo.typeLog,callback:function(e){t.$set(t.topicTypeInfo,"typeLog",e)},expression:"topicTypeInfo.typeLog"}}),t._v(" "),i("div",{class:t.state?"pic-box":"pic-box-no"},[t.state?t._e():i("img",{attrs:{src:t.$store.state.baseUrl+t.imgPath,alt:""},on:{click:t.showBig}})])],1),t._v(" "),i("el-col",{attrs:{span:6}},[i("el-upload",{staticClass:"upload-demo",attrs:{action:t.$store.state.upLoadUrl,name:"uploadFile",data:t.upobj,"before-upload":t.beforeAvatarUpload,"on-success":t.getImgPath,"show-file-list":t.fileState}},[i("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary"}},[t._v("点击上传")])],1),t._v(" "),i("el-dialog",{staticClass:"pic-dialog",attrs:{title:"按下esc退出全屏",size:"full"},model:{value:t.dialogVisible,callback:function(e){t.dialogVisible=e},expression:"dialogVisible"}},[i("img",{staticClass:"big-img",attrs:{src:t.$store.state.baseUrl+t.imgPath,alt:""}})])],1)],1),t._v(" "),i("el-form-item",{staticClass:"form-group",attrs:{label:"描述"}},[i("el-col",{attrs:{span:6}},[i("el-input",{attrs:{type:"textarea"},model:{value:t.topicTypeInfo.description,callback:function(e){t.$set(t.topicTypeInfo,"description",e)},expression:"topicTypeInfo.description"}})],1)],1)],1),t._v(" "),i("div",{staticClass:"margin-md"},["edit"==t.$route.query.type?i("input",{staticClass:"bbs-submit",attrs:{type:"button",value:"提交"},on:{click:function(e){t.updateTopicTypeInfo("topicInfo")}}}):t._e(),t._v(" "),"add"==t.$route.query.type?i("input",{staticClass:"bbs-submit",attrs:{type:"button",value:"提交"},on:{click:function(e){t.addTopicTypeInfo("topicInfo")}}}):t._e(),t._v(" "),i("input",{staticClass:"bbs-reset",attrs:{type:"reset",value:"重置"}})])],1)])},staticRenderFns:[]}}});