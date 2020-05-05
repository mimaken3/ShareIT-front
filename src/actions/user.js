import axios from "axios";
import deleteIcon from "Modules/deleteIcon";
import uploadIcon from "Modules/uploadIcon";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import env from "env";

export const LOGIN_USER_EVENT = "LOGIN_USER_EVENT";
export const LOGOUT_USER_EVENT = "LOGOUT_USER_EVENT";
export const CREATE_USER_EVENT = "CREATE_USER_EVENT";
export const SHOW_ALL_USERS = "SHOW_ALL_USERS";
export const SHOW_USER_DETAIL = "SHOW_USER_DETAIL";
export const UPDATE_USER_EVENT = "UPDATE_USER_EVENT";
export const DELETE_USER_EVENT = "DELETE_USER_EVENT";
export const USER_NOT_EXIST = "USER_NOT_EXIST";
export const LOGIN_FAILED = "LOGIN_FAILED";

const ROOT_URL = env.ROOT_URL;

// ユーザ作成
export const postUserEvent = (user, iconImage) => async (dispatch) => {
  if (iconImage) {
    // 画像の形式をセット
    user.icon_name = iconImage.type.split("/")[1];
  } else {
    // デフォルト画像をセット
    user.icon_name = "default.png";
  }
  const response = await axios.post(`${ROOT_URL}/signUp`, user);

  // ユーザのアイコンをアップロード
  if (iconImage) {
    const newFileName = response.data.user_id;
    uploadIcon(iconImage, newFileName);
  }

  dispatch({ type: CREATE_USER_EVENT, response });
};

// ログイン
export const loginUserEvent = (user) => async (dispatch) => {
  await axios
    .post(`${ROOT_URL}/login`, user)
    .then((response) => {
      if (response.status === 200) {
        dispatch({ type: LOGIN_USER_EVENT, response });
      }
    })
    .catch((error) => {
      // ログイン失敗時
      // TODO:
      const errResponse = Object.assign({}, error);
      const failedUserInfo = errResponse.response.data.user;

      dispatch({ type: LOGIN_FAILED, failedUserInfo });
    });
};

// ログアウト
export const LogoutUserEvent = () => async (dispatch) => {
  dispatch({ type: LOGOUT_USER_EVENT });
};

// ユーザ一覧
export const showAllUsers = (pageNum) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const response = await axios.get(
    `${ROOT_URL}/api/users?ref_pg=${pageNum}`,
    loginUserInfo.sendConfig
  );
  dispatch({ type: SHOW_ALL_USERS, response });
};

// ユーザ詳細画面
export const getUserDetail = (userId) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  await axios
    .get(`${ROOT_URL}/api/users/${userId}`, loginUserInfo.sendConfig)
    .then((response) => {
      dispatch({ type: SHOW_USER_DETAIL, response });
    })
    .catch((e) => {
      dispatch({ type: USER_NOT_EXIST });
    });
};

// ユーザ情報を更新
export const putUserEvent = (user, iconImage) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  if (iconImage) {
    let preSignedURL = user.icon_name.split("/")[4];
    const deleteFileName = preSignedURL.split("?")[0];

    if (deleteFileName !== "default.png") {
      // デフォ画像でないなら削除
      deleteIcon(deleteFileName).then(() => {
        // 新しいアイコンをアップロード
        uploadIcon(iconImage, user.user_id);
      });
    }
  }
  const response = await axios.put(
    `${ROOT_URL}/api/users/${user.user_id}`,
    user,
    loginUserInfo.sendConfig
  );
  dispatch({ type: UPDATE_USER_EVENT, response });
};

// ユーザを削除
export const deleteUserEvent = (user) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();

  const response = await axios.delete(
    `${ROOT_URL}/api/users/${user.user_id}`,
    loginUserInfo.sendConfig
  );

  dispatch({ type: DELETE_USER_EVENT, response });
};
