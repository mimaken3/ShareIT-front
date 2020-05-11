import React from "react";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import UserIcon from "Atoms/user_icon";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import { emptyArticles } from "Actions/article";
import { emptyUsers, getUserDetail } from "Actions/user";
import Logout from "Atoms/buttons/logout";

// ヘッダー
const Header = withRouter((props) => {
  const loginUser = getLoginUserInfo();
  var Display;
  if (loginUser !== null) {
    // ログイン状態
    const loginUserIconURL = localStorage.getItem("login_user_icon_URL");

    Display = (
      <div>
        <Button onClick={toAllArticlesPage}>ShareIT</Button>
        <Button onClick={() => toUserShowPage(loginUser.userID)}>
          <UserIcon iconData={loginUserIconURL} />
          {loginUser.userName}
        </Button>
        <div>
          <Logout />
        </div>
      </div>
    );
  } else {
    // 未ログイン状態
    Display = (
      <div>
        SHAREIT ゲストさんようこそ
        <Button onClick={toLoginPage}>Login</Button>
      </div>
    );
  }

  // 記事一覧画面へ
  function toAllArticlesPage() {
    if (props.history.location.pathname === "/api/articles") {
      window.location.reload(false);
    } else {
      props.emptyArticles();
      props.history.push("/api/articles");
    }
  }

  // ログインページへ
  function toLoginPage() {
    props.history.push("/login");
  }

  // ユーザ詳細画面へ
  function toUserShowPage(loginUserID) {
    props.emptyArticles();
    props.emptyUsers();
    props.getUserDetail(loginUserID);

    props.history.push("/api/users/" + loginUserID);
  }

  return <React.Fragment>{Display}</React.Fragment>;
});

const mapDispatchToProps = {
  emptyArticles,
  emptyUsers,
  getUserDetail,
};

const mapStateToProps = "";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "HeaderForm" })(Header));
