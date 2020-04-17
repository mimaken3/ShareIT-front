import React from "react";
import * as JWT from "jwt-decode";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { LogoutUserEvent } from "/Users/mimaken/react/share-it-front/src/actions/user.js";

// ヘッダー
const Header = withRouter((props) => {
  const token = localStorage.getItem("shareIT_token");
  const jwt = JWT(token);
  const loginUserName = jwt.name;

  function toAllArticlesPage() {
    props.history.push("/api/articles");
  }

  function toLogOutage() {
    props.LogoutUserEvent();
    props.history.push("/login");
  }

  return (
    <React.Fragment>
      <Button onClick={toAllArticlesPage}>ShareIT</Button>
      {loginUserName}さんようこそ
      <Button onClick={toLogOutage}>Logout</Button>
    </React.Fragment>
  );
});

const mapDispatchToProps = { LogoutUserEvent };

const mapStateToProps = "";

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
