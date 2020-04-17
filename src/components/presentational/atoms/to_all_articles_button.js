import React from "react";
import { Link } from "react-router-dom";

// 記事一覧へのボタン
const ToAllArticlesButton = () => {
  return (
    <React.Fragment>
      <Link to={`/api/articles`}>記事一覧</Link>
    </React.Fragment>
  );
};

export default ToAllArticlesButton;
