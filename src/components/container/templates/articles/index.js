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
import { showAllArticles } from "Actions/article";
import ScrollToTopOnMount from "Atoms/scroll_to_top_on_mount";

let isBrowzerBack = React.createRef();
isBrowzerBack.current = false;

// 記事一覧ページ
class ArticlesIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  componentDidMount() {
    const loginUser = getLoginUserInfo();
    if (loginUser !== null) {
      // 全トピックの取得
      this.props.getAllTopics().then(() => {
        // セレクトボックス用の全ユーザを取得
        this.props.getAllUsersForSelectBox(loginUser.userID);

        // 記事一覧を取得
        this.props.showAllArticles(1).then(() => {
          this.setState({ loading: false });
        });
      });
    }
  }

  render() {
    // セレクトボックスの中身が読み込まれたら表示
    if (
      Object.values(this.props.allUsers).length > 0 &&
      Object.values(this.props.allTopics).length > 0 &&
      !this.state.loading
    ) {
      return (
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <ScrollToTopOnMount />

          <div style={{ display: "-webkit-flex", marginTop: "20px" }}>
            <SearchArticles />
          </div>

          <div>
            <AllArticlesWithPaging historyAction={this.props.history.action} />
          </div>
        </Container>
      );
    } else {
      return (
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <ScrollToTopOnMount />
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
  showAllArticles,
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
