import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Loading from "Templates/loading";
import { getAllTopics } from "Actions/topic";
import { postArticleEvent, emptyArticles } from "Actions/article";
import TopicSelectBox from "Atoms/topic_select_box";
import { Redirect } from "react-router-dom";
import ToAllArticlesButton from "Atoms/to_all_articles_button";
import getLoginUserInfo from "Modules/getLoginUserInfo";

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

    Promise.all([
      // storeの記事一覧を削除
      await this.props.emptyArticles(),
      // 記事作成
      await this.props.postArticleEvent(values),
    ]).then(() => {
      // ボタンを押した後に遷移するURL
      this.props.history.push("/api/articles");
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const loginUserInfo = getLoginUserInfo();
    const loginUserID = loginUserInfo.userID;

    if (loginUserID !== this.props.userID) {
      return (
        <React.Fragment>
          <Redirect to={"/api/users/" + loginUserID + "/article"} />
        </React.Fragment>
      );
    } else if (Object.values(this.props.allTopics).length !== 0) {
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
              トピック
              <TopicSelectBox
                allTopics={allTopics}
                initTopics={initTopics}
                ref="TopicSelectBox"
              />
            </div>

            <div>
              <input type="submit" value="Submit" />
            </div>

            <div>
              <ToAllArticlesButton />
            </div>
          </form>
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
  const userID = parseInt(ownProps.match.params.userId);

  return { userID: userID, allTopics: allTopics };
};

const mapDispatchToProps = { getAllTopics, postArticleEvent, emptyArticles };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "articleNewForm" })(articleNew));
