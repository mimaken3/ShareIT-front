import React, { Component } from "react";
import { connect } from "react-redux";
// 入力フォーム作成で使う
import { Field, reduxForm } from "redux-form";
import { getArticleDetail, putEvent } from "Actions/article";
import { getAllTopics } from "Actions/topic";
import { Link } from "react-router-dom";
import TopicSelectBox from "Atoms/topic_select_box";
import CreatedDate from "Atoms/created_date.js";
import ToAllArticlesButton from "Atoms/buttons/to_all_articles_button";
import Loading from "Templates/loading";
import UnauthorizedPage from "Atoms/unauthorized_page";
import ArticleID from "Atoms/articles/id";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import DeleteButton from "Atoms/buttons/delete_button";
import Privacy from "Atoms/articles/privacy";
import convertJSTToDate from "Modules/convert_JST_to_date";

class ArticleUpdate extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // 外部のAPIに対してイベントを取得する
  componentDidMount() {
    // 全トピックの取得
    this.props.getAllTopics();

    // 記事情報を取得
    const { articleId } = this.props.match.params;
    if (articleId) this.props.getArticleDetail(articleId);
  }

  // タイトルと内容の入力ボックス
  renderField(field) {
    const {
      input,
      label,
      type,
      meta: { error },
    } = field;

    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {error && <span>{error}</span>}
      </div>
    );
  }

  // 記事を更新して送信
  async onSubmit(values) {
    // 送信するトピックをセット
    values.article_topics = this.refs.TopicSelectBox.getSendTopics(
      values.article_topics
    );

    values.created_date = convertJSTToDate(values.created_date);

    // プライバシーを設定
    values.is_private = this.refs.Privacy.privacy;

    await this.props.putEvent(values);
    // 更新ボタンを押したとに表示するPATH
    this.props.history.push("/api/articles/" + values.article_id);
  }

  render() {
    const { handleSubmit, submitting, invalid } = this.props;
    const loginUserInfo = getLoginUserInfo();
    const loginUserID = loginUserInfo.userID;
    const isAdmin = loginUserInfo.admin;
    if (
      this.props.article &&
      Object.values(this.props.allTopics).length !== 0
    ) {
      if (loginUserID !== this.props.article.created_user_id && !isAdmin) {
        // 別ユーザ(admin以外)がアクセスしようとした場合
        return (
          <React.Fragment>
            <UnauthorizedPage page="articles" />
          </React.Fragment>
        );
      } else {
        // 全トピック
        const allTopics = this.props.allTopics;

        // 初期表示トピック
        const initTopics = this.props.article.article_topics;

        const sendObj = { articleID: this.props.article.article_id };
        return (
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div>
              <div>
                <ArticleID articleID={this.props.article.article_id} />
              </div>
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
              トピック:
              <TopicSelectBox
                allTopics={allTopics}
                initTopics={initTopics}
                ref="TopicSelectBox"
              />
            </div>

            <div>
              <Privacy
                initPrivacy={this.props.article.is_private}
                ref="Privacy"
              />
            </div>

            <div>
              <CreatedDate createdDate={this.props.article.created_date} />
            </div>

            <div>
              <input
                type="submit"
                value="Submit"
                disabled={submitting || invalid}
              />
            </div>

            <div>
              <Link to={`/api/articles/${this.props.article.article_id}`}>
                戻る
              </Link>
            </div>

            <div>
              <DeleteButton param="article" sendObj={sendObj} />
            </div>

            <div>
              <ToAllArticlesButton />
            </div>
          </form>
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

// バリデーションを行う関数
const validate = (values) => {
  const errors = {};
  if (!values.article_title)
    errors.article_title = "タイトルを入力してください";
  if (!values.article_content)
    errors.article_content = "内容を入力してください";

  return errors;
};

// stateとactionをcomponentに関連付ける実装
// このstatusは状態のトップレベルを表す
// ReduxのStoreを第一引数にとる関数で、Componentにpropsとして渡すものをフィルタリングするときに使う。
const mapStateToProps = (state, ownProps) => {
  // 詳細画面で必要な各種情報を取得

  // 更新する記事情報
  const article = state.articles.articles[ownProps.match.params.articleId];

  // 全トピック
  const allTopics = state.topics;

  // 初期状態でどんな値を表示するかをinitialValuesで設定
  return {
    initialValues: article,
    article: article,
    allTopics: allTopics,
  };
};

const mapDispatchToProps = {
  getArticleDetail,
  putEvent,
  getAllTopics,
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
  // reduxForm()の引数には設定に関するオブジェクトを渡す validataionのルールやformの名前などを渡す
  reduxForm({ validate, form: "articleUpdateForm", enableReinitialize: true })(
    ArticleUpdate
  )
);
