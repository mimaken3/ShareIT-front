import React, { Component } from "react";
import { connect } from "react-redux";
import { updateComment } from "../../../../actions/comment";
import { reduxForm } from "redux-form";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

class CommentEdit extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      inputComment: "",
      commentCheck: false,
    };
  }

  async onSubmit() {
    const commentObj = {
      article_id: this.props.comment.article_id,
      comment_id: this.props.comment.comment_id,
      content: this.state.inputComment,
    };

    // 更新
    await this.props.updateComment(commentObj, this.props.index).then(() => {
      // 編集フォームをオフにする
      this.props.callback();
    });
  }

  // 入力欄のチェック
  handleChange(e) {
    const content = e.target.value;

    this.setState({ inputComment: content });
    if (content.match(/\S/g) && content.length < 1000) {
      this.setState({ commentCheck: false });
    } else {
      this.setState({ commentCheck: true });
    }
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form id="create-comment-form" onSubmit={handleSubmit(this.onSubmit)}>
        <TextareaAutosize
          aria-label="comment"
          rowsMin={3}
          rowsMax={20}
          placeholder="1000文字以内"
          defaultValue={this.props.comment.content}
          onChange={this.handleChange}
        />

        <input
          type="submit"
          value="Submit"
          disabled={this.state.commentCheck || submitting}
        />
      </form>
    );
  }
}

const mapDispatchToProps = { updateComment };

const mapStateToProps = "";

// connect 第一引数はcomponentに渡すpropsを制御する
// 第二引数はreducerを呼び出して、reduxで管理しているstateを更新する
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "commentEditForm" })(CommentEdit));
