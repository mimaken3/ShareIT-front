import React from "react";
import { Link } from "react-router-dom";
import * as JWT from "jwt-decode";

// 投稿ボタン
const CreateArticleButton = () => {
  const token = localStorage.getItem("shareIT_token");
  const jwt = JWT(token);

  const loginUserID = jwt.uid;
  return (
    <React.Fragment>
      <Link to={`/api/users/${loginUserID}/article`}>投稿</Link>
    </React.Fragment>
  );
};

export default CreateArticleButton;
