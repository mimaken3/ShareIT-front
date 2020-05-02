import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { reduxForm } from "redux-form";
import Comment from "../../presentational/molecules/comments/comment";
import { postComment } from "../../../actions/comment";
import getLoginUserInfo from "../../../modules/getLoginUserInfo";

class AllComments extends Component {
  // コメントを表示する関数
  renderComments(loginUserName) {
    return _.map(this.props.comments, (comment, index) => (
      <div key={index}>
        <Comment
          comment={comment}
          loginUserName={loginUserName}
          index={index}
        />
      </div>
    ));
  }

  render() {
    const loginUser = getLoginUserInfo();
    const loginUserName = loginUser.userName;
    if (Object.values(this.props.comments).length !== 0) {
      return (
        <React.Fragment>
          <div>コメント欄</div>
          {this.renderComments(loginUserName)}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div>コメント欄</div>
          <div>コメントはありません</div>
        </React.Fragment>
      );
    }
  }
}

const mapDispatchToProps = { postComment };

const mapStateToProps = (state) => {
  return { comments: state.comments };
};

// connect 第一引数はcomponentに渡すpropsを制御する
// 第二引数はreducerを呼び出して、reduxで管理しているstateを更新する
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "allCommentsForm" })(AllComments));
