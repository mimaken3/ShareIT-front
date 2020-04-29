import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { reduxForm } from "redux-form";
import Paging from "../../presentational/atoms/paging";
import Article from "../../presentational/molecules/articles/article";

class AllArticles extends Component {
  // 記事を表示する関数
  renderArticles() {
    return _.map(this.props.articles, (article) => (
      <div key={article.article_id}>
        <Article article={article} />
      </div>
    ));
  }

  render() {
    if (this.props.isEmpty) {
      return (
        <React.Fragment>
          <div>記事一覧</div>
          <div>記事はありません</div>
          <div>
            <Paging
              refName={this.props.refName}
              userID={this.props.userID}
              refPg={this.props.refPg}
              allPagingNum={this.props.allPagingNum}
            />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div>記事一覧</div>
          {this.renderArticles()}

          <div>
            <Paging
              refName={this.props.refName}
              userID={this.props.userID}
              refPg={this.props.refPg}
              allPagingNum={this.props.allPagingNum}
            />
          </div>
        </React.Fragment>
      );
    }
  }
}

const mapDispatchToProps = "";

const mapStateToProps = (state) => {
  return {
    isEmpty: state.articles.is_empty,
    articles: state.articles.articles,
    refPg: state.articles.ref_pg,
    allPagingNum: state.articles.all_paging_num,
  };
};

// connect 第一引数はcomponentに渡すpropsを制御する
// 第二引数はreducerを呼び出して、reduxで管理しているstateを更新する
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "userShowArticlesForm" })(AllArticles));
