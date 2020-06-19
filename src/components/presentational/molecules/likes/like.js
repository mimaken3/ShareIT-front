import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import { toggleLike } from "Actions/like";
import { toggleLikeAtArticleDetail } from "Actions/user";
import LikeNum from "Atoms/likes/sum_num";
import LikeObj from "Atoms/likes/obj";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import LikedUsersMenu from "Atoms/users/liked_users_menu";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: this.props.isLiked,
      likeNum: this.props.likeNum,
      likedUsersAnchorEl: null,
    };
  }

  // いいねしたユーザ一覧をポップアップ表示
  handleLikedUsersMenuOpen = (event) => {
    this.setState({ likedUsersAnchorEl: event.currentTarget });
  };

  // いいねしたユーザ一覧を非表示
  handleLikedUsersMenuClose = () => {
    this.setState({ likedUsersAnchorEl: null });
  };

  // いいね済みに
  onLike() {
    if (this.props.param === "articleDetail") {
      // いいねしたユーザ一覧に自分を追加
      this.props.toggleLikeAtArticleDetail(true);
    }

    const likeArticle = {
      userID: this.props.loginUserID,
      articleID: this.props.articleID,
      isLiked: !this.state.isLiked,
    };
    this.setState({
      isLiked: this.state.isLiked + 1,
      likeNum: this.state.likeNum + 1,
    });
    this.props.toggleLike(likeArticle);
  }

  // 未いいねに
  offLike() {
    if (this.props.param === "articleDetail") {
      // いいねしたユーザ一覧から自分を削除
      this.props.toggleLikeAtArticleDetail(false);
    }

    if (this.props.unLikeEvent) {
      this.props.unLikeEvent();
    }

    const likeArticle = {
      userID: this.props.loginUserID,
      articleID: this.props.articleID,
      isLiked: !this.state.isLiked,
    };
    this.setState({
      isLiked: this.state.isLiked - 1,
      likeNum: this.state.likeNum - 1,
    });
    this.props.toggleLike(likeArticle);
  }

  render() {
    var isLiked;
    if (this.state.isLiked) {
      // いいね済み
      isLiked = (
        <>
          <Button
            onClick={() => {
              this.offLike();
            }}
            className={this.props.classes.button}
          >
            <LikeObj obj={true} />
          </Button>
        </>
      );
    } else {
      // 未いいね
      isLiked = (
        <React.Fragment>
          <Button
            onClick={() => this.onLike()}
            className={this.props.classes.button}
          >
            <LikeObj obj={false} />
          </Button>
        </React.Fragment>
      );
    }

    const islikedUsersOpen = Boolean(this.state.likedUsersAnchorEl);

    // 通知一覧に表示する通知
    let renderlikedUsers = (
      <LikedUsersMenu
        likedUsersAnchorEl={this.state.likedUsersAnchorEl}
        likedUsers={this.props.likedUsers}
        islikedUsersOpen={islikedUsersOpen}
        handleLikedUsersMenuClose={this.handleLikedUsersMenuClose}
      />
    );

    const theme = createMuiTheme({
      overrides: {
        MuiButton: {
          root: {
            minWidth: "30px",
            lineHeight: "normal",
          },
        },
      },
    });

    let likeNum;
    if (this.props.param === "articleDetail") {
      // 記事詳細画面
      if (!this.props.isEmpty) {
        likeNum = (
          <ThemeProvider theme={theme}>
            <Button onClick={(e) => this.handleLikedUsersMenuOpen(e)}>
              <LikeNum likeNum={this.state.likeNum} />
            </Button>
            {renderlikedUsers}
          </ThemeProvider>
        );
      } else {
        likeNum = (
          <>
            <div
              style={{
                display: "table-cell",
                minHeight: "31px",
                minWidth: "30px",
                textAlign: "center",
                marginLeft: "5px",
              }}
            >
              <LikeNum likeNum={this.state.likeNum} />
            </div>
          </>
        );
      }
    } else {
      likeNum = <LikeNum likeNum={this.state.likeNum} />;
    }

    return (
      <React.Fragment>
        <div className={this.props.classes.isLiked}>{isLiked}</div>
        <div className={this.props.classes.likeNum}>{likeNum}</div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = { toggleLike, toggleLikeAtArticleDetail };

const mapStateToProps = (state) => {
  const isEmpty = state.likedUsers.is_empty;
  const likedUsers = state.likedUsers.users;

  return { isEmpty, likedUsers };
};

const styles = {
  button: {
    padding: 5,
    minHeight: 0,
    minWidth: 0,
    maxHeight: 30,
    maxWidth: 30,
  },
  likeNum: {
    marginLeft: "5px",
    float: "left",
  },
  isLiked: {
    float: "left",
  },
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: "likeForm" }),
  withStyles(styles)
)(Like);
