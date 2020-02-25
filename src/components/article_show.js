import React, { Component } from "react";
import { connect } from "react-redux";
// 入力フォーム作成で使う
import { Field, reduxForm } from "redux-form";
import { getArticleDetail } from "../actions";
import { Link } from "react-router-dom";
import _ from "lodash";

class ArticleShow extends Component {
  // 入力される値(フィールドの値)が渡ってくる
  //   renderField(field) {
  //     const {
  //       input,
  //       label,
  //       type,
  //       meta: { touched, error }
  //     } = field;
  //     return (
  //       <div>
  //         <input {...input} placeholder={label} type={type} />
  //       </div>
  //     );
  //   }

  // 外部のAPIに対してイベントを取得する
  componentDidMount() {
    // 複雑な処理はcomponentに書かずに外(action)に記述
    const { articleId } = this.props.match.params;
    if (articleId) this.props.getArticleDetail(articleId);
  }

  render() {
    if (this.props.article) {
      return (
        <React.Fragment>
          <div>記事詳細</div>
          <div>ID: {this.props.article.article_id}</div>
          <div>タイトル: {this.props.article.article_title}</div>
          <div>トピック: {this.props.article.article_topics}</div>
          <div>内容: {this.props.article.article_content}</div>
          <div>作成日: {this.props.article.created_date}</div>

          <Link to={`/articles`}>一覧画面へ</Link>
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

// stateとactionをcomponentに関連付ける実装
// このstatusは状態のトップレベルを表す
// ReduxのStoreを第一引数にとる関数で、Componentにpropsとして渡すものをフィルタリングするときに使う。
const mapStateToProps = (state, ownProps) => {
  // 詳細画面で必要な各種情報を取得
  console.log(
    "ownProps.match.params.articleId: " + ownProps.match.params.articleId
  ); // 5
  console.log("ownProps: " + JSON.stringify(ownProps));
  const article = state.articles[ownProps.match.params.articleId];
  console.log("article: " + JSON.stringify(article));

  // 初期状態でどんな値を表示するかをinitialValuesで設定
  return { initialValues: article, article: article };
  //return { article: event };
};

const mapDispatchToProps = { getArticleDetail };

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
