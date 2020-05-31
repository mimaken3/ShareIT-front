import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import AllArticles from "Organisms/all_articles";
import Paging from "Atoms/paging";
import {
  showAllArticles,
  emptyArticles,
  getAllArticlesByUserID,
  emptyLikedArticles,
  showLikedArticlesByUserID,
} from "Actions/article";
import Loading from "Templates/loading";

// 記事一覧とページングボタン
class AllArticlesWithPaging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidUpdate() {
    // 自身のいいね一覧の記事をアンライクしたとき発火(ページジング2以上にいたとき)
    if (this.props.isReload) {
      // ユーザのいいねした記事一覧を取得
      this.props.showLikedArticlesByUserID(
        this.props.userID,
        this.props.rreloadRefPg
      );
    }
  }

  PagingClick() {
    if (this.props.param === "userDetailShow") {
      // ユーザ詳細の記事一覧
      this.props.emptyArticles();
    } else if (this.props.param === "userLikedArticles") {
      // ユーザがいいねした記事一覧
      this.props.emptyLikedArticles();
    } else {
      // 記事一覧
      this.props.emptyArticles();
    }
    if (this.props.allPagingNum) {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.props.allPagingNum) {
      if (this.props.param === "userDetailShow") {
        // ユーザ詳細の記事一覧
        return (
          <React.Fragment>
            <AllArticles refName="userArticles" userID={this.props.userID} />
            <div style={{ marginTop: "30px" }}>
              <Paging
                refName="userArticles"
                userID={this.props.userID}
                refPg={this.props.refPg}
                allPagingNum={this.props.allPagingNum}
                callback={() => this.PagingClick()}
              />
            </div>
          </React.Fragment>
        );
      } else if (this.props.param === "userLikedArticles") {
        // ユーザがいいねした記事一覧
        return (
          <React.Fragment>
            <AllArticles
              refName="userLikedArticles"
              userID={this.props.userID}
            />
            <div style={{ marginTop: "30px" }}>
              <Paging
                refName="userLikedArticles"
                userID={this.props.userID}
                refPg={this.props.refPg}
                allPagingNum={this.props.allPagingNum}
                callback={() => this.PagingClick()}
              />
            </div>
          </React.Fragment>
        );
      } else {
        // 記事一覧ページ
        return (
          <div style={{ clear: "both", paddingTop: "10px" }}>
            <AllArticles refName="articles" />
            <Paging
              refName="articles"
              userID={this.props.userID}
              refPg={this.props.refPg}
              allPagingNum={this.props.allPagingNum}
              callback={() => this.PagingClick()}
            />
          </div>
        );
      }
    } else {
      return (
        <div style={{ clear: "both", paddingTop: "10px" }}>
          <Loading />
        </div>
      );
    }
  }
}

const mapDispatchToProps = {
  showAllArticles,
  emptyArticles,
  getAllArticlesByUserID,
  emptyLikedArticles,
  showLikedArticlesByUserID,
};

const mapStateToProps = (state, ownProps) => {
  if (ownProps.param === "userLikedArticles") {
    // ユーザがいいねした記事一覧
    return {
      isReload: state.likeArticles.is_reload,
      reloadRefPg: state.likeArticles.reload_ref_pg,
      allPagingNum: state.likeArticles.all_paging_num,
      articles: state.likeArticles.articles,
      refPg: state.likeArticles.ref_pg,
    };
  } else {
    // ユーザの記事一覧 or 記事一覧ページ
    return {
      allPagingNum: state.articles.all_paging_num,
      articles: state.articles.articles,
      refPg: state.articles.ref_pg,
    };
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "AllArticlesWithPagingForm" })(AllArticlesWithPaging));
