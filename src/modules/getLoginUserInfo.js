import * as JWT from "jwt-decode";

/**
 * ログインユーザの情報を取得
 */
export default function getLoginUserInfo() {
  // ログインの有無チェック
  let shareIT_token = localStorage.getItem("shareIT_token");
  if (shareIT_token == null) {
    return null;
  }

  // 有効期限チェック
  const jwt = JWT(shareIT_token);
  var current_time = new Date().getTime() / 1000;
  if (current_time > jwt.exp) {
    return "jwt expires";
  }

  // token取得
  let sendConfig = {
    headers: { Authorization: "Bearer " + shareIT_token },
  };

  // adminチェック
  let admin = jwt.admin;

  var user = {
    userID: jwt.uid,
    userName: jwt.name,
    admin: admin,
    shareITToken: shareIT_token,
    sendConfig: sendConfig,
  };

  return user;
}
