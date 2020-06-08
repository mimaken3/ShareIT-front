import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Loading from "Templates/loading";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import ScrollToTopOnMount from "Atoms/scroll_to_top_on_mount";
import UnauthorizedPage from "Atoms/unauthorized_page";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import { getTopicsByUserID, postTopic } from "Actions/topic";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Count from "Atoms/count";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import axios from "axios";
import env from "env";
import ResultTopicNameDuplicationCheck from "Atoms/topics/name_check";
import TopicTable from "Organisms/topics/table";

const ROOT_URL = env.ROOT_URL;

const CancelToken = axios.CancelToken;
let cancel;

// トピック管理ページ
class TopicsIndex extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      loading: true,
      isAuth: false,
      inputTopicName: "",
      topicNameTouched: false,
      isTopicNameError: true,
      topicNameError: "",
      submitting: false,
      isDuplicated: false,
      isInputTopicNameEmpty: true,
      message: "",
      checkLoading: true,
    };
  }

  // トピック名のチェック
  handleChange(e) {
    this.setState({
      checkLoading: true,
      topicNameTouched: true,
      isTopicNameError: true,
      isInputTopicNameEmpty: false,
    });

    const topic = e.target.value;
    if (topic === "") {
      this.setState({ isInputTopicNameEmpty: true, inputTopicName: topic });
    } else if (topic.match(/\S/g) && topic.length >= 30) {
      this.setState({
        inputTopicName: topic,
        topicNameError: "トピック名は30文字以内です",
      });
    } else {
      this.setState({ topicNameError: "" });
      // トピック名の重複チェック
      this.setState({ inputTopicName: topic }, () => {
        this.topicNameDuplicationCheck();
      });
    }
  }

  // トピック名の重複チェック
  topicNameDuplicationCheck() {
    const topicInfo = {
      topic_name: this.state.inputTopicName,
    };

    // 重複チェック
    if (cancel) {
      cancel();
    }

    const loginUserInfo = getLoginUserInfo();
    axios
      .post(
        `${ROOT_URL}/api/topics/check`,
        topicInfo,
        loginUserInfo.sendConfig,
        {
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          }),
        }
      )
      .then((response) => {
        const isDuplicated = response.data.is_duplicated;

        if (!isDuplicated) {
          this.setState({ isTopicNameError: false });
        }
        this.setState({
          checkLoading: false,
          isDuplicated: response.data.is_duplicated,
          message: response.data.message,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  // トピック作成
  async onSubmit() {
    this.setState({ submitting: true });

    const loginUserInfo = getLoginUserInfo();
    const topicObj = {
      proposed_user_id: loginUserInfo.userID,
      topic_name: this.state.inputTopicName,
    };

    // 作成
    await this.props.postTopic(topicObj);

    // コメントの入力欄を空に
    document.getElementById("create-topic-form").reset();
    this.setState({
      inputTopicName: "",
      isInputTopicNameEmpty: true,
      submitting: false,
    });
  }

  componentDidMount() {
    const loginUserInfo = getLoginUserInfo();
    const loginUserID = loginUserInfo.userID;

    if (parseInt(this.props.pageUserID) === loginUserID) {
      this.setState({ isAuth: true });
      this.props.getTopicsByUserID(loginUserID).then(() => {
        this.setState({ loading: false });
      });
    } else {
      this.setState({ loading: false });
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

    if (this.state.loading) {
      return (
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <ScrollToTopOnMount />
          <Loading />
        </Container>
      );
    } else {
      if (this.state.isAuth) {
        // トピック名の入力 or 重複チェックの結果
        let topicNameResult;
        if (this.state.topicNameTouched && !this.state.isInputTopicNameEmpty) {
          if (this.state.topicNameError) {
            topicNameResult = <>{this.state.topicNameError}</>;
          } else {
            topicNameResult = (
              <div>
                <ResultTopicNameDuplicationCheck
                  isDuplicated={this.state.isDuplicated}
                  message={this.state.message}
                  checkLoading={this.state.checkLoading}
                />
              </div>
            );
          }
        }

        let createTopic = (
          <>
            <form id="create-topic-form">
              <TextField
                id="standard-multiline-flexible"
                label="トピック名を入力して下さい"
                onChange={(e) => this.handleChange(e)}
                style={{ minWidth: "280px", width: "100%" }}
                color="secondary"
                value={this.state.inputTopicName}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ color: "white", float: "right", marginTop: "5px" }}
                disabled={
                  this.state.isTopicNameError ||
                  this.state.submitting ||
                  !this.state.topicNameTouched ||
                  this.state.isInputTopicNameEmpty
                }
                onClick={this.onSubmit}
                startIcon={<SendIcon />}
              >
                作成
              </Button>
            </form>
            {topicNameResult}
          </>
        );

        if (this.props.isEmpty) {
          // 管理するトピックがない場合
          return (
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                <h3>自分自身でトピックを作成して管理することができます</h3>
              </div>
              <div style={{ marginTop: "30px" }}>{createTopic}</div>
            </ThemeProvider>
          );
        } else {
          return (
            <ThemeProvider theme={theme}>
              {/* <Container component="main" maxWidth="sm"> */}
              <CssBaseline />
              <div style={{ marginTop: "10px" }}>
                <TopicTable topics={this.props.topics} />
              </div>
              <div style={{ marginTop: "30px" }}>{createTopic}</div>
              {/* </Container> */}
            </ThemeProvider>
          );
        }
      } else {
        return (
          // 別ユーザ(admin以外)がアクセスしようとした場合
          <>
            <UnauthorizedPage page="articles" />
          </>
        );
      }
    }
  }
}

const mapDispatchToProps = { getTopicsByUserID, postTopic };

const mapStateToProps = (state, ownProps) => {
  const isEmpty = state.topicManagement.is_empty;
  const topics = state.topicManagement.topics;
  const pageUserID = ownProps.match.params.userId;

  return {
    pageUserID,
    isEmpty,
    topics,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "TopicsIndexForm" })(TopicsIndex));
