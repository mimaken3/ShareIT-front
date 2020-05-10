import React from "react";
import { Link } from "react-router-dom";
import getLoginUserInfo from "Modules/getLoginUserInfo";

// 投稿ボタン
const CreateArticleButton = () => {
  const loginUserInfo = getLoginUserInfo();
  const loginUserID = loginUserInfo.userID;
  return (
    <React.Fragment>
      <Link to={`/api/users/${loginUserID}/article`}>投稿</Link>
    </React.Fragment>
  );
};

export default CreateArticleButton;
