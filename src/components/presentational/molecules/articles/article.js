import React, { Component } from "react";
import { reduxForm } from "redux-form";
import Like from "Molecules/likes/like";
import Card from "@material-ui/core/Card";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import ButtonBase from "@material-ui/core/ButtonBase";
import { withRouter } from "react-router";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import TopicTags from "Atoms/topic_tags";
import CreatedDate from "Atoms/created_date";
import { ScrollTo } from "react-scroll-to";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import { deleteUnlikeArticleEvent } from "Actions/article";
import { connect } from "react-redux";

class Article extends Component {
  constructor(props) {
    super(props);
    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent() {
    this.props.history.push("/articles/" + this.props.article.article_id);
  }

  unLikeEvent() {
    // 自身のいいね一覧でアンライクしたとき
    this.props.deleteUnlikeArticleEvent(this.props.article.article_id);
  }

  render() {
    const theme = createMuiTheme({
      overrides: {
        // 記事のタイトルを太くする
        MuiTypography: {
          displayBlock: {
            fontWeight: "bold",
          },
        },
        MuiCardHeader: {
          root: {
            padding: "16px 16px 5px",
          },
          content: {
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        },
        MuiCardActions: {
          root: {
            padding: "0px 8px 8px",
          },
        },
        MuiCardContent: {
          root: {
            // TODO: 要改修a
            // ↓のように記述しないと高さが一瞬ずれて表示される
            // 記事の中身が「display: block」が勝手についたり外れたりする 24pxが同じ高さ
            padding: "5px 16px 24px",
          },
        },
      },
    });

    const loginUser = getLoginUserInfo();
    const loginUserID = loginUser.userID;

    let LikeCom;
    if (this.props.history.location.pathname === "/users/" + loginUserID) {
      LikeCom = (
        <Like
          articleID={this.props.article.article_id}
          isLiked={this.props.article.is_liked}
          likeNum={this.props.article.like_num}
          loginUserID={this.props.loginUserID}
          unLikeEvent={() => this.unLikeEvent()}
        />
      );
    } else {
      LikeCom = (
        <Like
          articleID={this.props.article.article_id}
          isLiked={this.props.article.is_liked}
          likeNum={this.props.article.like_num}
          loginUserID={this.props.loginUserID}
        />
      );
    }

    return (
      <ThemeProvider theme={theme}>
        <Card className={this.props.classes.root}>
          <ScrollTo>
            {({ scroll }) => (
              <ButtonBase
                className={this.props.classes.cardBox}
                onClick={() => {
                  scroll({ x: 0, y: 0 });
                  this.handleEvent();
                }}
              >
                <CardHeader
                  titleTypographyProps={{ variant: "h6" }}
                  title={
                    <div className={this.props.classes.articleTitle}>
                      {this.props.article.article_title}
                    </div>
                  }
                  subheader={
                    <CreatedDate
                      createdDate={this.props.article.created_date}
                    />
                  }
                />
                <CardContent className={this.props.classes.cardContent}>
                  <div className={this.props.classes.content}>
                    {this.props.article.article_content}
                  </div>
                  <TopicTags topics={this.props.article.article_topics} />
                </CardContent>
              </ButtonBase>
            )}
          </ScrollTo>
          <CardActions disableSpacing>{LikeCom}</CardActions>
        </Card>
      </ThemeProvider>
    );
  }
}

const styles = (theme) => ({
  root: {
    maxWidth: 700,
    marginTop: "20px",
  },
  cardBox: {
    display: "block",
    textAlign: "initial",
    width: "100%",
  },
  cardContent: {
    fontSize: "18px",
  },
  // 記事のタイトルを... で省略
  articleTitle: {
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  // 記事の内容の文字列を...で省略
  content: {
    marginBottom: "10px",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
  },
});

const mapDispatchToProps = {
  deleteUnlikeArticleEvent,
};

const mapStateToProps = "";

export default withRouter(
  compose(
    reduxForm({ form: "articleForm" }),
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
  )(Article)
);
