import React, { Component } from "react";
import { connect } from "react-redux";
import { updateComment } from "Actions/comment";
import { reduxForm } from "redux-form";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Count from "Atoms/count";

class CommentEdit extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      inputComment: "",
      commentCheck: false,
      submitting: false,
    };
  }

  componentDidMount() {
    this.setState({ inputComment: this.props.comment.content });
  }

  async onSubmit() {
    this.setState({ submitting: true });
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
    if (content.match(/\S/g) && content.length <= 999) {
      this.setState({ commentCheck: false });
    } else {
      this.setState({ commentCheck: true });
    }
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: "#00CCFF", // 水色
        },
        secondary: {
          main: "#888888", // グレー
        },
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <TextField
          id="standard-multiline-flexible"
          multiline
          rowsMax={10}
          onChange={this.handleChange}
          style={{ minWidth: "280px", width: "100%" }}
          color="secondary"
          defaultValue={this.props.comment.content}
        />

        <Button
          variant="contained"
          color="primary"
          style={{ color: "white", float: "right", marginTop: "5px" }}
          disabled={this.state.commentCheck || this.state.submitting}
          onClick={this.onSubmit}
          startIcon={<SendIcon />}
        >
          更新
        </Button>
        <span
          style={{
            marginRight: "10px",
            marginTop: "10px",
            float: "right",
          }}
        >
          <Count text={this.state.inputComment} param="comment" />
        </span>
      </ThemeProvider>
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
