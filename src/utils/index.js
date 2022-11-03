//查询本地code
import store from '../store/index';
import router from '../router'

export function Judgelogin() {
  if (store.state.loginStatus==0) {
    //需要跳转登陆
    console.log('还没登陆修改后跳转');
    console.log(router);
    router.push('getLoginSite',router)
    
  }else{
  //读取本地
  console.log('处于登陆状态');
  }
}

export function readLocalStorage() {
    //读取本地loginId
   // console.log('读取本地loginId');
    let loginId=JSON.parse(localStorage.getItem("loginId"));
     return loginId
}
export function readLocalStorageid() {
  //读取本地openid
 // console.log('读取本地openid');
if (store.state.loginStatus==0) {
 // console.log('没有openid');
  return true
}else{
   let loginId=JSON.parse(localStorage.getItem("loginId"));
       return loginId.openid
}
 
}

