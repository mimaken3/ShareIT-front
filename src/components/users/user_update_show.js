import React, { Component } from "react";
import { connect } from "react-redux";
// 入力フォーム作成で使う
import { reduxForm } from "redux-form";
import { getAllTopics } from "../../actions/topic";
import { getUserDetail, putUserEvent } from "../../actions/user";
import { Link } from "react-router-dom";
import ToAllUsersButton from "../presentational/atoms/to_all_users_button";
import UserID from "../presentational/atoms/users/id";
import Loading from "../presentational/atoms/loading";
import TopicSelectBox from "../presentational/atoms/topic_select_box";

class UserUpdateShow extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // 全トピックの取得
    this.props.getAllTopics();

    // ユーザ情報を取得
    const { userId } = this.props.match.params;
    if (userId) this.props.getUserDetail(userId);
  }

  // ユーザ情報を更新して送信
  async onSubmit(values) {
    // 送信するトピックをセット
    values.interested_topics = this.refs.TopicSelectBox.getSendTopics(
      values.interested_topics
    );

    // 更新
    await this.props.putUserEvent(values);

    // 更新ボタンを押した後に遷移するURL
    this.props.history.push("/user/" + values.user_id);
  }

  render() {
    const { handleSubmit } = this.props;

    if (this.props.user && Object.values(this.props.allTopics).length !== 0) {
      // 全トピック
      const allTopics = this.props.allTopics;

      // 初期表示トピック
      const initTopics = this.props.user.interested_topics;
      return (
        <React.Fragment>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            ユーザ情報更新画面
            <div>
              <UserID userID={this.props.user.user_id} />
            </div>
            <div>ユーザ名: {this.props.user.user_name}</div>
            <div>
              興味のあるトピック
              <TopicSelectBox
                allTopics={allTopics}
                initTopics={initTopics}
                ref="TopicSelectBox"
              />
            </div>
            <div>作成日: {this.props.user.created_date}</div>
            <div>
              <input type="submit" value="Submit" />
            </div>
          </form>
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
          <div>
            <Loading />
          </div>
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
const mapDispatchToProps = { getAllTopics, getUserDetail, putUserEvent };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({ form: "userUpdateShowForm", enableReinitialize: true })(
    UserUpdateShow
  )
);
