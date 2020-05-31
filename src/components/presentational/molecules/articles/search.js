import React, { Component } from "react";
import { connect } from "react-redux";
import TopicSelectBox from "Atoms/topic_select_box";
import UserSelectBox from "Atoms/user_select_box";
import { getAllTopics } from "Actions/topic";
import { emptyArticles, searchArticles } from "Actions/article";
import { getAllUsersForSelectBox } from "Actions/user";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router";
import SearchButton from "Atoms/buttons/search";

class SearchArticles extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // 検索
  handleSubmit() {
    const values = {
      refPg: 1,
      user: this.refs.UserSelectBox.getSendUser(),
      topics: this.refs.TopicSelectBox.state.selectedOption,
    };
    this.props.emptyArticles();

    this.props.searchArticles(values);

    this.props.history.push("/api/articles");
  }

  render() {
    // 全トピック
    const allTopics = this.props.allTopics;

    // 全ユーザ
    const allUsers = this.props.allUsers;

    return (
      <React.Fragment>
        <div style={{ width: 170, marginRight: "5px" }}>
          <UserSelectBox
            allUsers={allUsers}
            ref="UserSelectBox"
            initUser={this.props.searchUser}
          />
        </div>

        <div style={{ width: 250, marginRight: "5px" }}>
          <TopicSelectBox
            allTopics={allTopics}
            initTopics={this.props.searchTopics}
            ref="TopicSelectBox"
            param="search"
          />
        </div>

        <SearchButton handleSubmit={() => this.handleSubmit()} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  // 全トピック
  const allTopics = state.topics;

  // 全ユーザ
  const allUsers = state.selectUser.users;

  // 検索ユーザ、トピック
  const searchUser = state.articles.search_user;
  const searchTopics = state.articles.search_topics;

  return {
    allTopics: allTopics,
    allUsers: allUsers,
    searchUser,
    searchTopics,
  };
};

const mapDispatchToProps = {
  getAllTopics,
  emptyArticles,
  getAllUsersForSelectBox,
  searchArticles,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(reduxForm({ form: "searchForm" })(SearchArticles))
);
