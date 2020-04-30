import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reduxForm } from "redux-form";
import Like from "../likes/like";
import UserIcon from "../../../presentational/atoms/user_icon";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.toUserShowPage = this.toUserShowPage.bind(this);
  }

  toUserShowPage(userID) {
    this.props.history.push("/api/users/" + userID);
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <div>コメントID {this.props.comment.comment_id}</div>
          <Button
            onClick={() => this.toUserShowPage(this.props.comment.user_id)}
          >
            <UserIcon iconData={this.props.comment.icon_name} />
          </Button>
          <div>ユーザ名 {this.props.comment.user_name}</div>
          <div>コメント {this.props.comment.content}</div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = "";

const mapStateToProps = "";

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(reduxForm({ form: "commentForm" })(Comment))
);
