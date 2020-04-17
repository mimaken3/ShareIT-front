import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Loading from "../presentational/atoms/loading";
import { getAllTopics } from "../../actions/topic";
import { postArticleEvent } from "../../actions/article";
import TopicSelectBox from "../presentational/atoms/topic_select_box";
import * as JWT from "jwt-decode";
import { Redirect } from "react-router";

class articleNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // 全トピックの取得
    this.props.getAllTopics();
  }

  // タイトルと内容の入力ボックス
  renderField(field) {
    const {
      input,
      label,
      type,
      // mata: { visited, error }
      meta: { error },
    } = field;

    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {error && <span>{error}</span>}
        {/* {visited && error && <span>{error}</span>} */}
      </div>
    );
  }

  // 記事を送信
  async onSubmit(values) {
    // 投稿するユーザのIDをセット
    values.created_user_id = this.props.userID;

    // 送信するトピックをセット
    values.article_topics = this.refs.TopicSelectBox.getSendTopics("その他");

    // 作成
    await this.props.postArticleEvent(values);

    // ボタンを押した後に遷移するURL
    this.props.history.push("/api/articles");
  }

  render() {
    const { handleSubmit } = this.props;
    if (Object.values(this.props.allTopics).length !== 0) {
      // 全トピック
      const allTopics = this.props.allTopics;

      // 初期表示トピック
      const initTopics = "";

      return (
        <React.Fragment>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div>記事更新画面</div>
            <div>
              タイトル:
              <Field
                label="article_title"
                name="article_title"
                type="text"
                component={this.renderField}
              />
            </div>
            <div>
              内容:
              <Field
                label="article_content"
                name="article_content"
                type="text"
                component={this.renderField}
              />
            </div>

            <div>
              興味のあるトピック
              <TopicSelectBox
                allTopics={allTopics}
                initTopics={initTopics}
                ref="TopicSelectBox"
              />
            </div>

            <div>
              <input type="submit" value="Submit" />
            </div>
          </form>
        </React.Fragment>
      );
    } else if (this.props.loginUserID !== this.props.userID) {
      return (
        <React.Fragment>
          <Redirect to={"/api/users/" + this.props.loginUserID + "/article"} />
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

  // 投稿するユーザID
  const userID = ownProps.match.params.userId;

  const token = localStorage.getItem("shareIT_token");
  const jwt = JWT(token);
  const loginUserID = jwt.uid;

  return { userID: userID, allTopics: allTopics, loginUserID: loginUserID };
};

const mapDispatchToProps = { getAllTopics, postArticleEvent };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "articleNewForm" })(articleNew));
