import axios from "axios";

//reducerでもimortして使うので
export const SHOW_ALL_ARTICLES = "SHOW_ALL_ARTICLES";
export const SHOW_ARTICLE_DETAIL = "SHOW_ARTICLE_DETAIL";
export const UPDATE_ARTICLE = "UPDATE_ARTICLE";
export const UPDATE_ARTICLE_EVENT = "UPDATE_ARTICLE_EVENT";
export const DELETE_ARTICLE_EVENT = "DELETE_ARTICLE_EVENT";
export const CREATE_ARTICLE_EVENT = "CREATE_ARTICLE_EVENT";

// この下で非同期処理イベントを実行(リクエストを投げる)
// readEvents内で本来ならピュアなオブジェクトを返さないといけない
// redux-thunkを使えばそれが可能
const ROOT_URL = "https://shareit-part2-pro.appspot.com";

// 記事一覧
export const showAllArticles = () => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/articles`);
  dispatch({ type: SHOW_ALL_ARTICLES, response });
};

// 記事詳細
export const getArticleDetail = articleId => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/article/${articleId}`);
  dispatch({ type: SHOW_ARTICLE_DETAIL, response });
};

// 記事更新画面
export const updateArticle = articleId => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/article/${articleId}`);
  dispatch({ type: UPDATE_ARTICLE, response });
};

// 記事を投稿
export const postArticleEvent = values => async dispatch => {
  const userID = parseInt(values.created_user_id);

  const sendValues = {
    article_title: values.article_title,
    article_content: values.article_content,
    created_user_id: userID,
    article_topics: values.article_topics
  };

  await axios
    .post(`${ROOT_URL}/user/${userID}/createArticle`, sendValues)
    .then(response => {
      dispatch({ type: CREATE_ARTICLE_EVENT, response });
    })
    .catch(error => {
      console.log(error.response);
    });
};

// 記事を更新
export const putEvent = values => async dispatch => {
  console.log(values);
  const response = await axios.put(
    `${ROOT_URL}/article/${values.article_id}`,
    values
  );
  dispatch({ type: UPDATE_ARTICLE_EVENT, response });
};

// 記事を削除
export const deleteEvent = articleId => async dispatch => {
  await axios.delete(`${ROOT_URL}/article/${articleId}`);
  dispatch({ type: DELETE_ARTICLE_EVENT, articleId });
};
