import React, { Component } from "react";
import AllArticlesWithPaging from "Organisms/all_articles_with_paging";
import SearchArticles from "Molecules/articles/search";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { getAllUsersForSelectBox } from "Actions/user";
import { getAllTopics } from "Actions/topic";
import { searchArticles } from "Actions/article";
import Loading from "Templates/loading";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router";

let isBrowzerBack = React.createRef();
isBrowzerBack.current = false;

// 記事一覧ページ
class ArticlesIndex extends Component {
  componentDidMount() {
    // window.onpopstate = () => {
    //   isBrowzerBack.current = true;
    // };

    // if (isBrowzerBack.current) {
    //   isBrowzerBack.current = false;
    // } else {
    const loginUser = getLoginUserInfo();
    if (loginUser !== null) {
      // 全トピックの取得
      this.props.getAllTopics().then(() => {
        // セレクトボックス用の全ユーザを取得
        this.props.getAllUsersForSelectBox(loginUser.userID);
      });
    }
    // }
  }

  render() {
    // セレクトボックスの中身が読み込まれたら表示
    if (
      Object.values(this.props.allUsers).length > 0 &&
      Object.values(this.props.allTopics).length > 0
    ) {
      return (
        <Container component="main" maxWidth="sm">
          <CssBaseline />

          <div style={{ display: "-webkit-flex", marginTop: "20px" }}>
            <SearchArticles />
          </div>

          <div>
            <AllArticlesWithPaging
              historyAction={this.props.history.action}
              // load={!isBrowzerBack.current}
            />
          </div>
        </Container>
      );
    } else {
      return (
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Loading />
        </Container>
      );
    }
  }
}
const mapDispatchToProps = {
  getAllTopics,
  searchArticles,
  getAllUsersForSelectBox,
};

const mapStateToProps = (state) => {
  // 全ユーザ
  const allUsers = state.selectUser.users;

  // 全トピック
  const allTopics = state.topics;

  return { allUsers, allTopics };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(reduxForm({ form: "articlesIndexForm" })(ArticlesIndex))
);
