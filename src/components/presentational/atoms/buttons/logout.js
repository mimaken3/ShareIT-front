import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { LogoutUserEvent } from "Actions/user";

// ログアウトボタン
class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  // ログアウトを実行
  onLogoutClick() {
    this.props.LogoutUserEvent();
    this.props.history.push("/login");
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
    return (
      <React.Fragment>
        <Button
          style={{ color: this.props.fontColor, fontSize: 17 }}
          onClick={() => this.handleClickOpen()}
        >
          ログアウト
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ログアウトしてもよろしいですか？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary">
              いいえ
            </Button>
            <Button
              onClick={() => this.onLogoutClick()}
              color="primary"
              autoFocus
            >
              はい
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = { LogoutUserEvent };

const mapStateToProps = "";

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(reduxForm({ form: "logoutButtonForm" })(Logout))
);
