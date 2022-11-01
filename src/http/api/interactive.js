import serviceAxios from "../index";
//触发访问流量
export const PostSatisfaction = (data) => {
  return serviceAxios({
    url:"/surveycms!doSurveyApp.action", 
    method: "post",
    data
  });
};