import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import env from "env";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import ResultTopicNameDuplicationCheck from "Atoms/topics/name_check";

const ROOT_URL = env.ROOT_URL;

const CancelToken = axios.CancelToken;
let cancel;

class TopicNameEdit extends Component {
  constructor(props) {
    super(props);
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
      sameName: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      checkLoading: true,
      topicNameTouched: true,
      isTopicNameError: true,
      isInputTopicNameEmpty: false,
    });

    const topic = e.target.value;

    // 親コンポーネントの関数にトピック名をセット
    this.props.changeTopicName(topic);

    if (topic === this.props.topicName) {
      // 既存のトピック名と同じだった場合
      this.setState({ isTopicNameError: true, sameName: true });

      // 更新ボタンを非活性化
      this.props.topicNameError();
    } else {
      this.setState({ sameName: false });
      if (!topic.match(/\S/g)) {
        // \S は空白以外の文字
        // 空、もしくはスペースのみ
        this.setState({ isInputTopicNameEmpty: true, inputTopicName: topic });

        // 更新ボタンを非活性化
        this.props.topicNameError();
      } else if (topic.match(/\S/g) && topic.length <= 30) {
        // 空白以外の文字が含まれる かつ 30文字以内
        this.setState({ topicNameError: "" });
        // トピック名の重複チェック
        this.setState({ inputTopicName: topic }, () => {
          this.topicNameDuplicationCheck();
        });
      } else if (topic.length > 30) {
        // 更新ボタンを非活性化
        this.props.topicNameError();

        this.setState({
          inputTopicName: topic,
          topicNameError: "トピック名は30文字以内です",
        });
      }
    }
  };

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

        if (isDuplicated) {
          // 更新ボタンを非活性化
          this.props.topicNameError();
        } else {
          // 更新ボタンを活性化
          this.props.nonTopicNameError();
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

  render() {
    const { topicName } = this.props;
    // トピック名の入力 or 重複チェックの結果
    let topicNameResult;
    if (
      this.state.topicNameTouched &&
      !this.state.isInputTopicNameEmpty &&
      !this.state.sameName
    ) {
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
              styles={{ fontSize: "smaller" }}
            />
          </div>
        );
      }
    }
    return (
      <>
        <TextField
          onChange={this.handleChange}
          style={{ width: "100%" }}
          color="secondary"
          defaultValue={topicName}
        />
        {topicNameResult}
      </>
    );
  }
}

export default TopicNameEdit;
