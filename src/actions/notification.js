import axios from "axios";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import env from "env";

export const GET_ALL_NOTIFICATIONS = "GET_ALL_NOTIFICATIONS";
export const CHANGE_NON_READ_TO_READ = "CHANGE_NON_READ_TO_READ";

const ROOT_URL = env.ROOT_URL;

// ユーザの全通知を取得
export const getAllNotifications = (userID) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();

  const response = await axios.get(
    `${ROOT_URL}/api/users/${userID}/notifications`,
    loginUserInfo.sendConfig
  );

  dispatch({ type: GET_ALL_NOTIFICATIONS, response });
};

// 未読を既読に
export const changeNonReadToRead = (notificationObj) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const userID = loginUserInfo.userID;

  const response = await axios.put(
    `${ROOT_URL}/api/users/${userID}/notifications`,
    notificationObj,
    loginUserInfo.sendConfig
  );

  dispatch({ type: CHANGE_NON_READ_TO_READ, response });
};
