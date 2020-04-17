import React, { Component } from "react";
import { connect } from "react-redux";
// 入力フォーム作成で使う
import { reduxForm } from "redux-form";
import { getArticleDetail, deleteEvent } from "../../actions/article";
import ArticleTitle from "../presentational/atoms/articles/title";
import ArticleContent from "../presentational/atoms/articles/content";
import CreatedDate from "../presentational/atoms/created_date.js";
import Topic from "../presentational/atoms/topics/topic";
import ArticleID from "../presentational/atoms/articles/id";
import ToAllArticlesButton from "../presentational/atoms/to_all_articles_button";
import Loading from "../presentational/atoms/loading";
import EditButton from "../presentational/atoms/edit_button";

class ArticleShow extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    // 複雑な処理はcomponentに書かずに外(action)に記述
    const { articleId } = this.props.match.params;
    if (articleId) this.props.getArticleDetail(articleId);
  }

  // 記事の削除
  async onDeleteClick() {
    const article_id = this.props.match.params.articleId;
    await this.props.deleteEvent(article_id);
    this.props.history.push("/api/articles");
  }

  render() {
    if (this.props.article) {
      return (
        <React.Fragment>
          <div>記事詳細</div>
          <div>
            <ArticleID articleID={this.props.article.article_id} />
          </div>

          <div>
            <ArticleTitle articleTitle={this.props.article.article_title} />
          </div>

          <div>
            <Topic topic={this.props.article.article_topics} />
          </div>

          <div>
            <ArticleContent
              articleContent={this.props.article.article_content}
            />
          </div>

          <div>
            <CreatedDate createdDate={this.props.article.created_date} />
          </div>

          <div>
            <EditButton path="articles" id={this.props.article.article_id} />
          </div>

          <div>
            <ToAllArticlesButton />
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

// stateとactionをcomponentに関連付ける実装
// このstatusは状態のトップレベルを表す
// ReduxのStoreを第一引数にとる関数で、Componentにpropsとして渡すものをフィルタリングするときに使う。
const mapStateToProps = (state, ownProps) => {
  // 詳細画面で必要な各種情報を取得

  const article = state.articles[ownProps.match.params.articleId];

  // 初期状態でどんな値を表示するかをinitialValuesで設定
  return { initialValues: article, article: article };
};

const mapDispatchToProps = { getArticleDetail, deleteEvent };

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
  reduxForm({ form: "articleShowForm", enableReinitialize: true })(ArticleShow)
);
