import React from "react";
import { Link } from "react-router-dom";

// 作成日
const ToAllArticlesButton = () => {
  return (
    <React.Fragment>
      <Link to={`/articles`}>記事一覧画面へ</Link>
    </React.Fragment>
  );
};

export default ToAllArticlesButton;
