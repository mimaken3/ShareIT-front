import React, { Component } from "react";
import ToAllUsersButton from "Atoms/buttons/to_all_users_button";
import CreateArticleButton from "Atoms/buttons/create_article_button";
import AllArticlesWithPaging from "Organisms/all_articles_with_paging";
import SearchArticles from "Molecules/articles/search";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { getAllUsersForSelectBox } from "Actions/user";
import { getAllTopics } from "Actions/topic";
import { searchArticles } from "Actions/article";
import Loading from "Templates/loading";
import AllArticleTitle from "Atoms/articles/all_articles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

// 記事一覧ページ
class ArticlesIndex extends Component {
  constructor(props) {
    super(props);
    const loginUser = getLoginUserInfo();
    if (loginUser !== null) {
      // 全トピックの取得
      this.props.getAllTopics().then(() => {
        // セレクトボックス用の全ユーザを取得
        this.props.getAllUsersForSelectBox(loginUser.userID);
      });
    }
  }

  render() {
    // セレクトボックスの中身が読み込まれたら表示
    if (Object.values(this.props.allUsers).length > 0) {
      return (
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <div>
            <AllArticleTitle />
          </div>

          <div style={{ float: "left" }}>
            <SearchArticles />
          </div>

          <div>
            <AllArticlesWithPaging historyAction={this.props.history.action} />
          </div>

          <div>
            <CreateArticleButton />
          </div>

          <div>
            <ToAllUsersButton />
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

  return { allUsers: allUsers };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "articlesIndexForm" })(ArticlesIndex));
