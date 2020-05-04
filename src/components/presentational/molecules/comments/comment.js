import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import UserIcon from "Atoms/user_icon";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import { deleteComment } from "Actions/comment";
import CommentEdit from "./edit";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.toUserShowPage = this.toUserShowPage.bind(this);
    this.state = { isEdited: false };
  }

  toUserShowPage(userID) {
    this.props.history.push("/api/users/" + userID);
  }

  // 記事の削除
  onDeleteClick() {
    this.props.deleteComment(
      this.props.comment.article_id,
      this.props.comment.comment_id,
      this.props.index
    );
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
    // 削除ボタン
    let deleteButton;
    if (this.props.loginUserName === this.props.comment.user_name) {
      deleteButton = (
        <div>
          <Button onClick={() => this.onDeleteClick()}>削除</Button>
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
    if (this.props.loginUserName === this.props.comment.user_name) {
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

const mapDispatchToProps = { deleteComment };

const mapStateToProps = "";

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(reduxForm({ form: "commentForm" })(Comment))
);
