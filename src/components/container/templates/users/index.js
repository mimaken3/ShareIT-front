import React, { Component } from "react";
import { connect } from "react-redux";
import { showAllUsers } from "Actions/user";
import ToAllArticlesButton from "Atoms/to_all_articles_button";
import Loading from "Templates/loading";
import CreateArticleButton from "Atoms/create_article_button";
import AllUsers from "Organisms/all_users";

class UsersIndex extends Component {
  // 外部のAPIに対してイベントを取得する
  componentDidMount() {
    // 複雑な処理はcomponentに書かずに外(action)に書く
    this.props.showAllUsers(1);
  }

  render() {
    if (this.props.users && this.props.allPagingNum) {
      return (
        <React.Fragment>
          <AllUsers refName="users" />

          <div>
            <CreateArticleButton />
          </div>

          <div>
            <ToAllArticlesButton />
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
    allPagingNum: state.users.all_paging_num,
  };
};

const mapDispatchToProps = { showAllUsers };

export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex);
