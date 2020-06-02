import React, { Component } from "react";
import UserIcon from "Atoms/user_icon";
import Button from "@material-ui/core/Button";
import CommentEdit from "./edit";
import DeleteButton from "Atoms/buttons/delete_button";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import EditIcon from "@material-ui/icons/Edit";
import { withRouter } from "react-router";
import CreatedDate from "Atoms/created_date";
import { withStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.toUserShowPage = this.toUserShowPage.bind(this);
    this.state = { isEdited: false };
  }

  toUserShowPage(userID) {
    this.props.history.push("/users/" + userID);
  }

  editComment() {
    this.setState({ isEdited: true });
  }

  onEditCancel() {
    this.setState({ isEdited: false });
  }

  Edited() {
    this.setState({ isEdited: false });
  }

  render() {
    const loginUserInfo = getLoginUserInfo();
    const isAdmin = loginUserInfo.admin;

    // 削除ボタン
    let deleteButton;
    if (this.props.loginUserName === this.props.comment.user_name || isAdmin) {
      const sendObj = {
        articleID: this.props.comment.article_id,
        commentID: this.props.comment.comment_id,
        index: this.props.index,
      };
      deleteButton = (
        <div>
          <DeleteButton param="comment" sendObj={sendObj} />
        </div>
      );
    }

    // 編集ボタン
    let editButton;
    if (this.props.loginUserName === this.props.comment.user_name || isAdmin) {
      editButton = (
        <Button
          onClick={() => this.editComment()}
          variant="outlined"
          startIcon={<EditIcon />}
        >
          編集
        </Button>
      );
    }

    let commentDisplay;
    if (this.state.isEdited) {
      commentDisplay = (
        <React.Fragment>
          <div>
            <CommentEdit
              comment={this.props.comment}
              index={this.props.index}
              callback={() => this.Edited()}
            />
          </div>
          <div className={this.props.classes.cancelButton}>
            <Button onClick={() => this.onEditCancel()} variant="outlined">
              キャンセル
            </Button>
          </div>
        </React.Fragment>
      );
    } else {
      commentDisplay = (
        <React.Fragment>
          <div className={this.props.classes.createdComment}>
            {this.props.comment.content}
          </div>
          <div className={this.props.classes.editButton}>{editButton}</div>
          <div className={this.props.classes.deleteButton}>{deleteButton}</div>
        </React.Fragment>
      );
    }

    const breakpoints = createBreakpoints({});

    const theme = createMuiTheme({
      overrides: {
        MuiButton: {
          root: {
            minWidth: "58px",
          },
          text: {
            padding: "6px 0px",
          },
          // 文字数が4ケタ以上になるとレイアウトが崩れるため
          outlined: {
            [breakpoints.up("400")]: {
              padding: "5px 16px",
            },
            [breakpoints.down("400")]: {
              padding: "4px 4px",
            },
          },
        },
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <div className={this.props.classes.userIconButton}>
          <Button
            onClick={() => this.toUserShowPage(this.props.comment.user_id)}
          >
            <div className={this.props.classes.userIcon}>
              <UserIcon iconData={this.props.comment.icon_name} />
            </div>
          </Button>
        </div>

        <div className={this.props.classes.userNameAndComment}>
          <div className={this.props.classes.userName}>
            {this.props.comment.user_name}
          </div>

          <div className={this.props.classes.createdDate}>
            <CreatedDate createdDate={this.props.comment.created_date} />
          </div>
        </div>

        <div className={this.props.classes.comment}>{commentDisplay}</div>
        <div className={this.props.classes.stopFloat}></div>
      </ThemeProvider>
    );
  }
}

const styles = (theme) => ({
  comment: {
    [theme.breakpoints.up(400)]: {
      float: "left",
      width: "82%",
    },
    [theme.breakpoints.down(400)]: {
      float: "right",
      width: "83%",
    },
  },
  createdDate: {
    [theme.breakpoints.up(500)]: {
      float: "left",
    },
    [theme.breakpoints.down(500)]: {
      clear: "both",
    },
  },
  userName: {
    float: "left",
    marginRight: "3px",
  },
  userIcon: {
    width: "50px",
    height: "50px",
    float: "left",
  },
  userIconButton: {
    float: "left",
  },
  userNameAndComment: {
    marginTop: "10px",
    float: "left",
  },
  cancelButton: {
    marginTop: "5px",
  },
  editButton: {
    float: "left",
    marginRight: "5px",
  },
  deleteButton: {
    float: "left",
  },
  createdComment: {
    fontSize: "16px",
    width: "100%",
    whiteSpace: "pre-wrap",
    marginTop: "4px",
    wordWrap: "break-word",
  },
  stopFloat: {
    clear: "both",
  },
});

export default withRouter(withStyles(styles)(Comment));
