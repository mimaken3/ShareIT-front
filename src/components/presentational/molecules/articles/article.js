import React, { Component } from "react";
import { connect } from "react-redux";
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

class Article extends Component {
  constructor(props) {
    super(props);
    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent() {
    this.props.history.push("/api/articles/" + this.props.article.article_id);
  }

  render() {
    const theme = createMuiTheme({
      overrides: {
        // セレクトボックスを開いたとき、TextFieldの文字が被るのを
        // 防ぐため zIndex: 1 -> zIndex: 0
        MuiTypography: {
          displayBlock: {
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
          },
        },
        // 記事のタイトルと内容の文字列を...で省略
        MuiCardContent: {
          root: {
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 4,
            overflow: "hidden",
            padding: "16px 16px 0px", // 下だけ0
          },
        },
      },
    });
    return (
      <ThemeProvider theme={theme}>
        <Card className={this.props.classes.root}>
          <ButtonBase
            className={this.props.classes.cardBox}
            onClick={() => this.handleEvent()}
          >
            <CardHeader
              titleTypographyProps={{ variant: "h6" }}
              title={this.props.article.article_title}
              subheader={this.props.article.created_date}
            />
            <CardContent className={this.props.classes.cardContent}>
              {this.props.article.article_content}
            </CardContent>
          </ButtonBase>
          <CardActions disableSpacing>
            <Like
              articleID={this.props.article.article_id}
              isLiked={this.props.article.is_liked}
              likeNum={this.props.article.like_num}
              loginUserID={this.props.loginUserID}
            />
          </CardActions>
        </Card>
      </ThemeProvider>
    );
  }
}

const mapDispatchToProps = "";

const mapStateToProps = "";

const styles = (theme) => ({
  root: {
    maxWidth: 700,
    marginTop: "20px",
  },
  cardBox: {
    display: "block",
    textAlign: "initial",
  },
  cardContent: {
    fontSize: "18px",
  },
});

export default withRouter(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({ form: "articleForm" }),
    withStyles(styles)
  )(Article)
);
