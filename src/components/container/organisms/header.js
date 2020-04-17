import React from "react";
import * as JWT from "jwt-decode";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";

// ヘッダー
const Header = withRouter((props) => {
  const token = localStorage.getItem("shareIT_token");
  const jwt = JWT(token);
  const loginUserName = jwt.name;

  function toAllArticlesPage() {
    props.history.push("/api/articles");
  }

  function toLogOutage() {
    props.history.push("/api/logout");
  }

  return (
    <React.Fragment>
      <Button onClick={toAllArticlesPage}>ShareIT</Button>
      {loginUserName}さんようこそ
      <Button onClick={toLogOutage}>Logout</Button>
    </React.Fragment>
  );
});

export default Header;
