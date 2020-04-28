import axios from "axios";
import deleteIcon from "../components/common/deleteIcon";
import uploadIcon from "../components/common/uploadIcon";

export const LOGIN_USER_EVENT = "LOGIN_USER_EVENT";
export const LOGOUT_USER_EVENT = "LOGOUT_USER_EVENT";
export const CREATE_USER_EVENT = "CREATE_USER_EVENT";
export const SHOW_ALL_USERS = "SHOW_ALL_USERS";
export const SHOW_USER_DETAIL = "SHOW_USER_DETAIL";
export const UPDATE_USER_EVENT = "UPDATE_USER_EVENT";

const ROOT_URL = process.env.REACT_APP_ROOT_URL;

let shareIT_token = localStorage.getItem("shareIT_token");
let config = {
  headers: { Authorization: "Bearer " + shareIT_token },
};

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
      console.log(error);
    });
};

// ログアウト
export const LogoutUserEvent = () => async (dispatch) => {
  dispatch({ type: LOGOUT_USER_EVENT });
};

// ユーザ一覧
export const showAllUsers = (pageNum) => async (dispatch) => {
  const response = await axios.get(
    `${ROOT_URL}/api/users?ref_pg=${pageNum}`,
    config
  );
  dispatch({ type: SHOW_ALL_USERS, response });
};

// ユーザ詳細画面
export const getUserDetail = (userId) => async (dispatch) => {
  const response = await axios.get(`${ROOT_URL}/api/users/${userId}`, config);
  dispatch({ type: SHOW_USER_DETAIL, response });
};

// ユーザ情報を更新
export const putUserEvent = (user, iconImage) => async (dispatch) => {
  if (iconImage) {
    let preSignedURL = user.icon_name.split("/")[4];
    const deleteFileName = preSignedURL.split("?")[0];

    if (deleteFileName !== "default.png") {
      deleteIcon(deleteFileName).then(() => {
        uploadIcon(iconImage, user.user_id);
      });
    }
  }
  const response = await axios.put(
    `${ROOT_URL}/api/users/${user.user_id}`,
    user,
    config
  );
  dispatch({ type: UPDATE_USER_EVENT, response });
};
