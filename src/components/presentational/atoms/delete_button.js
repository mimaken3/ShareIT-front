import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { deleteComment } from "Actions/comment";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

// 削除ボタン
class DeleteButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isEdited: false, open: false };
  }

  // 削除を実行
  onDeleteClick() {
    if (this.props.param === "comment") {
      const articleID = this.props.sendObj.articleID;
      const commentID = this.props.sendObj.commentID;
      const index = this.props.sendObj.index;
      this.props.deleteComment(articleID, commentID, index);
      this.setState({ open: false });
    }
  }

  // ダイアログを表示
  handleClickOpen() {
    this.setState({ open: true });
  }

  // ダイアログを非表示
  handleClose() {
    this.setState({ open: false });
  }

  render() {
    let param;
    if (this.props.param === "comment") {
      param = "コメント";
    }
    return (
      <div>
        <div>
          <Button
            variant="outlined"
            color="primary"
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
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = { deleteComment };

const mapStateToProps = "";

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(reduxForm({ form: "deleteButtonForm" })(DeleteButton))
);
