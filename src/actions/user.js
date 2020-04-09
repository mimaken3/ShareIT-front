import axios from "axios";

//reducerでもimortして使うので
export const SHOW_ALL_USERS = "SHOW_ALL_USERS";

// この下で非同期処理イベントを実行(リクエストを投げる)
// readEvents内で本来ならピュアなオブジェクトを返さないといけない
// redux-thunkを使えばそれが可能
const ROOT_URL = "https://shareit-part2-pro.appspot.com";

// ユーザ一覧
export const showAllUsers = () => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/users`);
  dispatch({ type: SHOW_ALL_USERS, response });
};
