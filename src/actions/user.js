import axios from "axios";
import S3 from "react-aws-s3";

export const LOGIN_USER_EVENT = "LOGIN_USER_EVENT";
export const LOGOUT_USER_EVENT = "LOGOUT_USER_EVENT";
export const CREATE_USER_EVENT = "CREATE_USER_EVENT";
export const SHOW_ALL_USERS = "SHOW_ALL_USERS";
export const SHOW_USER_DETAIL = "SHOW_USER_DETAIL";
export const UPDATE_USER_EVENT = "UPDATE_USER_EVENT";

const ROOT_URL = process.env.REACT_APP_ROOT_URL;

const iconImageConfig = {
  bucketName: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
  dirName: "user-icons",
  region: "ap-northeast-1",
  accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY,
};

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
    const ReactS3Client = new S3(iconImageConfig);

    const newFileName = response.data.user_id;

    ReactS3Client.uploadFile(iconImage, newFileName)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
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
export const putUserEvent = (values) => async (dispatch) => {
  const response = await axios.put(
    `${ROOT_URL}/api/users/${values.user_id}`,
    values,
    config
  );
  dispatch({ type: UPDATE_USER_EVENT, response });
};
