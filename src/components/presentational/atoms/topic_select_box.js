import React, { Component } from "react";
import Select from "react-select";
import isNumber from "Modules/is_number";
import selectBoxStyles from "Atoms/select_box_styles";
import getNonDuplicationArr from "Modules/get_non_duplication_arr";

// トピックのセレクトボックス
class TopicSelectBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
      isChosen: false,
      error: null,
      allTopicsArr: null,
    };
  }

  componentDidMount() {
    // 全トピックをセット
    let allTopicsArr = this.setAllTopics(this.props.allTopics);
    this.setState({ allTopicsArr });

    // 初期表示トピックをセット
    let initTopicsArr = this.setInitTopics(allTopicsArr, this.props.initTopics);
    this.setState({ selectedOption: initTopicsArr });
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
    if (selectedOption !== null && Object.values(selectedOption).length > 6) {
      this.setState({ error: "登録できるトピックは6個までです" });
    } else {
      this.setState({ selectedOption, isChosen: true });
      this.setState({ error: null });
    }
  };

  // 全トピックをセット
  setAllTopics = (allTopics) => {
    // object to array
    let allTopicsArr = [];
    const topicObjArr = Object.values(allTopics);

    if (this.props.param === "search") {
      // 検索の場合は最初に「全トピック」を表示
      allTopicsArr.push({
        value: 0,
        label: "全トピック",
      });
      for (let i = 0; i < topicObjArr.length; i++) {
        allTopicsArr.push({
          value: topicObjArr[i].topic_id,
          label: topicObjArr[i].topic_name,
        });
      }
    } else {
      // 検索以外の場合
      for (let i = 0; i < topicObjArr.length; i++) {
        allTopicsArr.push({
          value: topicObjArr[i].topic_id,
          label: topicObjArr[i].topic_name,
        });
      }
    }
    return allTopicsArr;
  };

  // 初期表示トピックをセット
  setInitTopics = (allTopicsArr, initTopics) => {
    let initTopicsArr = [];
    let nonDuplicationTopicsArr = [];

    if (isNumber(initTopics)) {
      // 0/3/4/ の場合
      let topicsSearchArr = initTopics.split("/");

      // 重複を削除
      nonDuplicationTopicsArr = getNonDuplicationArr(topicsSearchArr);

      for (let i = 0; i < nonDuplicationTopicsArr.length; i++) {
        for (let j = 0; j < allTopicsArr.length; j++) {
          if (parseInt(nonDuplicationTopicsArr[i]) === allTopicsArr[j].value) {
            initTopicsArr.push(allTopicsArr[j]);
          }
        }
      }
    } else {
      // その他/Ruby/C/ の場合
      let topicsUserArr = initTopics.split("/");

      // 重複を削除
      nonDuplicationTopicsArr = getNonDuplicationArr(topicsUserArr);

      for (let i = 0; i < nonDuplicationTopicsArr.length; i++) {
        for (let j = 0; j < allTopicsArr.length; j++) {
          if (nonDuplicationTopicsArr[i] === allTopicsArr[j].label) {
            initTopicsArr.push(allTopicsArr[j]);
          }
        }
      }
    }

    return initTopicsArr;
  };

  render() {
    let TopicSelectBox;

    if (this.props.param === "search") {
      // 検索用セレクト(一つのみ)
      TopicSelectBox = (
        <Select
          name="select-test-name"
          onChange={this.handleChange}
          options={this.state.allTopicsArr}
          placeholder="トピックを選択して下さい"
          value={this.state.selectedOption}
          styles={selectBoxStyles}
        />
      );
    } else {
      // 複数可
      TopicSelectBox = (
        <Select
          name="select-test-name"
          onChange={this.handleChange}
          options={this.state.allTopicsArr}
          isMulti
          placeholder="トピックを選択して下さい"
          value={this.state.selectedOption}
          styles={selectBoxStyles}
        />
      );
    }
    return (
      <div>
        <div>{TopicSelectBox}</div>
        <div style={{ color: "red" }}>{this.state.error}</div>
      </div>
    );
  }
}

export default TopicSelectBox;
