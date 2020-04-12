import React, { Component } from "react";
import { connect } from "react-redux";
// 入力フォーム作成で使う
import { Field, reduxForm } from "redux-form";
import { getArticleDetail, putEvent, deleteEvent } from "../../actions/article";
import { getAllTopics } from "../../actions/topic";
import { Link } from "react-router-dom";
import TopicSelectBox from "../presentational/atoms/topic_select_box";
import CreatedDate from "../presentational/atoms/created_date.js";
// import InputTitle from "../presentational/atoms/articles/input_title";
// import InputContent from "../presentational/atoms/articles/input_content";
import ToAllArticlesButton from "../presentational/atoms/to_all_articles_button";
import Loading from "../presentational/atoms/loading";
import ArticleID from "../presentational/atoms/articles/id";

class ArticleUpdate extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
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
      // mata: { visited, error }
      meta: { error }
    } = field;

    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {error && <span>{error}</span>}
        {/* {visited && error && <span>{error}</span>} */}
      </div>
    );
  }

  // 記事を更新して送信
  async onSubmit(values) {
    // 送信するトピックをセット
    values.article_topics = this.refs.TopicSelectBox.getSendTopics(
      values.article_topics
    );

    await this.props.putEvent(values);
    // 更新ボタンを押したとに表示するPATH
    this.props.history.push("/article/" + values.article_id);
  }

  // 記事の削除
  async onDeleteClick() {
    const article_id = this.props.match.params.articleId;
    await this.props.deleteEvent(article_id);
    this.props.history.push("/articles");
  }

  render() {
    // pristine:
    // submitting: submitボタンを一度押したら非活性にする
    // invalid: submitボタンを押したらtrueになる状態
    const { handleSubmit, submitting, invalid } = this.props;

    if (
      this.props.article &&
      Object.values(this.props.allTopics).length !== 0
    ) {
      // 全トピック
      const allTopics = this.props.allTopics;

      // 初期表示トピック
      const initTopics = this.props.article.article_topics;

      return (
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            {/* <InputTitle input_title={this.props.article.article_title} /> */}
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
            <Link to={`/article/${this.props.article.article_id}`}>戻る</Link>
          </div>

          <div>
            <Link to="/" onClick={this.onDeleteClick}>
              削除
            </Link>
          </div>

          <div>
            <ToAllArticlesButton />
          </div>
        </form>
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

// バリデーションを行う関数
const validate = values => {
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
  const article = state.articles[ownProps.match.params.articleId];

  // 全トピック
  const allTopics = state.topics;

  // 初期状態でどんな値を表示するかをinitialValuesで設定
  return { initialValues: article, article: article, allTopics: allTopics };
};

const mapDispatchToProps = {
  getArticleDetail,
  putEvent,
  deleteEvent,
  getAllTopics
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
