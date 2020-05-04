import axios from "axios";
import env from "env";
export const GET_ALL_TOPICS = "GET_ALL_TOPICS_EVENT";

const ROOT_URL = env.ROOT_URL;

// 全トピックを取得
export const getAllTopics = () => async (dispatch) => {
  const response = await axios.get(`${ROOT_URL}/topics`);
  dispatch({ type: GET_ALL_TOPICS, response });
};
