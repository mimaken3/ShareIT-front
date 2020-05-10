import React, { useEffect } from "react";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { LogoutUserEvent } from "Actions/user";
import UserIcon from "Atoms/user_icon";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import { getAllUsersForSelectBox } from "Actions/user";
import { getAllTopics } from "Actions/topic";
import { searchArticles, emptyArticles } from "Actions/article";
import SearchArticles from "Molecules/articles/search";
import Logout from "Atoms/buttons/logout";

// ヘッダー
const Header = withRouter((props) => {
  useEffect(() => {
    const loginUser = getLoginUserInfo();
    if (loginUser !== null) {
      // 全トピックの取得
      props.getAllTopics().then(() => {
        // セレクトボックス用の全ユーザを取得
        props.getAllUsersForSelectBox(loginUser.userID);
      });
    }
  });

  const loginUser = getLoginUserInfo();
  var Display;
  if (loginUser !== null) {
    // ログイン状態
    const loginUserIconURL = localStorage.getItem("login_user_icon_URL");

    if (Object.values(props.allUsers).length > 1) {
      // セレクトボックスの中身が読み込まれたら表示
      Display = (
        <div>
          <Button onClick={toAllArticlesPage}>ShareIT</Button>
          <Button onClick={() => toUserShowPage(loginUser.userID)}>
            <UserIcon iconData={loginUserIconURL} />
            {loginUser.userName}
          </Button>
          <div>
            <SearchArticles />
          </div>
          <div>
            <Logout />
          </div>
        </div>
      );
    } else {
      // セレクトボックスの中身が読み込まれるまで表示
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
    }
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
    props.history.push("/api/users/" + loginUserID);
  }

  return <React.Fragment>{Display}</React.Fragment>;
});

const mapDispatchToProps = {
  LogoutUserEvent,
  getAllTopics,
  searchArticles,
  getAllUsersForSelectBox,
  emptyArticles,
};

const mapStateToProps = (state) => {
  // 全ユーザ
  const allUsers = state.selectUser.users;

  return { allUsers: allUsers };
};

// stateとactionをcomponentに関連付ける実装
// このstatusは状態のトップレベルを表す
// ReduxのStoreを第一引数にとる関数で、Componentにpropsとして渡すものをフィルタリングするときに使う。
// const mapStateToProps = "";

// connect 第一引数はcomponentに渡すpropsを制御する
// 第二引数はreducerを呼び出して、reduxで管理しているstateを更新する
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  // enableReinitialize: When set to true, the form will reinitialize
  // every time the initialValues prop change. Defaults to false.
  // titleとbody属性を表示するときに使う
  // 直接詳細画面へアクセスしたとき(本来なら最初に記事一覧を取得して、それらの情報がブラウザのメモリに残った状態で、
  // 詳細へ行くとメモリから詳細を取得する)適宜、該当のイベントをAPIサーバから取得する
  // formにはユニークな名前を渡す
  reduxForm({ form: "looutForm" })(Header)
);
