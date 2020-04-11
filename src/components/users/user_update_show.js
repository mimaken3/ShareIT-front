import React, { Component } from "react";
import { connect } from "react-redux";
// 入力フォーム作成で使う
import { Field, reduxForm } from "redux-form";
// import { getArticleDetail, putEvent, deleteEvent } from "../../actions/article";
import { getAllTopics } from "../../actions/topic";
import { getUserDetail } from "../../actions/user";
import { Link } from "react-router-dom";
import Select from "react-select";
import ToAllUsersButton from "../presentational/atoms/to_all_users_button";

class UserUpdateShow extends Component {
  componentDidMount() {
    // 全トピックの取得
    this.props.getAllTopics();

    // ユーザ情報を取得
    const { userId } = this.props.match.params;
    if (userId) this.props.getUserDetail(userId);
  }

  render() {
    if (this.props.user && Object.values(this.props.allTopics).length !== 0) {
      return (
        <React.Fragment>
          ユーザ情報更新画面
          <div>ユーザID: {this.props.user.user_id}</div>
          <div>ユーザ名: {this.props.user.user_name}</div>
          <div>興味のあるトピック: {this.props.user.interested_topics}</div>
          <div>作成日: {this.props.user.created_date}</div>
          <div>
            <Link to={`/user/${this.props.user.user_id}`}>戻る</Link>
          </div>
          <div>
            <ToAllUsersButton />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div>Now loading</div>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  // 全トピック
  const allTopics = state.topics;

  // 更新するユーザ情報
  const user = state.users[ownProps.match.params.userId];

  // 初期状態でどんな値を表示するかをinitialValuesで設定
  return { initialValues: user, user: user, allTopics: allTopics };
};
const mapDispatchToProps = { getAllTopics, getUserDetail };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({ form: "userUpdateShowForm", enableReinitialize: true })(
    UserUpdateShow
  )
);
