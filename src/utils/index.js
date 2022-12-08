//查询本地code
import router from '../router'

export function Judgelogin() {
  if (JSON.parse(localStorage.getItem("ltjyopenId"))==null) {
    //需要跳转登陆
    router.push('peopleSite')
  }else{
  //读取本地
  //console.log('处于登陆状态');
  }
}
export function JudgeloginInteraction() {
  if (JSON.parse(localStorage.getItem("ltjyopenId"))==null) {
    //需要跳转登陆
    //console.log('还没登陆现在跳转');
    router.push('people')
  }else{
  //读取本地
  //console.log('处于登陆状态');
  }
}
//读取本地loginId
export function readLocalStorage() {
   // console.log('读取本地loginId');
    let loginId=JSON.parse(localStorage.getItem("ltjyloginId"));
     return loginId
}
//读取本地loginId
export function readLocalloginId() {
  // console.log('读取本地loginId');
   let loginId=JSON.parse(localStorage.getItem("ltjyloginId"));
    return loginId
}
//读取本地openid
export function readLocalopenid() {
  // console.log('读取本地openid');
   let openid=JSON.parse(localStorage.getItem("ltjyopenId"));
    return openid
}





