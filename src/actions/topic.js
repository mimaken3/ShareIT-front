import axios from "axios";
import env from "env";
import getLoginUserInfo from "Modules/getLoginUserInfo";
export const GET_ALL_TOPICS = "GET_ALL_TOPICS_EVENT";
export const GET_TOPICS_BY_USER_ID = "GET_TOPICS_BY_USER_ID";
export const CREATE_TOPIC_EVENT = "CREATE_TOPIC_EVENT";
export const UPDATE_TOPIC_NAME = "UPDATE_TOPIC_NAME";
export const DELETE_TOPIC_EVENT = "DELETE_TOPIC_EVENT";
const ROOT_URL = env.ROOT_URL;

// 全トピックを取得
export const getAllTopics = () => async (dispatch) => {
  const response = await axios.get(`${ROOT_URL}/topics`);
  dispatch({ type: GET_ALL_TOPICS, response });
};

// トピックを作成
export const postTopic = (topicObj) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const response = await axios.post(
    `${ROOT_URL}/api/topics/create`,
    topicObj,
    loginUserInfo.sendConfig
  );

  dispatch({ type: CREATE_TOPIC_EVENT, response });
};

// ユーザが作成したトピックを取得
export const getTopicsByUserID = (userID) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const response = await axios.get(
    `${ROOT_URL}/api/users/${userID}/topics`,
    loginUserInfo.sendConfig
  );
  dispatch({ type: GET_TOPICS_BY_USER_ID, response });
};

// トピック名を更新
export const updateTopicName = (topicObj) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();

  const response = await axios.put(
    `${ROOT_URL}/api/topics/${topicObj.topic_id}`,
    topicObj,
    loginUserInfo.sendConfig
  );

  dispatch({ type: UPDATE_TOPIC_NAME, response });
};

// トピックを削除
export const deleteTopic = (topicID) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const response = await axios.delete(
    `${ROOT_URL}/api/topics/${topicID}`,
    loginUserInfo.sendConfig
  );

  dispatch({ type: DELETE_TOPIC_EVENT, response, topicID });
};
