import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import { postTopic } from "Actions/topic";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Count from "Atoms/count";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import env from "env";
import ResultTopicNameDuplicationCheck from "Atoms/topics/name_check";

const ROOT_URL = env.ROOT_URL;

const CancelToken = axios.CancelToken;
let cancel;

// トピック作成
class CreateTopic extends Component {
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

    if (!topic.match(/\S/g)) {
      // \S は空白以外の文字
      // 空、もしくはスペースのみ
      this.setState({ isInputTopicNameEmpty: true, inputTopicName: topic });
    } else if (topic.match(/\S/g) && topic.length <= 30) {
      // 空白以外の文字が含まれる かつ 30文字以内
      this.setState({ topicNameError: "" });
      // トピック名の重複チェック
      this.setState({ inputTopicName: topic }, () => {
        this.topicNameDuplicationCheck();
      });
    } else if (topic.length > 30) {
      this.setState({
        inputTopicName: topic,
        topicNameError: "トピック名は30文字以内です",
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

  render() {
    // トピック名の入力 or 重複チェックの結果
    let topicNameResult;
    if (this.state.topicNameTouched && !this.state.isInputTopicNameEmpty) {
      if (this.state.topicNameError) {
        topicNameResult = (
          <>
            <span style={{ color: "red" }}>{this.state.topicNameError}</span>
          </>
        );
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

    return (
      <>
        <span style={{ fontSize: "initial" }}>トピックを作成</span>
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
          <span style={{ marginRight: "5px", float: "right" }}>
            <Count text={this.state.inputTopicName} param="topic" />
          </span>
        </form>
        {topicNameResult}
      </>
    );
  }
}

const mapDispatchToProps = { postTopic };

const mapStateToProps = "";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "CreateTopicForm" })(CreateTopic));
