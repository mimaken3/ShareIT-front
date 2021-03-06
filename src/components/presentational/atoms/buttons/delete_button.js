import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { deleteComment } from "Actions/comment";
import { deleteTopic } from "Actions/topic";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { deleteUserEvent } from "Actions/user";
import { deleteEvent } from "Actions/article";
import DeleteIcon from "@material-ui/icons/Delete";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

// 削除ボタン
class DeleteButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isEdited: false, open: false };
  }

  // 削除を実行
  onDeleteClick() {
    if (this.props.param === "comment") {
      // コメントを削除
      const articleID = this.props.sendObj.articleID;
      const commentID = this.props.sendObj.commentID;
      const index = this.props.sendObj.index;
      this.props.deleteComment(articleID, commentID, index);
      this.setState({ open: false });
    } else if (this.props.param === "user") {
      // ユーザを削除
      this.props.deleteUserEvent(this.props.sendObj.user).then(() => {
        this.props.history.push("/login");
      });
    } else if (this.props.param === "article") {
      // 記事を削除
      const articleID = this.props.sendObj.articleID;
      this.props.deleteEvent(articleID).then(() => {
        this.props.history.push("/articles");
      });
    } else if (this.props.param === "topic") {
      const topicID = this.props.sendObj.topicID;

      // トピックを削除
      this.props.deleteTopic(topicID).then(() => {
        this.setState({ open: false });
      });
    }
  }

  // ダイアログを表示
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  // ダイアログを非表示
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const theme = createMuiTheme({});

    let param;
    if (this.props.param === "comment") {
      param = "コメント";
    } else if (this.props.param === "user") {
      param = "ユーザ";
    } else if (this.props.param === "article") {
      param = "記事";
    } else if (this.props.param === "topic") {
      param = "トピック";
    }
    return (
      <ThemeProvider theme={theme}>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => this.handleClickOpen()}
        >
          削除
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {param}を削除してもよろしいですか？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary">
              いいえ
            </Button>
            <Button
              onClick={() => this.onDeleteClick()}
              color="primary"
              autoFocus
            >
              はい
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
  }
}

const mapDispatchToProps = {
  deleteComment,
  deleteUserEvent,
  deleteEvent,
  deleteTopic,
};

const mapStateToProps = "";

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(reduxForm({ form: "deleteButtonForm" })(DeleteButton))
);
