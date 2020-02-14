import axios from "axios";

//reducerでもimortして使うので
export const SHOW_ALL_USERS = "SHOW_ALL_USERS";

// actionを返す関数(actionクリエイター)
// => viewを担当するcomponentで使う(exportする)
// export const showAllUsers = () => {
//   return {
//     type: "SHOW_ALL_USERS"
//   };
// };

// この下で非同期処理イベントを実行(リクエストを投げる)
// readEvents内で本来ならピュアなオブジェクトを返さないといけない
// redux-thunkを使えばそれが可能
const ROOT_URL = "https://shareit-part2-pro.appspot.com";

export const showAllUsers = () => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/users`);
  console.log(response);
  dispatch({ type: SHOW_ALL_USERS, response });
};
