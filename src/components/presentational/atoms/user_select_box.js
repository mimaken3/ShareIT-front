import React, { Component } from "react";
import Select from "react-select";

// ユーザのセレクトボックス
class UserSelectBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
    };
  }

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
            defaultValue={allUsersArr[0]}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default UserSelectBox;
