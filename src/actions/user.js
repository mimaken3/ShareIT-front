import axios from "axios";

//reducerでもimortして使うので
export const CREATE_USER_EVENT = "CREATE_USER_EVENT";
export const SHOW_ALL_USERS = "SHOW_ALL_USERS";
export const SHOW_USER_DETAIL = "SHOW_USER_DETAIL";
export const UPDATE_USER_EVENT = "UPDATE_USER_EVENT";

// この下で非同期処理イベントを実行(リクエストを投げる)
// readEvents内で本来ならピュアなオブジェクトを返さないといけない
// redux-thunkを使えばそれが可能
const ROOT_URL = "https://shareit-part2-pro.appspot.com";

// ユーザ登録
export const postUserEvent = user => async dispatch => {
  const response = await axios.post(`${ROOT_URL}/user/signUp`, user);
  dispatch({ type: CREATE_USER_EVENT, response });
};

// ユーザ一覧
export const showAllUsers = () => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/users`);
  dispatch({ type: SHOW_ALL_USERS, response });
};

// ユーザ詳細画面
export const getUserDetail = userId => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/user/${userId}`);
  dispatch({ type: SHOW_USER_DETAIL, response });
};

// ユーザ情報を更新
export const putUserEvent = values => async dispatch => {
  const response = await axios.put(
    `${ROOT_URL}/user/${values.user_id}`,
    values
  );
  dispatch({ type: UPDATE_USER_EVENT, response });
};
