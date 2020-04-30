import * as JWT from "jwt-decode";

// ログインユーザの情報を取得
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

  let sendConfig = {
    headers: { Authorization: "Bearer " + shareIT_token },
  };

  var user = {
    userID: jwt.uid,
    userName: jwt.name,
    shareITToken: shareIT_token,
    sendConfig: sendConfig,
  };

  return user;
}
