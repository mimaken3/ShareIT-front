import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import { reduxForm } from "redux-form";
import UserIcon from "Atoms/user_icon";

class AllUsers extends Component {
  // ユーザ一覧を表示する関数
  renderUsers() {
    return _.map(this.props.users, (user) => (
      <div key={user.user_id}>
        {user.user_id} <UserIcon iconData={user.icon_name} />
        <Link to={`/api/users/${user.user_id}`}>{user.user_name}</Link>{" "}
        {user.email} {user.interested_topics}
      </div>
    ));
  }

  render() {
    if (this.props.isEmpty) {
      return (
        <React.Fragment>
          <div>ユーザ一覧</div>
          <div>ユーザはいません</div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div>ユーザ一覧</div>
          {this.renderUsers()}
        </React.Fragment>
      );
    }
  }
}

const mapDispatchToProps = "";

const mapStateToProps = (state) => {
  return {
    isEmpty: state.users.is_empty,
    users: state.users.users,
  };
};

// connect 第一引数はcomponentに渡すpropsを制御する
// 第二引数はreducerを呼び出して、reduxで管理しているstateを更新する
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "allUsersForm" })(AllUsers));
