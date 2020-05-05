import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { reduxForm } from "redux-form";
import Article from "Molecules/articles/article";
import getLoginUserInfo from "Modules/getLoginUserInfo";

class AllArticles extends Component {
  // 記事を表示する関数
  renderArticles(loginUserID) {
    return _.map(this.props.articles, (article) => (
      <div key={article.article_id}>
        <Article article={article} loginUserID={loginUserID} />
      </div>
    ));
  }

  render() {
    if (this.props.isEmpty) {
      return (
        <React.Fragment>
          <div>記事一覧</div>
          <div>記事はありません</div>
        </React.Fragment>
      );
    } else {
      let loginUser = getLoginUserInfo();
      return (
        <React.Fragment>
          <div>記事一覧</div>
          {this.renderArticles(loginUser.userID)}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "userShowArticlesForm" })(AllArticles));
