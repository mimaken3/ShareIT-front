import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import { reduxForm } from "redux-form";
import Paging from "../../presentational/atoms/paging";
import UserIcon from "../../presentational/atoms/user_icon";

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
          <div>
            <Paging
              refName={this.props.refName}
              refPg={this.props.refPg}
              allPagingNum={this.props.allPagingNum}
            />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div>ユーザ一覧</div>
          {this.renderUsers()}

          <div>
            <Paging
              refName={this.props.refName}
              refPg={this.props.refPg}
              allPagingNum={this.props.allPagingNum}
            />
          </div>
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
    refPg: state.users.ref_pg,
    allPagingNum: state.users.all_paging_num,
  };
};

// connect 第一引数はcomponentに渡すpropsを制御する
// 第二引数はreducerを呼び出して、reduxで管理しているstateを更新する
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "allUsersForm" })(AllUsers));
