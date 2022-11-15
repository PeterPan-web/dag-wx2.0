import serviceAxios from "../index";
//上传code
export const postCode = (params) => {
  return serviceAxios({
    url:"/wechat!getUserinfo.action", 
    method: "post",
    params
  });
};

//用户页面通用get
export const currencyGet = (url) => {
  return serviceAxios({
    url:url, 
    method: "get",
  });
};
//返回用户信息
export const postUserinfo = (params) => {
  return serviceAxios({
    url:"/wechat!updateUserInfo.action", 
    method: "get",
    params
  });
}

