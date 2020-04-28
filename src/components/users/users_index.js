import React, { Component } from "react";
import { connect } from "react-redux";
import { showAllUsers } from "../../actions/user";
import { Link } from "react-router-dom";
import _ from "lodash";
import ToAllArticlesButton from "../presentational/atoms/to_all_articles_button";
import Loading from "../container/templates/loading";
import CreateArticleButton from "../presentational/atoms/create_article_button";
import Paging from "../presentational/atoms/paging";
import UserIcon from "../presentational/atoms/user_icon";

class UsersIndex extends Component {
  // 外部のAPIに対してイベントを取得する
  componentDidMount() {
    // 複雑な処理はcomponentに書かずに外(action)に書く
    this.props.showAllUsers(1);
  }

  renderEvents() {
    return _.map(this.props.users, (user) => (
      <div key={user.user_id}>
        {user.user_id} <UserIcon iconData={user.icon_name} />
        <Link to={`/api/users/${user.user_id}`}>{user.user_name}</Link>{" "}
        {user.email} {user.interested_topics}
      </div>
    ));
  }

  render() {
    if (
      this.props.users &&
      this.props.refPg &&
      Object.values(this.props.users).length >= 1
    ) {
      return (
        <React.Fragment>
          <div>ユーザ一覧</div>
          {this.renderEvents()}

          <div>
            <CreateArticleButton />
          </div>

          <div>
            <ToAllArticlesButton />
          </div>

          <div>
            <Paging
              refName="users"
              refPg={this.props.refPg}
              allPagingNum={this.props.allPagingNum}
            />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div>
            <Loading />
          </div>
        </React.Fragment>
      );
    }
  }
}

// stateとactionをcomponentに関連付ける実装
// このstateは状態のトップレベルを表す
const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    refPg: state.users.ref_pg,
    allPagingNum: state.users.all_paging_num,
  };
};

const mapDispatchToProps = { showAllUsers };

export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex);
