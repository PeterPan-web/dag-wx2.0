//查询本地code
import store from '../store/index';
import router from '../router'

export function Judgelogin() {
  if (store.state.loginStatus==0) {
    //需要跳转登陆
    router.push('getLoginSite')
  }else{
  //读取本地
  //console.log('处于登陆状态');
  }
}
export function JudgeloginInteraction() {
  if (store.state.loginStatus==0) {
    //需要跳转登陆
    //console.log('还没登陆现在跳转');
    router.push('getLogin')
  }else{
  //读取本地
  //console.log('处于登陆状态');
  }
}
//读取本地loginId
export function readLocalStorage() {
   // console.log('读取本地loginId');
    let loginId=JSON.parse(localStorage.getItem("loginId"));
     return loginId
} 
  //读取本地openid返回openid
export function readLocalStorageid() {

 // console.log('读取本地openid');
if (store.state.loginStatus==0) {
 // console.log('没有openid');
  return true
}else{
   let loginId=JSON.parse(localStorage.getItem("loginId"));
       return loginId.openid
}
 
}

