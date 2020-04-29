import axios from "axios";
import getLoginUserInfo from "../modules/getLoginUserInfo";

//reducerでもimortして使うので
export const SHOW_ALL_ARTICLES = "SHOW_ALL_ARTICLES";
export const SHOW_ALL_ARTICLES_BY_USER_ID = "SHOW_ALL_ARTICLES_BY_USER_ID";
export const SHOW_ARTICLE_DETAIL = "SHOW_ARTICLE_DETAIL";
export const UPDATE_ARTICLE_EVENT = "UPDATE_ARTICLE_EVENT";
export const DELETE_ARTICLE_EVENT = "DELETE_ARTICLE_EVENT";
export const CREATE_ARTICLE_EVENT = "CREATE_ARTICLE_EVENT";

const ROOT_URL = process.env.REACT_APP_ROOT_URL;
let shareIT_token = localStorage.getItem("shareIT_token");
let config = {
  headers: { Authorization: "Bearer " + shareIT_token },
};

// 記事一覧
export const showAllArticles = (pageNum) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const shareIT_token = loginUserInfo.shareITToken;
  const loginUserID = loginUserInfo.userID;

  let config = {
    headers: { Authorization: "Bearer " + shareIT_token },
  };

  const response = await axios.get(
    `${ROOT_URL}/api/articles?ref_pg=${pageNum}&user_id=${loginUserID}`,
    config
  );
  dispatch({ type: SHOW_ALL_ARTICLES, response });
};

// ユーザIDの全記事を取得
export const getAllArticlesByUserID = (userID, pageNum) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const loginUserID = loginUserInfo.userID;

  const response = await axios.get(
    `${ROOT_URL}/api/users/${userID}/articles?ref_pg=${pageNum}&user_id=${loginUserID}`,
    config
  );
  dispatch({ type: SHOW_ALL_ARTICLES_BY_USER_ID, response });
};

// 記事詳細
export const getArticleDetail = (articleId) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const loginUserID = loginUserInfo.userID;

  const response = await axios.get(
    `${ROOT_URL}/api/articles/${articleId}?user_id=${loginUserID}`,
    config
  );
  dispatch({ type: SHOW_ARTICLE_DETAIL, response });
};

// 記事を投稿
export const postArticleEvent = (values) => async (dispatch) => {
  const userID = parseInt(values.created_user_id);

  const sendValues = {
    article_title: values.article_title,
    article_content: values.article_content,
    created_user_id: userID,
    article_topics: values.article_topics,
  };

  await axios
    .post(
      `${ROOT_URL}/api/users/${userID}/createArticle?user_id=${userID}`,
      sendValues,
      config
    )
    .then((response) => {
      dispatch({ type: CREATE_ARTICLE_EVENT, response });
    })
    .catch((error) => {
      console.log(error.response);
    });
};

// 記事を更新
export const putEvent = (values) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const loginUserID = loginUserInfo.userID;

  const response = await axios.put(
    `${ROOT_URL}/api/articles/${values.article_id}?user_id=${loginUserID}`,
    values,
    config
  );
  dispatch({ type: UPDATE_ARTICLE_EVENT, response });
};

// 記事を削除
export const deleteEvent = (articleId) => async (dispatch) => {
  await axios.delete(`${ROOT_URL}/api/articles/${articleId}`, config);
  dispatch({ type: DELETE_ARTICLE_EVENT, articleId });
};
