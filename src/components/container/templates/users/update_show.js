import React, { Component } from "react";
import { connect } from "react-redux";
import CreatedDate from "Atoms/created_date";
import { reduxForm } from "redux-form";
import { getAllTopics } from "Actions/topic";
import { getUserDetail, putUserEvent } from "Actions/user";
import Button from "@material-ui/core/Button";
import Loading from "Templates/loading";
import TopicSelectBox from "Atoms/topic_select_box";
import UnauthorizedPage from "Atoms/unauthorized_page";
import EditUserIcon from "Molecules/edit_user_icon";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import DeleteButton from "Atoms/buttons/delete_button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import BackButton from "Atoms/buttons/back";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import SendIcon from "@material-ui/icons/Send";
import Count from "Atoms/count";
import ScrollToTopOnMount from "Atoms/scroll_to_top_on_mount";

class UserUpdateShow extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleProfileChange = this.handleProfileChange.bind(this);
    this.state = {
      textbox: "",
      textBoxFlag: false,
      isTouch: false,
      loading: true,
      submitting: false,
      // プロフィール
      profile: "",
      isProfileError: false,
    };
  }

  componentDidMount() {
    // 全トピックの取得
    this.props.getAllTopics();

    // ユーザ情報を取得
    const { userId } = this.props.match.params;
    if (userId)
      this.props.getUserDetail(userId).then(() => {
        this.setState({ profile: this.props.user.profile, loading: false });
      });
  }

  // ユーザ情報を更新して送信
  async onSubmit() {
    this.setState({ submitting: true });

    let user = {
      user_id: this.props.user.user_id,
      user_name: this.props.user.user_name,
      icon_name: this.props.user.icon_name,
      created_date: this.props.user.created_date,
      interested_topics: this.refs.TopicSelectBox.getSendTopics(
        this.props.user.interested_topics
      ),
      profile: this.state.profile,
    };

    // ユーザのアイコンをセット
    let iconImage = this.refs.EditUserIcon.getUserIcon();

    // 更新
    await this.props.putUserEvent(user, iconImage);

    // 更新ボタンを押した後に遷移するURL
    this.props.history.push("/users/" + this.props.user.user_id);
  }

  // プロフィールの入力チェック
  handleProfileChange(e) {
    if (e.target.value.length > 999) {
      this.setState({
        profile: e.target.value,
        isProfileError: true,
      });
    } else {
      this.setState({ profile: e.target.value, isProfileError: false });
    }
  }

  render() {
    if (
      this.props.user &&
      Object.values(this.props.allTopics).length !== 0 &&
      !this.state.loading
    ) {
      const loginUserInfo = getLoginUserInfo();
      const loginUserID = loginUserInfo.userID;
      const isAdmin = loginUserInfo.admin;
      if (loginUserID !== this.props.user.user_id && !isAdmin) {
        // 別ユーザがアクセスしようとした場合
        return (
          <React.Fragment>
            <UnauthorizedPage page="users" />
          </React.Fragment>
        );
      } else {
        // 全トピック
        const allTopics = this.props.allTopics;

        // 初期表示トピック
        const initTopics = this.props.user.interested_topics;

        const sendObj = { user: this.props.user };

        // 戻る先のURL
        const backURL = "/users/" + this.props.user.user_id;

        const theme = createMuiTheme({
          palette: {
            primary: {
              main: "#888888", // グレー
            },
            secondary: {
              main: "#00CCFF", // 水色
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

        return (
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <ScrollToTopOnMount />

              <div className={this.props.classes.editUserIcon}>
                <EditUserIcon
                  defaultIconURL=""
                  icon={this.props.user.icon_name}
                  ref="EditUserIcon"
                />
              </div>

              <div className={this.props.classes.userName}>
                {this.props.user.user_name}
              </div>

              <div className={this.props.classes.interestedTopics}>
                興味のあるトピック
                <TopicSelectBox
                  allTopics={allTopics}
                  initTopics={initTopics}
                  ref="TopicSelectBox"
                />
              </div>

              <div className={this.props.classes.profile}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="outlined-multiline-static"
                  label="プロフィール *任意"
                  multiline
                  rows={4}
                  value={this.state.profile}
                  onChange={(e) => this.handleProfileChange(e)}
                />
                <Count text={this.state.profile} param="profile" />
              </div>

              <div className={this.props.classes.stopFloat}></div>

              <div>
                <span>作成日時 </span>
                <CreatedDate createdDate={this.props.user.created_date} />
              </div>

              <div className={this.props.classes.backAndDeleteButton}>
                <div className={this.props.classes.backButton}>
                  <BackButton backURL={backURL} />
                </div>

                <div className={this.props.classes.deleteButton}>
                  <DeleteButton param="user" sendObj={sendObj} />
                </div>
              </div>

              <div className={this.props.classes.stopFloat}></div>

              <Button
                onClick={this.onSubmit}
                variant="contained"
                color="secondary"
                className={this.props.classes.updateButton}
                disabled={this.state.isProfileError || this.state.submitting}
                startIcon={<SendIcon />}
              >
                更新
              </Button>
            </Container>
          </ThemeProvider>
        );
      }
    } else {
      return (
        <React.Fragment>
          <CssBaseline />
          <ScrollToTopOnMount />

          <Loading />
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  // 全トピック
  const allTopics = state.topics;

  // 更新するユーザ情報
  const user = state.users.users[ownProps.match.params.userId];

  // 初期状態でどんな値を表示するかをinitialValuesで設定
  return {
    initialValues: user,
    user: user,
    allTopics: allTopics,
  };
};
const mapDispatchToProps = { getAllTopics, getUserDetail, putUserEvent };

const styles = (theme) => ({
  editUserIcon: {
    textAlign: "center",
    marginTop: "20px",
  },
  userName: {
    marginTop: "20px",
    textAlign: "center",
  },
  interestedTopics: {
    marginTop: "20px",
  },
  profile: {
    marginTop: "20px",
  },
  stopFloat: {
    clear: "both",
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
  },
  backButton: {
    float: "left",
    marginRight: "5px",
  },
  deleteButton: {
    float: "left",
  },
  backAndDeleteButton: {
    float: "left",
    marginTop: "10px",
    marginBottom: "20px",
    marginLeft: "8px",
  },
  updateButton: {
    color: "white",
    marginLeft: "8px",
  },
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: "userUpdateShowForm", enableReinitialize: true }),
  withStyles(styles)
)(UserUpdateShow);
