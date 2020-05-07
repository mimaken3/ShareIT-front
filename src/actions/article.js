import axios from "axios";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import env from "env";

//reducerでもimortして使うので
export const SHOW_ALL_ARTICLES = "SHOW_ALL_ARTICLES";
export const SHOW_SEARCHING_FOR_ALL_ARTICLES =
  "SHOW_SEARCHING_FOR_ALL_ARTICLES";
export const SHOW_ALL_ARTICLES_BY_USER_ID = "SHOW_ALL_ARTICLES_BY_USER_ID";
export const SHOW_ARTICLE_DETAIL = "SHOW_ARTICLE_DETAIL";
export const UPDATE_ARTICLE_EVENT = "UPDATE_ARTICLE_EVENT";
export const DELETE_ARTICLE_EVENT = "DELETE_ARTICLE_EVENT";
export const CREATE_ARTICLE_EVENT = "CREATE_ARTICLE_EVENT";
export const ARTICLE_NOT_EXIST = "ARTICLE_NOT_EXIST";
export const EMPTY_ARTICELS = "EMPTY_ARTICELS";

const ROOT_URL = env.ROOT_URL;

// 記事一覧
export const showAllArticles = (pageNum) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const loginUserID = loginUserInfo.userID;

  const response = await axios.get(
    `${ROOT_URL}/api/articles?ref_pg=${pageNum}&user_id=${loginUserID}`,
    loginUserInfo.sendConfig
  );
  dispatch({ type: SHOW_ALL_ARTICLES, response });
};

// 記事検索
export const searchArticles = (values, param) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const loginUserID = loginUserInfo.userID;
  const refPg = values.refPg;
  const userID = values.user ? values.user["value"] : 0;
  const topics = values.topics;

  let topics_query = "";

  if (param === "paging") {
    // ページングからのアクセス
    topics_query = topics_query + topics;
  } else {
    // セレクトボックスからのアクセス
    if (topics) {
      if (topics.length) {
        for (let i = 0; i < topics.length; i++) {
          topics_query = topics_query + topics[i]["value"].toString() + "+";
        }
        topics_query = topics_query.slice(0, -1);
      } else {
        topics_query = topics_query + topics["value"].toString();
      }
    } else {
      topics_query = "0";
    }
  }

  const response = await axios.get(
    `${ROOT_URL}/api/articles/search?ref_pg=${refPg}&login_user_id=${loginUserID}&user_id=${userID}&topic_id=${topics_query}`,
    loginUserInfo.sendConfig
  );

  dispatch({ type: SHOW_SEARCHING_FOR_ALL_ARTICLES, response });
};

// ユーザIDの全記事を取得
export const getAllArticlesByUserID = (userID, pageNum) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const loginUserID = loginUserInfo.userID;

  const response = await axios.get(
    `${ROOT_URL}/api/users/${userID}/articles?ref_pg=${pageNum}&user_id=${loginUserID}`,
    loginUserInfo.sendConfig
  );
  dispatch({ type: SHOW_ALL_ARTICLES_BY_USER_ID, response });
};

// 記事詳細
export const getArticleDetail = (articleId) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const loginUserID = loginUserInfo.userID;

  await axios
    .get(
      `${ROOT_URL}/api/articles/${articleId}?user_id=${loginUserID}`,
      loginUserInfo.sendConfig
    )
    .then((response) => {
      dispatch({ type: SHOW_ARTICLE_DETAIL, response });
    })
    .catch((e) => {
      dispatch({ type: ARTICLE_NOT_EXIST });
    });
};

// 記事を投稿
export const postArticleEvent = (values) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const userID = parseInt(values.created_user_id);

  const sendValues = {
    article_title: values.article_title,
    article_content: values.article_content,
    created_user_id: userID,
    article_topics: values.article_topics,
    is_private: values.is_private,
  };

  await axios
    .post(
      `${ROOT_URL}/api/users/${userID}/createArticle?user_id=${userID}`,
      sendValues,
      loginUserInfo.sendConfig
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
    loginUserInfo.sendConfig
  );
  dispatch({ type: UPDATE_ARTICLE_EVENT, response });
};

// 記事を削除
export const deleteEvent = (articleId) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  await axios.delete(
    `${ROOT_URL}/api/articles/${articleId}`,
    loginUserInfo.sendConfig
  );
  dispatch({ type: DELETE_ARTICLE_EVENT, articleId });
};

// storeのarticlesを空に
export const emptyArticles = () => (dispatch) => {
  dispatch({ type: EMPTY_ARTICELS });
};
