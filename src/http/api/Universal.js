import serviceAxios from "../index";
//触发访问流量
export const postSlow = () => {
  return serviceAxios({
    url:"/hfdagl/wechat!count.action", 
    method: "post"
  });
};