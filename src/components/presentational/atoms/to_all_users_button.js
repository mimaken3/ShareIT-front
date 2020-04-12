import React from "react";
import { Link } from "react-router-dom";

// ユーザ一覧へのボタン
const ToAllUsersButton = () => {
  return (
    <React.Fragment>
      <Link to={`/users`}>ユーザ一覧</Link>
    </React.Fragment>
  );
};

export default ToAllUsersButton;
