import * as JWT from "jwt-decode";

// ログインユーザの情報(IDとユーザ名)を取得
export default function getLoginUserInfo() {
  let shareIT_token = localStorage.getItem("shareIT_token");
  if (shareIT_token == null) {
    return null;
  }

  const jwt = JWT(shareIT_token);
  var current_time = new Date().getTime() / 1000;
  if (current_time > jwt.exp) {
    return "jwt expires";
  }
  var user = {
    userID: jwt.uid,
    userName: jwt.name,
    shareITToken: shareIT_token,
  };

  return user;
}
