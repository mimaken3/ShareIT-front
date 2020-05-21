import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { reduxForm } from "redux-form";
import { getAllTopics } from "Actions/topic";
import TopicSelectBox from "Atoms/topic_select_box";
import Loading from "Templates/loading";
import { postUserEvent } from "Actions/user";
import EditUserIcon from "Molecules/edit_user_icon";
import getIconURL from "Modules/getIconURL";
import env from "env";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import InputAdornment from "@material-ui/core/InputAdornment";
// import MailOutlineIcon from "@material-ui/icons/MailOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import ResultUserNameDuplicationCheck from "Atoms/users/name_check";
// import ResultEmailDuplicationCheck from "Atoms/users/email_check";
import Button from "@material-ui/core/Button";

const ROOT_URL = env.ROOT_URL;

const CancelToken = axios.CancelToken;
let cancel;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleProfileChange = this.handleProfileChange.bind(this);

    this.state = {
      // ユーザ名
      userName: "",
      userNameError: "",
      isUserNameError: true,
      resultUserNameDuplicationCheck: 2, // 2はチェック前の数値(0: 重複なし、1: 重複)
      userNameTouched: false,
      // メアド
      // email: "",
      // emailError: "",
      // isEmailError: true,
      // resultEmailDuplicationCheck: 2, // 2はチェック前の数値(0: 重複なし、1: 重複)
      // emailTouched: false,
      // パスワード
      password: "",
      passwordError: "",
      passwordTouched: false,
      // 確認用パスワード
      confirmPassword: "",
      confirmPasswordError: "",
      confirmPasswordTouched: false,
      // プロフィール
      profile: "",
      profileError: "",
      // アイコン
      defaultIconURL: null,
      textbox: "",
      textBoxFlag: false,
      imageSrc: null,
      crop: { x: 0, y: 0 },
      zoom: 1,
      aspect: 1 / 1,
      croppedAreaPixels: null,
      croppedImage: null,
      isCropping: false,
      croppedFile: null,
    };
  }

  componentDidMount() {
    // 全トピックの取得
    this.props.getAllTopics();

    // デフォルトアイコンのURLを取得
    getIconURL("default.png").then(
      (defaultIconURL) => {
        this.setState({ defaultIconURL: defaultIconURL });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // 入力されたユーザ名のチェック
  onChangeUserName = (e) => {
    this.setState({ userNameTouched: true });
    this.setState({ isUserNameError: true });
    const userName = e.target.value;
    if (userName) {
      if (userName.length > 10 || userName.length < 2) {
        this.setState({ userNameError: "ユーザ名は2文字以上10文字以内です" });
      } else {
        this.setState({ userNameError: "" });
        this.setState({
          // ユーザ名の重複チェック
          resultUserNameDuplicationCheck: 2,
        });
        this.setState({ userName }, () => {
          this.userDuplicationCheck();
        });
      }
    } else {
      this.setState({ userNameError: "ユーザ名を入力して下さい" });
    }
  };

  // ユーザ名の重複チェック
  userDuplicationCheck() {
    const userInfo = {
      user_name: this.state.userName,
      email: "",
    };

    // 重複チェック
    this.duplicationCheck("userName", userInfo);
  }

  // 入力されたメアドのチェック
  // onChangeEmail = (e) => {
  //   this.setState({ emailTouched: true });
  //   this.setState({ isEmailError: true });
  //   const email = e.target.value;
  //   if (email) {
  //     let regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  //     if (!regexp.test(email)) {
  //       this.setState({ emailError: "メールアドレスの書式が間違っています" });
  //     } else {
  //       this.setState({ emailError: "" });
  //       this.setState({
  //         resultEmailDuplicationCheck: 2,
  //       });
  //       this.setState({ email }, () => {
  //         // メアドの重複チェック
  //         this.emailDuplicationCheck();
  //       });
  //     }
  //   } else {
  //     this.setState({ emailError: "メールアドレスを入力して下さい" });
  //   }
  // };

  // メアドの重複チェック
  // emailDuplicationCheck(e) {
  //   // フォーカスが外れたときの処理
  //   const userInfo = {
  //     user_name: "",
  //     email: this.state.email,
  //   };
  //   // 重複チェック
  //   this.duplicationCheck("email", userInfo);
  // }

  // // 重複チェック
  duplicationCheck(checkName, userInfo) {
    if (cancel) {
      cancel();
    }

    axios
      .post(`${ROOT_URL}/signUp/check`, userInfo, {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
      })
      .then((response) => {
        if (checkName === "userName") {
          const num = response.data.result_user_name_num;
          if (num === 0) {
            this.setState({ isUserNameError: false });
          }
          this.setState({
            resultUserNameDuplicationCheck: num,
          });
        } else if (checkName === "email") {
          const num = response.data.result_email_num;
          if (num === 0) {
            this.setState({ isEmailError: false });
          }
          this.setState({
            resultEmailDuplicationCheck: response.data.result_email_num,
          });
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  // プロフィールの入力チェック
  handleProfileChange(e) {
    if (e.target.value.length > 1000) {
      this.setState({
        profile: e.target.value,
        profileError: "1000文字以内で入力して下さい",
      });
    } else {
      this.setState({ profile: e.target.value, profileError: "" });
    }
  }

  // パスワードの入力チェック
  onChangePassword(e) {
    this.setState({ passwordTouched: true });
    const password = e.target.value;
    if (password) {
      if (password.length > 16 || password.length < 8) {
        this.setState({ passwordError: "パスワードは8文字以上16文字以内です" });
      } else if (
        this.state.confirmPasswordTouched &&
        this.state.confirmPasswordError === "" &&
        !(password === this.state.confirmPassword)
      ) {
        // 正しい確認用パスワードを入力後、パスワードを変更したとき
        this.setState({
          confirmPasswordError: "パスワードと確認用パスワードが一致しません",
        });
      } else if (
        this.state.confirmPasswordError ===
          "パスワードと確認用パスワードが一致しません" &&
        password === this.state.confirmPassword
      ) {
        // 正しい確認用パスワードを入力後、パスワードを変更して、もし一致していたとき
        this.setState({
          confirmPasswordError: "",
        });
      } else {
        this.setState({ passwordError: "" });
        this.setState({ password });
      }
    } else {
      this.setState({ passwordError: "パスワードを入力して下さい" });
    }
  }

  // 確認用パスワードの入力チェック
  onChangeConfirmPassword(e) {
    this.setState({ confirmPasswordTouched: true });
    const confirmPassword = e.target.value;
    if (confirmPassword) {
      if (confirmPassword.length > 16 || confirmPassword.length < 8) {
        this.setState({
          confirmPasswordError: "パスワードは8文字以上16文字以内です",
        });
      } else if (!(this.state.password === confirmPassword)) {
        this.setState({
          confirmPasswordError: "パスワードと確認用パスワードが一致しません",
        });
      } else {
        this.setState({ confirmPasswordError: "" });
        this.setState({ confirmPassword });
      }
    } else {
      this.setState({ confirmPasswordError: "パスワードを入力して下さい" });
    }
  }

  // ユーザ情報を登録
  async onSubmit() {
    let user = {
      user_name: this.state.userName,
      // email: this.state.email,
      interested_topics: this.refs.TopicSelectBox.getSendTopics("その他"),
      profile: this.state.profile,
      password: this.state.password,
    };

    // ユーザのアイコンをセット
    let iconImage = this.refs.EditUserIcon.getUserIcon();

    // 登録
    await this.props.postUserEvent(user, iconImage);

    // 登録後の遷移先
    this.props.history.push("/login");
  }

  // ログイン画面へ
  toLoginPage() {
    this.props.history.push("/login");
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    if (
      Object.values(this.props.allTopics).length !== 0 &&
      this.state.defaultIconURL
    ) {
      // 全トピック
      const allTopics = this.props.allTopics;

      // 初期表示トピック
      const initTopics = "";

      const theme = createMuiTheme({
        palette: {
          primary: {
            main: "#00CCFF", // 水色
          },
          secondary: {
            main: "#888888", // グレー
          },
        },
        overrides: {
          // セレクトボックスを開いたとき、TextFieldの文字が被るのを
          // 防ぐため zIndex: 1 -> zIndex: 0
          MuiInputLabel: {
            outlined: {
              zIndex: 0,
            },
          },
        },
      });

      // ユーザ名の入力 or 重複チェックの結果
      let userNameResult;
      if (this.state.userNameTouched) {
        if (this.state.userNameError) {
          userNameResult = (
            <div className={this.props.classes.error}>
              {this.state.userNameError}
            </div>
          );
        } else {
          userNameResult = (
            <div>
              <ResultUserNameDuplicationCheck
                result={this.state.resultUserNameDuplicationCheck}
              />
            </div>
          );
        }
      }

      // メアドの入力 or 重複チェックの結果
      // let emailResult;
      // if (this.state.emailTouched) {
      //   if (this.state.emailError) {
      //     emailResult = (
      //       <div className={this.props.classes.error}>
      //         {this.state.emailError}
      //       </div>
      //     );
      //   } else {
      //     emailResult = (
      //       <div>
      //         <ResultEmailDuplicationCheck
      //           result={this.state.resultEmailDuplicationCheck}
      //         />
      //       </div>
      //     );
      //   }
      // }

      // プロフィールの入力チェック結果
      let profileResult;
      if (this.state.profileError) {
        profileResult = (
          <div className={this.props.classes.error}>
            {this.state.profileError}
          </div>
        );
      }

      // プロフィールの文字数表示
      let ProfileCount;
      if (this.state.profile.length > 1000) {
        ProfileCount = (
          <React.Fragment>
            <span style={{ color: "red" }}>{this.state.profile.length}</span>
            /1000 文字
          </React.Fragment>
        );
      } else {
        ProfileCount = (
          <React.Fragment>{this.state.profile.length}/1000 文字</React.Fragment>
        );
      }

      // パスワードの入力チェックの結果
      let passwordResult;
      if (this.state.passwordTouched) {
        if (this.state.passwordError) {
          passwordResult = (
            <div className={this.props.classes.error}>
              {this.state.passwordError}
            </div>
          );
        } else {
          passwordResult = (
            <div style={{ color: "#00EE00" }}>
              <CheckCircleOutlineIcon size={5} />
            </div>
          );
        }
      }

      // 確認用パスワードの入力チェックの結果
      let confirmPasswordResult;
      if (this.state.confirmPasswordTouched) {
        if (this.state.confirmPasswordError) {
          confirmPasswordResult = (
            <div className={this.props.classes.error}>
              {this.state.confirmPasswordError}
            </div>
          );
        } else {
          confirmPasswordResult = (
            <div style={{ color: "#00EE00" }}>
              <CheckCircleOutlineIcon size={5} />
            </div>
          );
        }
      }

      return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={this.props.classes.paper}>
              <Avatar className={this.props.classes.avatar}>
                <AccessibilityNewIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                ユーザ登録
              </Typography>
              <form
                onSubmit={handleSubmit(this.onSubmit)}
                className={this.props.classes.form}
              >
                <div style={{ textAlign: "center" }}>
                  <EditUserIcon
                    defaultIconURL=""
                    icon={this.state.defaultIconURL}
                    ref="EditUserIcon"
                  />
                </div>

                <div style={{ marginBottom: "10px" }}>
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
                  {userNameResult}
                </div>
                {/* <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="メールアドレス *必須"
                  name="email"
                  autoComplete="email"
                  disabled={submitting}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => this.onChangeEmail(e)}
                />
                {emailResult} */}
                <div>
                  興味のあるトピック *任意
                  <TopicSelectBox
                    allTopics={allTopics}
                    initTopics={initTopics}
                    ref="TopicSelectBox"
                  />
                </div>

                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="outlined-multiline-static"
                  label="プロフィール *任意"
                  multiline
                  rows={4}
                  onChange={(e) => this.handleProfileChange(e)}
                />
                <div style={{ float: "right" }}>{ProfileCount}</div>
                <div style={{ float: "left" }}>{profileResult}</div>

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
                {passwordResult}

                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="confirm_password"
                  label="確認用パスワード *必須"
                  type="password"
                  id="passwconfirm_passwordord"
                  disabled={submitting}
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpenIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => this.onChangeConfirmPassword(e)}
                />
                {confirmPasswordResult}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ color: "white" }}
                  className={this.props.classes.submit}
                  disabled={
                    submitting ||
                    this.state.isUserNameError ||
                    // this.state.isEmailError ||
                    !(this.state.profileError === "") ||
                    !(this.state.passwordError === "") ||
                    !(this.state.confirmPasswordError === "") ||
                    !this.state.passwordTouched ||
                    !this.state.confirmPasswordTouched
                  }
                >
                  登録
                </Button>
              </form>

              <Button
                fullWidth
                variant="contained"
                color="secondary"
                style={{ color: "white" }}
                onClick={() => this.toLoginPage()}
              >
                ログイン画面へ
              </Button>
            </div>
            {/* paper */}
          </Container>
        </ThemeProvider>
      );
    } else {
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Loading />
        </Container>
      );
    }
  }
}

const mapDispatchToProps = { getAllTopics, postUserEvent };

const mapStateToProps = (state) => {
  // 全トピック
  const allTopics = state.topics;

  return { allTopics: allTopics };
};

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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: "signUpForm" }),
  withStyles(styles)
)(SignUp);
