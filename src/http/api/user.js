import serviceAxios from "../index";
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
    url:"/hfdagl/wechat!updateUserInfo.action", 
    method: "get",
    params
  });
}



// export const getUserInfo = (data) => {
//   return serviceAxios({
//     url: "/api/website/queryMenuWebsite",
//     method: "post",
//     data,
//   });
// };
// export const login = (params) => {
//   return serviceAxios({
//     url: '/wxh5/login?code='+params,
//     method: "post",
//   });
// };