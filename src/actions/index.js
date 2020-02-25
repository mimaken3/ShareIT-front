import axios from "axios";

//reducerでもimortして使うので
export const SHOW_ALL_USERS = "SHOW_ALL_USERS";
export const SHOW_ALL_ARTICLES = "SHOW_ALL_ARTICLES";
export const SHOW_ARTICLE_DETAIL = "SHOW_ARTICLE_DETAIL";

// この下で非同期処理イベントを実行(リクエストを投げる)
// readEvents内で本来ならピュアなオブジェクトを返さないといけない
// redux-thunkを使えばそれが可能
const ROOT_URL = "https://shareit-part2-pro.appspot.com";

// ユーザ一覧
export const showAllUsers = () => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/users`);
  console.log(response);
  dispatch({ type: SHOW_ALL_USERS, response });
};

// 記事一覧
export const showAllArticles = () => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/articles`);
  console.log(response);
  dispatch({ type: SHOW_ALL_ARTICLES, response });
};

// 記事詳細
export const getArticleDetail = articleId => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/article/${articleId}`);
  console.log("response: " + response);
  dispatch({ type: SHOW_ARTICLE_DETAIL, response });
};
