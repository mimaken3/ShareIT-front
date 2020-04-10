import React, { Component } from "react";
import { connect } from "react-redux";
import { showAllUsers } from "../../actions/user";
import { Link } from "react-router-dom";
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
        {user.user_id}{" "}
        <Link to={`/user/${user.user_id}`}>{user.user_name}</Link> {user.email}{" "}
        {user.interested_topics}
      </div>
    ));
  }

  render() {
    if (Object.values(this.props.users).length > 1) {
      return (
        <React.Fragment>
          <div>ユーザ一覧</div>
          {this.renderEvents()}
          <Link to={`/articles`}>記事一覧画面へ</Link>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div>Now loading</div>
        </React.Fragment>
      );
    }
  }
}

// stateとactionをcomponentに関連付ける実装
// このstateは状態のトップレベルを表す
const mapStateToProps = state => {
  console.log(state);
  return { users: state.users };
};

const mapDispatchToProps = { showAllUsers };

export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex);
