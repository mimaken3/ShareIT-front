import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { reduxForm } from "redux-form";
import Comment from "../../presentational/molecules/comments/comment";
// import Paging from "../../presentational/atoms/paging";
// import getLoginUserInfo from "../../../modules/getLoginUserInfo";
import { postComment } from "../../../actions/comment";
import getLoginUserInfo from "../../../modules/getLoginUserInfo";

class AllComments extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      inputComment: "",
      commentCheck: true,
    };
  }

  async onSubmit() {
    const commentObj = {
      articleID: this.props.articleID,
      comment: this.state.inputComment,
    };

    // 投稿
    await this.props.postComment(commentObj);

    // コメントの入力欄を空に
    document.getElementById("create-comment-form").reset();
    this.setState({ inputComment: "", commentCheck: true });
  }

  handleChange(e) {
    this.setState({ inputComment: e.target.value });
    if (e.target.value.match(/\S/g)) {
      this.setState({ commentCheck: false });
    } else {
      this.setState({ commentCheck: true });
    }
  }

  // コメントを表示する関数
  renderComments() {
    return _.map(this.props.comments, (comment) => (
      <div key={comment.comment_id}>
        <Comment comment={comment} />
      </div>
    ));
  }

  render() {
    const { handleSubmit } = this.props;
    const loginUser = getLoginUserInfo();
    const loginUserName = loginUser.userName;
    if (Object.values(this.props.comments).length !== 0) {
      return (
        <React.Fragment>
          <div>コメント欄</div>
          {this.renderComments()}

          {/* コメント入力フォーム */}
          <div>コメント入力欄</div>
          <form id="create-comment-form" onSubmit={handleSubmit(this.onSubmit)}>
            {loginUserName}

            <input
              type="text"
              placeholder="1000文字以内"
              defaultValue={this.state.inputComment}
              onChange={this.handleChange}
            />

            <input
              type="submit"
              value="Submit"
              disabled={this.state.commentCheck}
            />
          </form>
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
