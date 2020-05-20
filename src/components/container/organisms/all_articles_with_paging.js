import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import AllArticles from "Organisms/all_articles";
import Paging from "Atoms/paging";
import {
  showAllArticles,
  emptyArticles,
  getAllArticlesByUserID,
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

  componentDidMount() {
    if (this.props.load) {
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
    } else {
      this.setState({ loading: false });
    }
  }

  PagingClick() {
    this.props.emptyArticles();
    if (this.props.allPagingNum) {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.props.articles && this.props.allPagingNum && !this.state.loading) {
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
};

const mapStateToProps = (state) => {
  return {
    allPagingNum: state.articles.all_paging_num,
    articles: state.articles.articles,
    refPg: state.articles.ref_pg,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "AllArticlesWithPagingForm" })(AllArticlesWithPaging));
