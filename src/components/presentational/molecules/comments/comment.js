import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import UserIcon from "../../../presentational/atoms/user_icon";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import { deleteComment } from "../../../../actions/comment";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.toUserShowPage = this.toUserShowPage.bind(this);
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

  render() {
    let deleteButton;
    if (this.props.loginUserName === this.props.comment.user_name) {
      deleteButton = (
        <div>
          <Button onClick={() => this.onDeleteClick()}>削除</Button>
        </div>
      );
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
          <div>コメント {this.props.comment.content}</div>
          {deleteButton}
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
