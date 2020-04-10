import React, { Component } from "react";
import { connect } from "react-redux";
// 入力フォーム作成で使う
import { reduxForm } from "redux-form";
import { getUserDetail } from "../../actions/user";
import { Link } from "react-router-dom";

class UserShow extends Component {
  componentDidMount() {
    // 複雑な処理はcomponentに書かずに外(action)に記述
    const { userId } = this.props.match.params;
    if (userId) this.props.getUserDetail(userId);
  }

  render() {
    if (this.props.user) {
      return (
        <React.Fragment>
          <div>ユーザ詳細</div>
          <div>ユーザID: {this.props.user.user_id}</div>
          <div>ユーザ名: {this.props.user.user_name}</div>
          <div>興味のあるトピック: {this.props.user.interested_topics}</div>
          <div>作成日: {this.props.user.created_date}</div>
          <div>
            <Link to={`/users`}>ユーザ一覧画面へ</Link>
          </div>
        </React.Fragment>
      );
    } else {
      return <React.Fragment>Now loading</React.Fragment>;
    }
  }
}

const mapDispatchToProps = { getUserDetail };

// stateとactionをcomponentに関連付ける実装
// このstatusは状態のトップレベルを表す
// ReduxのStoreを第一引数にとる関数で、Componentにpropsとして渡すものをフィルタリングするときに使う。
const mapStateToProps = (state, ownProps) => {
  // 詳細画面で必要な各種情報を取得
  const user = state.users[ownProps.match.params.userId];

  // 初期状態でどんな値を表示するかをinitialValuesで設定
  return { initialValues: user, user: user };
};

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
  reduxForm({ form: "userShowForm", enableReinitialize: true })(UserShow)
);
