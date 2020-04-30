import axios from "axios";
import getLoginUserInfo from "../modules/getLoginUserInfo";

//reducerでもimortして使うので
export const CREATE_COMMENT = "CREATE_COMMENT";
export const SHOW_ALL_COMMENTS = "SHOW_ALL_COMMENTS";

const ROOT_URL = process.env.REACT_APP_ROOT_URL;

// 記事のコメント一覧
export const getAllComments = (articleID) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();

  const response = await axios.get(
    `${ROOT_URL}/api/articles/${articleID}/comments`,
    loginUserInfo.sendConfig
  );
  dispatch({ type: SHOW_ALL_COMMENTS, response });
};

// 記事のコメント投稿
export const postComment = (comment) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const articleID = comment.articleID;

  const response = await axios.post(
    `${ROOT_URL}/api/articles/${articleID}/comments`,
    loginUserInfo.sendConfig
  );
  dispatch({ type: CREATE_COMMENT, response });
};

// 記事のコメント更新

// 記事のコメント削除
