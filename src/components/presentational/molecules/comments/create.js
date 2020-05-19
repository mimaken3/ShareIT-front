import React, { Component } from "react";
import { connect } from "react-redux";
import { postComment } from "Actions/comment";
import { reduxForm } from "redux-form";
import UserIcon from "Atoms/user_icon";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import SendIcon from "@material-ui/icons/Send";

class CommentNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      inputComment: "",
      commentCheck: true,
      submitting: false,
    };
  }

  async onSubmit() {
    this.setState({ submitting: true });
    const commentObj = {
      articleID: this.props.articleID,
      comment: this.state.inputComment,
    };

    // 投稿
    await this.props.postComment(commentObj);

    // コメントの入力欄を空に
    document.getElementById("create-comment-form").reset();
    this.setState({ inputComment: "", commentCheck: true, submitting: false });
  }

  // 入力欄のチェック
  handleChange(e) {
    const content = e.target.value;

    this.setState({ inputComment: content });
    if (content.match(/\S/g) && content.length <= 1000) {
      this.setState({ commentCheck: false });
    } else {
      this.setState({ commentCheck: true });
    }
  }

  // コメント入力フォーム
  renderCreateComment() {
    const loginUserIconURL = localStorage.getItem("login_user_icon_URL");

    // コメントの文字数表示
    let CommentCount;
    if (this.state.inputComment.length > 1000) {
      CommentCount = (
        <React.Fragment>
          <span style={{ color: "red" }}>{this.state.inputComment.length}</span>
          /1000 文字
        </React.Fragment>
      );
    } else {
      CommentCount = (
        <React.Fragment>
          {this.state.inputComment.length}/1000 文字
        </React.Fragment>
      );
    }

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
        <form id="create-comment-form">
          <div style={{ marginTop: "30px" }}>
            <div style={{ float: "left", width: "100%" }}>
              <div style={{ width: "50px", height: "50px", float: "left" }}>
                <UserIcon iconData={loginUserIconURL} />
              </div>

              <div style={{ float: "left", marginLeft: "5px", width: "85%" }}>
                <TextField
                  id="standard-multiline-flexible"
                  label="コメント"
                  multiline
                  rowsMax={10}
                  onChange={this.handleChange}
                  style={{ minWidth: "280px", width: "100%" }}
                  color="secondary"
                  value={this.state.inputComment}
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ color: "white", float: "right", marginTop: "5px" }}
                  disabled={this.state.commentCheck || this.state.submitting}
                  onClick={this.onSubmit}
                  startIcon={<SendIcon />}
                >
                  送信
                </Button>
                <span
                  style={{
                    float: "right",
                    marginRight: "10px",
                    marginTop: "10px",
                  }}
                >
                  {CommentCount}
                </span>
              </div>
            </div>

            <div style={{ clear: "both" }}></div>
          </div>
        </form>
      </ThemeProvider>
    );
  }

  render() {
    return <div>{this.renderCreateComment()}</div>;
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
