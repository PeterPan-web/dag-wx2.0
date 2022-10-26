
import serviceAxios from "../index";


//1调用获取code
export const getUrl = (url) => {
  return serviceAxios({
    url:url, 
    method: "get"
  });
};

//1调用获取code
export const getUserinfo = (params) => {
  return serviceAxios({
    url:'http://43.142.92.150:80/hfdagl/wechat!getUserinfo.action', 
    //url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx1ca21428bbde6b0c&secret=adf3e7039e86ac18c700f618a1737d0b",
    method: "post",
    params,
  });
};
//3.open id
export const getOpenid = (params) => {
  return serviceAxios({
    url:'http://43.142.92.150:80/hfdagl/wechat!getOpenid.action', 
    //url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx1ca21428bbde6b0c&secret=adf3e7039e86ac18c700f618a1737d0b",
    method: "post",
    params,
  });
};

//2带code调用openinfo
export const getOpenInfo = (params) => {
  return serviceAxios({
    url:'http://43.142.92.150:80/hfdagl/wechat!getOpenInfo.action', 
    //url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx1ca21428bbde6b0c&secret=adf3e7039e86ac18c700f618a1737d0b",
    method: "post",
    params,
  });
};
export const getUserInfo = (params) => {
  return serviceAxios({
    url: "/api/website/queryMenuWebsite",
    method: "post",
    params,
  });
};
export const login = (data) => {
  return serviceAxios({
    url: "/api/user/login",
    method: "post",
    data,
  });
};