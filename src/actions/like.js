import axios from "axios";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import env from "env";

// reducerでもimortして使うので
export const TOGGLE_LIKE = "TOGGLE_LIKE";

const ROOT_URL = env.ROOT_URL;

// いいねを切り替え
export const toggleLike = (likeArticle) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const articleID = likeArticle.articleID;
  const loginUserID = likeArticle.userID;
  const isLiked = likeArticle.isLiked;

  const values = { user_id: loginUserID, article_id: articleID };

  const response = await axios.put(
    `${ROOT_URL}/api/articles/${articleID}/like?is_liked=${isLiked}`,
    values,
    loginUserInfo.sendConfig
  );

  dispatch({ type: TOGGLE_LIKE, response });
};
