import axios from "axios";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import env from "env";

//reducerでもimortして使うので
export const CREATE_COMMENT = "CREATE_COMMENT";
export const SHOW_ALL_COMMENTS = "SHOW_ALL_COMMENTS";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";

const ROOT_URL = env.ROOT_URL;

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
export const postComment = (commentObj) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const articleID = commentObj.articleID;
  const loginUserID = loginUserInfo.userID;

  const obj = {
    article_id: articleID,
    user_Id: loginUserID,
    content: commentObj.comment,
  };

  const response = await axios.post(
    `${ROOT_URL}/api/articles/${articleID}/comments`,
    obj,
    loginUserInfo.sendConfig
  );

  dispatch({ type: CREATE_COMMENT, response });
};

// 記事のコメント更新
export const updateComment = (commentObj, index) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const articleID = commentObj.article_id;

  const response = await axios.put(
    `${ROOT_URL}/api/articles/${articleID}/comments`,
    commentObj,
    loginUserInfo.sendConfig
  );

  dispatch({ type: UPDATE_COMMENT, response, index });
};

// 記事のコメント削除
export const deleteComment = (articleID, commentID, index) => async (
  dispatch
) => {
  const loginUserInfo = getLoginUserInfo();

  await axios.delete(
    `${ROOT_URL}/api/articles/${articleID}/comments/${commentID}`,
    loginUserInfo.sendConfig
  );
  dispatch({ type: DELETE_COMMENT, commentID, index });
};
