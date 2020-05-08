import React, { Component } from "react";
import { connect } from "react-redux";
import {
  showAllArticles,
  emptyArticles,
  getAllArticlesByUserID,
} from "Actions/article";
import ToAllUsersButton from "Atoms/to_all_users_button";
import Loading from "Templates/loading";
import CreateArticleButton from "Atoms/create_article_button";
import AllArticles from "Organisms/all_articles";
import Paging from "Atoms/paging";

class ArticlesIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  // 外部のAPIに対してイベントを取得する
  componentDidMount() {
    if (this.props.param === "userDetailShow") {
      // ユーザ詳細の記事一覧
      this.props.getAllArticlesByUserID(this.props.userID, 1).then(() => {
        this.setState({ loading: false });
      });
    } else {
      // 記事一覧ページ
      this.props.showAllArticles(1).then(() => {
        this.setState({ loading: false });
      });
    }
  }

  PagingClick() {
    this.props.emptyArticles();
    if (this.props.allPagingNum) {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.props.articles && this.props.allPagingNum && !this.props.loading) {
      if (this.props.param === "userDetailShow") {
        // ユーザ詳細の記事一覧
        return (
          <React.Fragment>
            <AllArticles refName="userArticles" userID={this.props.userID} />
            <div>
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
      } else {
        // 記事一覧ページ
        return (
          <React.Fragment>
            <AllArticles refName="articles" />
            <div>
              <Paging
                refName="articles"
                userID={this.props.userID}
                refPg={this.props.refPg}
                allPagingNum={this.props.allPagingNum}
                callback={() => this.PagingClick()}
              />
            </div>
            <div>
              <CreateArticleButton />
            </div>
            <div>
              <ToAllUsersButton />
            </div>
          </React.Fragment>
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

const mapStateToProps = (state, ownProps) => {
  // 詳細画面で必要な各種情報を取得
  const user = state.users.users;

  return {
    allPagingNum: state.articles.all_paging_num,
    articles: state.articles.articles,
    refPg: state.articles.ref_pg,
    user: user,
  };
};

const mapDispatchToProps = {
  showAllArticles,
  emptyArticles,
  getAllArticlesByUserID,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesIndex);
