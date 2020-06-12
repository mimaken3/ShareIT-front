import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { getArticleDetail, deleteEvent } from "Actions/article";
import { getUserDetail, getLikedUsersByArticleID } from "Actions/user";
import { getAllComments } from "Actions/comment";
import CreatedDate from "Atoms/created_date.js";
import Loading from "Templates/loading";
import EditButton from "Atoms/buttons/edit_button";
import Like from "Molecules/likes/like";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import AllComments from "Organisms/all_comments";
import CommentNew from "Molecules/comments/create";
import DeleteButton from "Atoms/buttons/delete_button";
import NotFoundPage from "Templates/not_found_page";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TopicTags from "Atoms/topic_tags";
import ScrollToTopOnMount from "Atoms/scroll_to_top_on_mount";
import UserIcon from "Atoms/user_icon";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

class ArticleShow extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.state = { loading: true };
  }

  componentDidMount() {
    const { articleId } = this.props.match.params;
    if (articleId) {
      Promise.all([
        this.props.getAllComments(articleId),
        this.props.getArticleDetail(articleId),
        this.props.getLikedUsersByArticleID(articleId),
      ]).then(() => {
        this.props
          .getUserDetail(this.props.article.created_user_id)
          .then(() => {
            this.setState({ loading: false });
          });
      });
    }
  }

  // 記事の削除
  async onDeleteClick() {
    const article_id = this.props.match.params.articleId;
    await this.props.deleteEvent(article_id);
    this.props.history.push("/articles");
  }

  toUserShowPage(userID) {
    this.props.history.push("/users/" + userID);
  }

  render() {
    const loginUser = getLoginUserInfo();
    const loginUserID = loginUser.userID;
    const isAdmin = loginUser.admin;
    if (this.props.article && !this.state.loading && this.props.postedUser) {
      var AuthorizedEditButton;
      if (loginUserID === this.props.article.created_user_id || isAdmin) {
        const sendObj = { articleID: this.props.article.article_id };
        AuthorizedEditButton = (
          <div className={this.props.classes.authButtons}>
            <div className={this.props.classes.editButton}>
              <EditButton path="articles" id={this.props.article.article_id} />
            </div>
            <div className={this.props.classes.deleteButton}>
              <DeleteButton param="article" sendObj={sendObj} />
            </div>
          </div>
        );
      }

      const theme = createMuiTheme({
        overrides: {
          MuiButton: {
            // 文字が大文字になるのを防ぐ
            root: {
              textTransform: "none",
            },
            // 作成日の直下に投稿ユーザ情報を配置するため
            text: {
              display: "block",
            },
          },
        },
      });

      return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="md">
            <ScrollToTopOnMount />
            <CssBaseline />

            <div className={this.props.classes.articleTitle}>
              <h2>{this.props.article.article_title}</h2>
            </div>
            <TopicTags topics={this.props.article.article_topics} />
            <div>
              <p className={this.props.classes.articleContent}>
                {this.props.article.article_content}
              </p>
            </div>

            <div className={this.props.classes.likeBox}>
              <Like
                articleID={this.props.article.article_id}
                isLiked={this.props.article.is_liked}
                likeNum={this.props.article.like_num}
                loginUserID={loginUserID}
                param="articleDetail"
              />
            </div>

            <div className={this.props.classes.postedUserInfo}>
              <span>
                作成日時{" "}
                <CreatedDate createdDate={this.props.article.created_date} />
              </span>
              <Button
                onClick={() =>
                  this.toUserShowPage(this.props.postedUser.user_id)
                }
              >
                <div className={this.props.classes.userIcon}>
                  <UserIcon iconData={this.props.postedUser.icon_name} />
                </div>
                <div className={this.props.classes.userName}>
                  {this.props.postedUser.user_name}
                </div>
              </Button>
            </div>

            <div className={this.props.classes.auth}>
              {AuthorizedEditButton}
            </div>
            <div className={this.props.classes.allComments}>
              <AllComments articleID={this.props.article.article_id} />
            </div>
            <div>
              <CommentNew articleID={this.props.article.article_id} />
            </div>
          </Container>
        </ThemeProvider>
      );
    } else if (this.props.isEmpty && !this.state.loading) {
      return (
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <ScrollToTopOnMount />
          <NotFoundPage />
        </Container>
      );
    } else {
      return (
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <ScrollToTopOnMount />
          <Loading />
        </Container>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  // 詳細画面で必要な各種情報を取得
  const article = state.articles.articles[ownProps.match.params.articleId];

  let postedUser;
  if (article) {
    postedUser = state.users.users[article.created_user_id];
  }

  // 記事の存在
  const isEmpty = state.articles.is_empty;

  // 初期状態でどんな値を表示するかをinitialValuesで設定
  return {
    initialValues: article,
    article: article,
    isEmpty: isEmpty,
    postedUser,
  };
};

const mapDispatchToProps = {
  getArticleDetail,
  deleteEvent,
  getAllComments,
  getUserDetail,
  getLikedUsersByArticleID,
};

const styles = () => ({
  likeBox: {
    marginTop: "20px",
    float: "left",
    display: "flex",
    alignItems: "center",
  },
  postedUserInfo: {
    float: "left",
    marginLeft: "45px",
  },
  userIcon: {
    width: "40px",
    height: "40px",
    display: "table-cell",
    verticalAlign: "middle",
  },
  userName: {
    fontSize: "17px",
    paddingLeft: "10px",
    display: "table-cell",
    verticalAlign: "middle",
  },
  articleTitle: {
    wordBreak: "break-word",
  },
  articleContent: {
    fontSize: "18px",
    minHeight: "30px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  auth: {
    clear: "both",
  },
  allComments: {
    clear: "both",
    marginTop: "40px",
  },
  deleteButton: {
    float: "left",
  },
  editButton: {
    float: "left",
    marginRight: "5px",
  },
  authButtons: {
    float: "left",
    marginTop: "30px",
    marginBottom: "100px",
  },
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: "articleShowForm", enableReinitialize: true }),
  withStyles(styles)
)(ArticleShow);
