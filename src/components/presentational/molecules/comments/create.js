import React, { Component } from "react";
import { connect } from "react-redux";
import { postComment } from "../../../../actions/comment";
import { reduxForm } from "redux-form";
import getLoginUserInfo from "../../../../modules/getLoginUserInfo";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

class CommentNew extends Component {
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

  // 入力欄のチェック
  handleChange(e) {
    this.setState({ inputComment: e.target.value });
    if (e.target.value.match(/\S/g)) {
      this.setState({ commentCheck: false });
    } else {
      this.setState({ commentCheck: true });
    }
  }

  // コメント入力フォーム
  renderCreateComment(loginUserName) {
    const { handleSubmit, submitting } = this.props;
    return (
      <div>
        <div>コメント入力欄</div>
        <form id="create-comment-form" onSubmit={handleSubmit(this.onSubmit)}>
          {loginUserName}

          <TextareaAutosize
            aria-label="comment"
            rowsMin={3}
            rowsMax={20}
            placeholder="1000文字以内"
            onChange={this.handleChange}
          />

          <input
            type="submit"
            value="Submit"
            disabled={this.state.commentCheck || submitting}
          />
        </form>
      </div>
    );
  }

  render() {
    const loginUser = getLoginUserInfo();
    const loginUserName = loginUser.userName;
    return <div>{this.renderCreateComment(loginUserName)}</div>;
  }
}

const mapDispatchToProps = { postComment };

const mapStateToProps = "";

// connect 第一引数はcomponentに渡すpropsを制御する
// 第二引数はreducerを呼び出して、reduxで管理しているstateを更新する
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "commentNew Form" })(CommentNew));
