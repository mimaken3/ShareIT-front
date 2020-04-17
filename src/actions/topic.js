import axios from "axios";

export const GET_ALL_TOPICS = "GET_ALL_TOPICS_EVENT";

// この下で非同期処理イベントを実行(リクエストを投げる)
// readEvents内で本来ならピュアなオブジェクトを返さないといけない
// redux-thunkを使えばそれが可能
const ROOT_URL = "https://shareit-part2-pro.appspot.com";

// const shareIT_token = localStorage.getItem("shareIT_token");

// 全トピックを取得
export const getAllTopics = () => async (dispatch) => {
  const response = await axios.get(`${ROOT_URL}/topics`);
  dispatch({ type: GET_ALL_TOPICS, response });
};
