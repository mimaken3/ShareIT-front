import React, { Component } from "react";
import Select from "react-select";

// トピックのセレクトボックス
class TopicSelectBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
      isChosen: false,
    };
  }

  // 送信するトピックを取得
  getSendTopics(initTopicsStr) {
    let isChosen = this.state.isChosen;
    let choseTopicsArr = this.state.selectedOption;

    let topic = "";
    let sendTopicsStr = "";

    // トピックを更新(送信用)
    if (isChosen) {
      if (!choseTopicsArr) {
        // セレクトボックスが空の場合
        sendTopicsStr = "その他";
      } else {
        for (let i = 0; i < choseTopicsArr.length; i++) {
          topic = choseTopicsArr[i].label;
          sendTopicsStr += topic + "/";
        }
      }
    } else {
      // もともとの記事トピックを入れる
      sendTopicsStr = initTopicsStr;
    }

    return sendTopicsStr;
  }

  // 選択されたtopicを設定
  handleChange = (selectedOption) => {
    this.setState({ selectedOption, isChosen: true });
  };

  // 全トピックをセット
  setAllTopics = (allTopics) => {
    //   // object to array
    const allTopicsArr = [];
    const topicObjArr = Object.values(allTopics);

    for (let i = 0; i < topicObjArr.length; i++) {
      allTopicsArr.push({
        value: topicObjArr[i].topic_id,
        label: topicObjArr[i].topic_name,
      });
    }
    return allTopicsArr;
  };

  // 初期表示トピックをセット
  setInitTopics = (allTopicsArr, initTopics) => {
    let topicsUserArr = initTopics.split("/");
    let initTopicsArr = [];

    for (let i = 0; i < topicsUserArr.length; i++) {
      for (let j = 0; j < allTopicsArr.length; j++) {
        if (topicsUserArr[i] === allTopicsArr[j].label) {
          initTopicsArr.push(allTopicsArr[j]);
        }
      }
    }
    return initTopicsArr;
  };

  render() {
    // 全トピックをセット
    let allTopicsArr = this.setAllTopics(this.props.allTopics);

    // 初期表示トピックをセット
    let initTopicsArr = this.setInitTopics(allTopicsArr, this.props.initTopics);
    let TopicSelectBox;
    if (this.props.param === "search") {
      TopicSelectBox = (
        <Select
          name="select-test-name"
          onChange={this.handleChange}
          options={allTopicsArr}
          placeholder="トピックを選択して下さい"
          defaultValue={initTopicsArr}
        />
      );
    } else {
      TopicSelectBox = (
        <Select
          name="select-test-name"
          onChange={this.handleChange}
          options={allTopicsArr}
          isMulti
          placeholder="トピックを選択して下さい"
          defaultValue={initTopicsArr}
        />
      );
    }
    return <div>{TopicSelectBox}</div>;
  }
}

export default TopicSelectBox;
