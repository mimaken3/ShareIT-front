import React, { Component } from "react";
import UserIcon from "Atoms/user_icon";
import Button from "@material-ui/core/Button";
import CommentEdit from "./edit";
import DeleteButton from "Atoms/buttons/delete_button";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import EditIcon from "@material-ui/icons/Edit";
import { withRouter } from "react-router";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.toUserShowPage = this.toUserShowPage.bind(this);
    this.state = { isEdited: false };
  }

  toUserShowPage(userID) {
    this.props.history.push("/api/users/" + userID);
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
        <div>
          <div>
            <CommentEdit
              comment={this.props.comment}
              index={this.props.index}
              callback={() => this.Edited()}
            />
          </div>
          <div style={{ marginTop: "5px" }}>
            <Button onClick={() => this.onEditCancel()} variant="outlined">
              キャンセル
            </Button>
          </div>
        </div>
      );
    } else {
      commentDisplay = (
        <React.Fragment>
          <div
            style={{
              fontSize: "16px",
              width: "100%",
              whiteSpace: "pre-wrap",
              marginTop: "4px",
            }}
          >
            {this.props.comment.content}
          </div>
          <div style={{ float: "left", marginRight: "5px" }}>{editButton}</div>
          <div style={{ float: "left" }}>{deleteButton}</div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div style={{ float: "left" }}>
          <Button
            onClick={() => this.toUserShowPage(this.props.comment.user_id)}
          >
            <div style={{ width: "50px", height: "50px" }}>
              <UserIcon iconData={this.props.comment.icon_name} />
            </div>
          </Button>
        </div>
        <div style={{ float: "left", width: "80%" }}>
          <div style={{ marginTop: "10px" }}>
            {this.props.comment.user_name}
          </div>
          {commentDisplay}
        </div>
        <div style={{ clear: "both" }}></div>
      </React.Fragment>
    );
  }
}

export default withRouter(Comment);
