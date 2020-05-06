import React from "react";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { LogoutUserEvent } from "Actions/user";
import UserIcon from "Atoms/user_icon";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import { getAllTopics } from "Actions/topic";
import { searchArticles } from "Actions/article";

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

        <Button onClick={toLogOutage}>Logout</Button>
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

  function toAllArticlesPage() {
    props.history.push("/api/articles");
  }

  function toLoginPage() {
    props.history.push("/login");
  }

  function toUserShowPage(loginUserID) {
    props.history.push("/api/users/" + loginUserID);
  }

  function toLogOutage() {
    props.LogoutUserEvent();
    props.history.push("/login");
  }

  return <React.Fragment>{Display}</React.Fragment>;
});

const mapDispatchToProps = {
  LogoutUserEvent,
  getAllTopics,
  searchArticles,
};

const mapStateToProps = (state) => {
  // 全トピック
  const allTopics = state.topics;

  return { allTopics: allTopics };
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
