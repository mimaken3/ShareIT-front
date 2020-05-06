import React, { Component } from "react";
import { connect } from "react-redux";
import TopicSelectBox from "Atoms/topic_select_box";
import UserSelectBox from "Atoms/user_select_box";
import Button from "@material-ui/core/Button";
import { getAllTopics } from "Actions/topic";
import { emptyArticles, searchArticles } from "Actions/article";
import { getAllUsersForSelectBox } from "Actions/user";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router";

class SearchArticles extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // 記事を送信
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

    // 初期表示トピック
    const initTopics = "";

    // 全ユーザ
    const allUsers = this.props.allUsers;

    return (
      <React.Fragment>
        <div style={{ width: 120 }}>
          <UserSelectBox allUsers={allUsers} ref="UserSelectBox" />
        </div>

        <div style={{ width: 250 }}>
          <TopicSelectBox
            allTopics={allTopics}
            initTopics={initTopics}
            ref="TopicSelectBox"
            param="search"
          />
        </div>
        <Button onClick={() => this.handleSubmit()}>検索</Button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  // 全トピック
  const allTopics = state.topics;

  // 全ユーザ
  const allUsers = state.selectUser.users;

  return {
    allTopics: allTopics,
    allUsers: allUsers,
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
