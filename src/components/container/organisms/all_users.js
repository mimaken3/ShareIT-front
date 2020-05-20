import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { reduxForm } from "redux-form";
import getIndexDisplayArr from "Modules/get_index_display_arr";
import User from "Molecules/users/user";
import getLoginUserInfo from "Modules/getLoginUserInfo";

class AllUsers extends Component {
  // ユーザ一覧を表示する関数
  renderUsers(loginUserID) {
    return _.map(this.props.users, (user) => (
      <div key={user.user_id}>
        <User user={user} loginUserID={loginUserID} />
      </div>
    ));
  }

  render() {
    if (this.props.isEmpty) {
      return (
        <React.Fragment>
          <div>ユーザはいません</div>
        </React.Fragment>
      );
    } else {
      let loginUser = getLoginUserInfo();
      return (
        <React.Fragment>{this.renderUsers(loginUser.userID)}</React.Fragment>
      );
    }
  }
}

const mapDispatchToProps = "";

const mapStateToProps = (state) => {
  return {
    isEmpty: state.users.is_empty,
    users: getIndexDisplayArr(state.users.users),
  };
};

// connect 第一引数はcomponentに渡すpropsを制御する
// 第二引数はreducerを呼び出して、reduxで管理しているstateを更新する
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "allUsersForm" })(AllUsers));
