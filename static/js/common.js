
// // 弋江区档案馆正式
// var HOST_SERVER = "http://43.142.92.150/hfdagl/";
// var HOST_HOME = "http://43.142.92.150/hfdagl";


// //兰台记忆正式
// var HOST_SERVER = "http://43.142.92.150/zt_server/";
// var HOST_HOME = "http://43.142.92.150/zt_server";


// // //测试
var HOST_SERVER = "http://192.168.31.177:8080/hfdagl/";
var HOST_HOME = "http://192.168.31.177:8080/hfdagl";



//流量入口
var POST_flow = HOST_SERVER + "hfdagl/wechat!count.action";
//获取openId
var GETID_URL = HOST_SERVER + "wechat!getOpenid.action";
//snsapi_userinfo
var USERINFO_URL = HOST_SERVER + "wechat!getUserinfo.action";
//获取的code
var GETCODE_URL = HOST_SERVER + "wechat!getOpenInfo.action";
//就近查档
var NEAR_URL = HOST_SERVER + "nearApp!getNearInfo.action";
//查档历史
var HISARCH_URL = HOST_SERVER + "queryApp!archivesHistory.action";
//就近查档详情
var NEARDETAIL_URL = HOST_SERVER + "nearApp!detail.action";
//查档指南
var PARAMS_URL = HOST_SERVER + "wechat!param.action";
//查档指南
var GUIDE_URL = HOST_SERVER + "searchApp!search.action";
//联系我们
var LINK_URL = HOST_SERVER + "contactApp!contact.action";
//最新资讯
var NEWCONSULT_URL = HOST_SERVER + "fileinfoApp!appFileinfo.action";
//最新资讯的评论
var EVALUTE_URL = HOST_SERVER + "fileinfoApp!getCriticism.action";
//最新资讯添加评论
var ADD_EVALUTE_URL = HOST_SERVER + "fileinfoApp!addCriticism.action";
//档案查询
var SEARCH_URL = HOST_SERVER + "queryApp!getQuery.action";
//高级查询
var SEARCH_URL1 = HOST_SERVER + "queryApp!getQuery1.action";
//清除历史记录
var CLEAR_URL = HOST_SERVER + "queryApp!clearHistoryInfo.action";
//历史记录
var HISTORY_URL = HOST_SERVER + "queryApp!getHistoryInfo.action";
//档案分类
var TABLE_URL =  HOST_SERVER + "queryApp!getAllTable.action";
//投诉原因
var COMPLAINR_URL =  HOST_SERVER + "complaintApp!getComplaintReason.action";
//添加投诉
var ADDCOMPLAINRt_URL = HOST_SERVER + "complaintApp!addComplaint.action";
//上传投诉图片
var UPLOAD_URL = HOST_SERVER + "complaintApp!upload.action";
//保存投诉
var SAVECOMPLAINRt_URL = HOST_SERVER +"complaintApp!saveComplaint.action";

//档案详情
var ARCHDETAIL_URL = HOST_SERVER + "queryApp!adchiviesDetail.action";
//档案详情的点赞
var ARCHPRAISE_URL = HOST_SERVER + "queryApp!praise.action";
//档案详情的收藏
var ARCHCOLLECT_URL = HOST_SERVER + "queryApp!collect.action";
//档案详情的评论
var ARCHCOMMENT_URL = HOST_SERVER + "queryApp!comment.action";
//档案资讯
var CONSULT_URL = HOST_SERVER + "fileinfoApp!search.action";
//档案资讯评论
var ARCH_CONSULT_URL = HOST_SERVER +"fileinfoApp!detail.action";
//档案资讯评论
var CONSULT_COMMENT_URL = HOST_SERVER +"fileinfoApp!getCriticism.action";
//档案资讯添加评论
var ARCH_ADD_URL = HOST_SERVER +"fileinfoApp!addCriticism.action";
//档案资讯添加收藏
var ARCH_COLLECT_URL = HOST_SERVER +"fileinfoApp!addCollect.action";
//档案资讯添加点赞
var ARCH_PRAISE_URL = HOST_SERVER +"fileinfoApp!addPraise.action";
//移动展厅
var SHOW_URL = HOST_SERVER +"exhibitionApp!appExhibition.action";
//移动展厅
var TYPESHOW_URL = HOST_SERVER +"exhibitionApp!search.action";
//移动展厅详情
var SHOWDETAIL_URL = HOST_SERVER +"exhibitionApp!detail.action";
//移动展厅详情禁言
var FORBIDDEN_URL = HOST_SERVER +"exhibitionApp!isForbidden.action";
//移动展厅详情获取评论
var SHOWGET_URL = HOST_SERVER +"exhibitionApp!getCriticism.action";
//移动展厅详情点赞
var SHOWPRAISE_URL = HOST_SERVER +"exhibitionApp!addPraise.action";
//移动展厅详情收藏
var SHOWCOLLECT_URL = HOST_SERVER +"exhibitionApp!addCollect.action";
//移动展厅详情添加评论
var SHOWADD_URL = HOST_SERVER +"exhibitionApp!addCriticism.action";
//信息公开
var OPEN_URL = HOST_SERVER +"informationApp!search.action";
//信息公开详情
var OPEN_DETAIL_URL = HOST_SERVER +"informationApp!detail.action";
//信息公开评论
var OPEN_COMMENT_URL = HOST_SERVER +"informationApp!getCriticism.action";
//信息公开添加评论
var OPEN_ADD_URL = HOST_SERVER +"informationApp!addCriticism.action";
//信息公开添加收藏
var OPEN_COLLECT_URL = HOST_SERVER +"informationApp!addCollect.action";
//信息公开添加点赞
var OPEN_PRAISE_URL = HOST_SERVER +"informationApp!addPraise.action";
//我来帮忙
var HELP_URL = HOST_SERVER +"helpApp!getAllInfo.action";
//帮忙的评论
var HELP_COMMENT_URL = HOST_SERVER +"helpApp!getCriticism.action";
//帮忙发表评论
var HELP_PUSH_URL = HOST_SERVER +"helpApp!addComment.action";
//我的帮忙
var MYHELP_URL = HOST_SERVER +"helpApp!MyHelp.action";
//我有档案
var MYHAVE_URL = HOST_SERVER +"helpApp!myHave.action";
//上传档案图片
var HAVEPIC_URL = HOST_SERVER +"helpApp!upload.action";

