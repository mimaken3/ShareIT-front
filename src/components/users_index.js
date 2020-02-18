import React, { Component } from "react";
import { connect } from "react-redux";
import { showAllUsers } from "../actions";
import _ from "lodash";

class UsersIndex extends Component {
  // 外部のAPIに対してイベントを取得する
  componentDidMount() {
    // 複雑な処理はcomponentに書かずに外(action)に書く
    this.props.showAllUsers();
  }

  renderEvents() {
    return _.map(this.props.users, user => (
      <div key={user.user_id}>
        {user.user_id} {user.user_name} {user.email} {user.interested_topics}
      </div>
    ));
  }

  render() {
    return (
      <React.Fragment>
        <div>ユーザ一覧</div>
        {this.renderEvents()}
      </React.Fragment>
    );
  }
}

// stateとactionをcomponentに関連付ける実装
// このstateは状態のトップレベルを表す
const mapStateToProps = state => ({ users: state.users });

const mapDispatchToProps = { showAllUsers };

export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex);
