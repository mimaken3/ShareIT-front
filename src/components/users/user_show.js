import React, { Component } from "react";
import { connect } from "react-redux";
// 入力フォーム作成で使う
import { reduxForm } from "redux-form";
import { getUserDetail } from "../../actions/user";
import ToAllUsersButton from "../presentational/atoms/to_all_users_button";
import UserName from "../presentational/atoms/users/name";
import UserID from "../presentational/atoms/users/id";
import CreatedDate from "../presentational/atoms/created_date.js";
import Topic from "../presentational/atoms/topics/topic";
import Loading from "../presentational/atoms/loading";
import EditButton from "../presentational/atoms/edit_button";
import * as JWT from "jwt-decode";

class UserShow extends Component {
  componentDidMount() {
    // 複雑な処理はcomponentに書かずに外(action)に記述
    const { userId } = this.props.match.params;
    if (userId) this.props.getUserDetail(userId);
  }

  render() {
    if (this.props.user) {
      var AuthorizedEditButton;
      if (this.props.loginUserID === this.props.user.user_id) {
        AuthorizedEditButton = (
          <div>
            <EditButton path="users" id={this.props.user.user_id} />
          </div>
        );
      }
      return (
        <React.Fragment>
          <div>ユーザ詳細</div>

          <div>
            <UserID userID={this.props.user.user_id} />
          </div>

          <div>
            <UserName userName={this.props.user.user_name} />
          </div>

          <div>
            <Topic topic={this.props.user.interested_topics} />
          </div>

          <div>
            <CreatedDate createdDate={this.props.user.created_date} />
          </div>

          <div>{AuthorizedEditButton}</div>

          <div>
            <ToAllUsersButton />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div>
            <Loading />
          </div>
        </React.Fragment>
      );
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

  const token = localStorage.getItem("shareIT_token");
  const jwt = JWT(token);

  const loginUserID = jwt.uid;

  // 初期状態でどんな値を表示するかをinitialValuesで設定
  return { initialValues: user, user: user, loginUserID: loginUserID };
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