//我的档案
var HAVE_URL = HOST_SERVER +"helpApp!myArchivesApp.action";
//我的档案详情
var HAVE_DETAIL_URL = HOST_SERVER +"helpApp!myArchivesDetail.action";
//问题反馈
var FEED_URL = HOST_SERVER +"backfeedApp!getAllQuestion.action";
//问题反馈浏览次数
var BROWSE_URL = HOST_SERVER +"backfeedApp!addBrowse.action";
//添加意见
var SUGGESTION_URL = HOST_SERVER +"backfeedApp!addQuestion.action";
//意见详情
var SUGGESTION_DETAIL_URL = HOST_SERVER +"backfeedApp!getQuestionDetail.action";
//预约登记
var REGISTER_URL = HOST_SERVER +"book!doBookApp.action";
//合肥通档案检索获取user
//var HFT_SEARCH_USER_URL="https://www.ustcinfo.com/soical-hefei/static/index/api/hefeitong/getUserInfo";
var HFT_SEARCH_USER_URL=HOST_SERVER+"queryApp!getHFTUser.action";
//保存合肥通用户id
var ADD_HFT_USERID_URL=HOST_SERVER+"queryApp!addHFTUserId.action";
//合肥通档案检索
var HFT_SEARCH_URL= HOST_SERVER + "queryApp!getQuery_htf.action";
//满意度调查
var SURVEY_URL = HOST_SERVER + "surveycms!doSurveyApp.action";
//我的评论查询
var COMMENT_URL = HOST_SERVER + "userApp!myComments.action";
//我的收藏查询
var COLLECTION_URL = HOST_SERVER + "userApp!myCollects.action";
//上传电话号码
var EDITINFO_URL = HOST_SERVER + "wechat!modifyUserInfo.action";
//获取红色记忆分类
var GETREDTITLE_URL = HOST_SERVER + "redmemoryApp!appRedMemory.action";
//获取红色记忆
var GETREDLIST_URL = HOST_SERVER +"redmemoryApp!info.action";
//获取红色记忆详情
var GET_DETAIL_REDLIST_URL = HOST_SERVER + "redmemoryApp!detail.action";
//获取红色记忆收藏
var REDLIST_collect_URL = HOST_SERVER + "redmemoryApp!addCollect.action";
//获取红色记忆点赞
var REDLIST_priaise_URL = HOST_SERVER + "redmemoryApp!addPraise.action";
//获取红色记忆评论
var REDLIST_getcri_URL = HOST_SERVER + "redmemoryApp!getCriticism.action";
//获取红色记忆禁言
var REDLIST_isforbid_URL = HOST_SERVER + "redmemoryApp!isForbidden.action";
//在红色记忆添加评论
var REDLIST_addcri_URL = HOST_SERVER + "redmemoryApp!addCriticism.action";
/*
var HOST_SERVER = "http://192.168.3.196:8080/hfdagl/";
var HOST_HOME = "http://192.168.3.196:8080/hfdagl";
*/
/*var HOST_SERVER = "http://192.168.1.135:8056/bhlsx/";
var HOST_HOME = "http://192.168.1.135:8056/bhlsx";*//*

*/
/*var HOST_SERVER = "http://localhost:8080/hfdagl/";
var HOST_HOME = "http://localhost:8080/hfdagl";*//*

//获取Id
var GETID_URL = HOST_SERVER + "wechat!getOpenid.action";
//就近查档
var NEAR_URL = HOST_SERVER + "nearApp!getNearInfo.action";
//查档历史
var HISARCH_URL = HOST_SERVER + "queryApp!archivesHistory.action";
//就近查档详情
var NEARDETAIL_URL = HOST_SERVER + "nearApp!detail.action";
//查档指南
var PARAMS_URL = HOST_SERVER + "wechat!param.action";
//查档指南
var GUIDE_URL = HOST_SERVER + "searchApp!search.action";
//联系我们
var LINK_URL = HOST_SERVER + "contactApp!contact.action";
//最新资讯
var NEWCONSULT_URL = HOST_SERVER + "fileinfoApp!appFileinfo.action";
//最新资讯的评论
var EVALUTE_URL = HOST_SERVER + "fileinfoApp!getCriticism.action";
//最新资讯添加评论
var ADD_EVALUTE_URL = HOST_SERVER + "fileinfoApp!addCriticism.action";
//档案查询
var SEARCH_URL = HOST_SERVER + "queryApp!getQuery.action";
//清除历史记录
var CLEAR_URL = HOST_SERVER + "queryApp!clearHistoryInfo.action";
//历史记录
var HISTORY_URL = HOST_SERVER + "queryApp!getHistoryInfo.action";
//档案详情
var ARCHDETAIL_URL = HOST_SERVER + "queryApp!adchiviesDetail.action";
//档案详情的点赞
var ARCHPRAISE_URL = HOST_SERVER + "queryApp!praise.action";
//档案详情的收藏
var ARCHCOLLECT_URL = HOST_SERVER + "queryApp!collect.action";
//档案详情的评论
var ARCHCOMMENT_URL = HOST_SERVER + "queryApp!comment.action";
//档案资讯
var CONSULT_URL = HOST_SERVER + "fileinfoApp!search.action";
//档案资讯评论
var ARCH_CONSULT_URL = HOST_SERVER +"fileinfoApp!detail.action";
//档案资讯评论
var CONSULT_COMMENT_URL = HOST_SERVER +"fileinfoApp!getCriticism.action";
//档案资讯添加评论
var ARCH_ADD_URL = HOST_SERVER +"fileinfoApp!addCriticism.action";
//档案资讯添加收藏
var ARCH_COLLECT_URL = HOST_SERVER +"fileinfoApp!addCollect.action";
//档案资讯添加点赞
var ARCH_PRAISE_URL = HOST_SERVER +"fileinfoApp!addPraise.action";
//移动展厅
var SHOW_URL = HOST_SERVER +"exhibitionApp!appExhibition.action";
//移动展厅
var TYPESHOW_URL = HOST_SERVER +"exhibitionApp!search.action";
//移动展厅详情
var SHOWDETAIL_URL = HOST_SERVER +"exhibitionApp!detail.action";
//移动展厅详情禁言
var FORBIDDEN_URL = HOST_SERVER +"exhibitionApp!isForbidden.action";
//移动展厅详情获取评论
var SHOWGET_URL = HOST_SERVER +"exhibitionApp!getCriticism.action";
//移动展厅详情点赞
var SHOWPRAISE_URL = HOST_SERVER +"exhibitionApp!addPraise.action";
//移动展厅详情收藏
var SHOWCOLLECT_URL = HOST_SERVER +"exhibitionApp!addCollect.action";
//移动展厅详情添加评论
var SHOWADD_URL = HOST_SERVER +"exhibitionApp!addCriticism.action";
//信息公开
var OPEN_URL = HOST_SERVER +"informationApp!search.action";
//信息公开详情
var OPEN_DETAIL_URL = HOST_SERVER +"informationApp!detail.action";
//信息公开评论
var OPEN_COMMENT_URL = HOST_SERVER +"informationApp!getCriticism.action";
//信息公开添加评论
var OPEN_ADD_URL = HOST_SERVER +"informationApp!addCriticism.action";
//信息公开添加收藏
var OPEN_COLLECT_URL = HOST_SERVER +"informationApp!addCollect.action";
//信息公开添加点赞
var OPEN_PRAISE_URL = HOST_SERVER +"informationApp!addPraise.action";
//我来帮忙
var HELP_URL = HOST_SERVER +"helpApp!getAllInfo.action";
//帮忙的评论
var HELP_COMMENT_URL = HOST_SERVER +"helpApp!getCriticism.action";
//帮忙发表评论
var HELP_PUSH_URL = HOST_SERVER +"helpApp!addComment.action";
//我的帮忙
var MYHELP_URL = HOST_SERVER +"helpApp!MyHelp.action";
//我有档案
var MYHAVE_URL = HOST_SERVER +"helpApp!myHave.action";
//我的档案
var HAVE_URL = HOST_SERVER +"helpApp!myArchives.action";
//我的档案详情
var HAVE_DETAIL_URL = HOST_SERVER +"helpApp!myArchivesDetail.action";
//问题反馈
var FEED_URL = HOST_SERVER +"backfeedApp!getAllQuestion.action";
//添加意见
var SUGGESTION_URL = HOST_SERVER +"backfeedApp!addQuestion.action";
//意见详情
var SUGGESTION_DETAIL_URL = HOST_SERVER +"backfeedApp!getQuestionDetail.action";*/
