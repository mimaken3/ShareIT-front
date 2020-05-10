import React, { Component } from "react";
import UserIcon from "Atoms/user_icon";
import Button from "@material-ui/core/Button";
import CommentEdit from "./edit";
import DeleteButton from "Atoms/buttons/delete_button";
import getLoginUserInfo from "Modules/getLoginUserInfo";

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
          <div>
            <Button onClick={() => this.onEditCancel()}>キャンセル</Button>
          </div>
        </div>
      );
    } else {
      commentDisplay = (
        <div>
          <div>コメント {this.props.comment.content}</div>
        </div>
      );
    }

    let editButton;
    if (this.props.loginUserName === this.props.comment.user_name || isAdmin) {
      editButton = <Button onClick={() => this.editComment()}>編集</Button>;
    }

    return (
      <React.Fragment>
        <div>
          <Button
            onClick={() => this.toUserShowPage(this.props.comment.user_id)}
          >
            <UserIcon iconData={this.props.comment.icon_name} />
          </Button>
          <div>ユーザ名 {this.props.comment.user_name}</div>
          <div>{commentDisplay}</div>
          <div>{editButton}</div>
          <div>{deleteButton}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Comment;
