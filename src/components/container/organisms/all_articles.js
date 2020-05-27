import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { reduxForm } from "redux-form";
import Article from "Molecules/articles/article";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import getIndexDisplayArr from "Modules/get_index_display_arr";

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
          <div
            style={{ textAlign: "center", height: "200px", marginTop: "50px" }}
          >
            <h3>記事はありません</h3>
          </div>
        </React.Fragment>
      );
    } else {
      let loginUser = getLoginUserInfo();
      return (
        <React.Fragment>{this.renderArticles(loginUser.userID)}</React.Fragment>
      );
    }
  }
}

const mapDispatchToProps = "";

const mapStateToProps = (state, ownProps) => {
  if (ownProps.refName === "userLikedArticles") {
    // ユーザがいいねした記事一覧
    return {
      isEmpty: state.likeArticles.is_empty,
      articles: getIndexDisplayArr(state.likeArticles.articles),
    };
  } else {
    // ユーザの記事一覧 or 記事一覧
    return {
      isEmpty: state.articles.is_empty,
      articles: getIndexDisplayArr(state.articles.articles),
    };
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "userShowArticlesForm" })(AllArticles));
