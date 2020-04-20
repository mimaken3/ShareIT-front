import React, { Component } from "react";
import { connect } from "react-redux";
// 入力フォーム作成で使う
import { reduxForm } from "redux-form";
import { getAllTopics } from "../../actions/topic";
import { getUserDetail, putUserEvent } from "../../actions/user";
import { Link } from "react-router-dom";
import ToAllUsersButton from "../presentational/atoms/to_all_users_button";
import UserID from "../presentational/atoms/users/id";
import Loading from "../container/templates/loading";
import TopicSelectBox from "../presentational/atoms/topic_select_box";
import * as JWT from "jwt-decode";
import UnauthorizedPage from "../presentational/atoms/unauthorized_page";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

class UserUpdateShow extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      textbox: "",
      textBoxFlag: false,
      isTouch: false,
    };
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

    if (this.state.isTouch) {
      values.profile = this.state.textbox;
    } else {
      values.profile = this.props.user.profile;
    }

    // 更新
    await this.props.putUserEvent(values);

    // 更新ボタンを押した後に遷移するURL
    this.props.history.push("/api/users/" + values.user_id);
  }

  // プロフィール
  handleChange(e) {
    this.setState({ isTouch: true });
    if (e.target.value.length > 1000) {
      this.setState({ textBoxFlag: true });
    } else {
      this.setState({ textbox: e.target.value, textBoxFlag: false });
    }
  }

  render() {
    const { handleSubmit, submitting, invalid } = this.props;
    const token = localStorage.getItem("shareIT_token");
    const jwt = JWT(token);
    const loginUserID = jwt.uid;
    if (this.props.user && Object.values(this.props.allTopics).length !== 0) {
      if (loginUserID !== this.props.user.user_id) {
        // 別ユーザがアクセスしようとした場合
        return (
          <React.Fragment>
            <UnauthorizedPage page="users" />
          </React.Fragment>
        );
      } else {
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
              <div>
                プロフィール
                <div>
                  <TextareaAutosize
                    aria-label="profile"
                    rowsMin={3}
                    rowsMax={20}
                    placeholder="1000文字以内"
                    defaultValue={this.props.user.profile}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div>作成日: {this.props.user.created_date}</div>
              <div>
                <input
                  type="submit"
                  value="Submit"
                  disabled={submitting || invalid || this.state.textBoxFlag}
                />
              </div>
            </form>
            <div>
              <Link to={`/api/users/${this.props.user.user_id}`}>戻る</Link>
            </div>
            <div>
              <ToAllUsersButton />
            </div>
          </React.Fragment>
        );
      }
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
  return {
    initialValues: user,
    user: user,
    allTopics: allTopics,
  };
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
