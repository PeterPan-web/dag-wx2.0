import serviceAxios from "../index";
//上传code
export const postredlist = () => {
  return serviceAxios({
    url:"/redmemoryApp!appRedMemory.action", 
    method: "post",
  });
};