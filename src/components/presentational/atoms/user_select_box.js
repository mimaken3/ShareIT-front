import React, { Component } from "react";
import Select from "react-select";

// ユーザのセレクトボックス
class UserSelectBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
      initUserID: null,
    };
  }

  componentDidMount() {
    this.setInitTopics();
  }

  // 初期表示ユーザをセット
  setInitTopics = () => {
    const allUsers = this.props.allUsers;
    const initUser = this.props.initUser;

    let userObj = {};

    for (let i = 0; i < allUsers.length; i++) {
      if (initUser === allUsers[i].user_id) {
        userObj.value = allUsers[i].user_id;
        userObj.label = allUsers[i].user_name;
        this.setState({ selectedOption: userObj });
      }
    }
  };

  // 選択されたユーザを設定
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  // 送信するユーザを取得
  getSendUser() {
    return this.state.selectedOption;
  }

  // 全ユーザをセット
  setAllUsers = (allUsers) => {
    const allUsersArr = [];
    const userObjArr = Object.values(allUsers);
    for (let i = 0; i < userObjArr.length; i++) {
      allUsersArr.push({
        value: userObjArr[i].user_id,
        label: userObjArr[i].user_name,
      });
    }
    return allUsersArr;
  };

  render() {
    // 全ユーザをセット
    let allUsersArr = this.setAllUsers(this.props.allUsers);
    return (
      <React.Fragment>
        <div>
          <Select
            name="select-user"
            onChange={this.handleChange}
            options={allUsersArr}
            placeholder="ユーザを選択して下さい"
            value={this.state.selectedOption}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default UserSelectBox;
