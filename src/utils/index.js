//查询本地code
import router from '../router'

export function Judgelogin() {
  if (readLocalStorage()==null) {
    //需要跳转登陆
    router.push('peopleSite')
  }else{
  //读取本地
  //console.log('处于登陆状态');
  }
}
export function JudgeloginInteraction() {
  if (readLocalStorage()==null) {
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
    let loginId=JSON.parse(sessionStorage.getItem("loginId"));
     return loginId
}

  //读取本地openid返回openid
export function readLocalStorageid() {

 // console.log('读取本地openid');
if (readLocalStorage()==null) {
 // console.log('没有openid');
  return true
}else{
   let loginId=JSON.parse(sessionStorage.getItem("loginId"));
       return loginId.openid
}
 
}

