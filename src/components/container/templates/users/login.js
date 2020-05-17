import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { loginUserEvent } from "Actions/user";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { ThemeProvider } from "@material-ui/styles";

class Login extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      userName: "",
      userNameError: "",
      password: "",
      passwordError: "",
      userNameTouched: false,
      passwordTouched: false,
    };
  }

  static propTypes = {
    message: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  };

  // ログイン
  async onSubmit(values) {
    const userInfo = {
      user_name: this.state.userName,
      password: this.state.password,
    };
    // 送信
    await this.props.loginUserEvent(userInfo).then(() => {
      this.props.history.push("/api/articles");
    });
  }

  // ユーザ名を入力
  onChangeUserName = (e) => {
    this.setState({ userNameTouched: true });
    const userName = e.target.value;
    if (userName) {
      if (userName.length > 10 || userName.length < 2) {
        this.setState({ userNameError: "ユーザ名は2文字以上10文字以内です" });
      } else {
        this.setState({ userName: e.target.value });
        this.setState({ userNameError: "" });
      }
    } else {
      this.setState({ userNameError: "ユーザ名を入力して下さい" });
    }
  };

  // パスワードを入力
  onChangePassword = (e) => {
    this.setState({ passwordTouched: true });
    const password = e.target.value;
    if (password) {
      if (password.length > 16 || password.length < 8) {
        this.setState({ passwordError: "パスワードは8文字以上16文字以内です" });
      } else {
        this.setState({ password: e.target.value });
        this.setState({ passwordError: "" });
      }
    } else {
      this.setState({ passwordError: "パスワードを入力して下さい" });
    }
  };

  // アカウント作成画面へ
  toSignUpPage() {
    this.props.history.push("/signUp");
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    let loginFail;
    if (this.props.authFail && !this.state.touched) {
      loginFail = <div>ユーザ名、もしくはパスワードが間違っています</div>;
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
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={this.props.classes.paper}>
            <Avatar className={this.props.classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ログイン
            </Typography>
            <form
              onSubmit={handleSubmit(this.onSubmit)}
              className={this.props.classes.form}
            >
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="user_name"
                label="ユーザ名 *必須"
                name="user_name"
                autoComplete="user_name"
                disabled={submitting}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentityIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => this.onChangeUserName(e)}
              />
              <div className={this.props.classes.error}>
                {this.state.userNameError}
              </div>

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="パスワード *必須"
                type="password"
                id="password"
                disabled={submitting}
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpenIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => this.onChangePassword(e)}
              />
              <div className={this.props.classes.error}>
                {this.state.passwordError}
              </div>

              <div className={this.props.classes.error}>{loginFail}</div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ color: "white" }}
                className={this.props.classes.submit}
                disabled={
                  submitting ||
                  !(this.state.userNameError === "") ||
                  !(this.state.passwordError === "") ||
                  !this.state.passwordTouched ||
                  !this.state.userNameTouched
                }
              >
                ログイン
              </Button>
            </form>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              style={{ color: "white" }}
              onClick={() => this.toSignUpPage()}
            >
              アカウントを作成
            </Button>
          </div>
          {/* paper */}
        </Container>
      </ThemeProvider>
    );
  }
}

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.primary.light,
    backgroundColor: "#888888",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "red",
  },
});

const mapDispatchToProps = { loginUserEvent };

const mapStateToProps = (state) => {
  const authFail = state.users.auth_fail;
  const failUserInfo = state.users.users;

  return { authFail: authFail, failUserInfo: failUserInfo };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: "loginForm" }),
  withStyles(styles)
)(Login);
