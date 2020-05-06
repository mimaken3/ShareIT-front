import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllTopics } from "Actions/topic";
import {
  showAllArticles,
  emptyArticles,
  searchArticles,
} from "Actions/article";
import { getAllUsersForSelectBox } from "Actions/user";
import ToAllUsersButton from "Atoms/to_all_users_button";
import Loading from "Templates/loading";
import CreateArticleButton from "Atoms/create_article_button";
import AllArticles from "Organisms/all_articles";
import Paging from "Atoms/paging";
import TopicSelectBox from "Atoms/topic_select_box";
import UserSelectBox from "Atoms/user_select_box";
import Button from "@material-ui/core/Button";
import getLoginUserInfo from "Modules/getLoginUserInfo";

class ArticlesIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  PagingClick() {
    this.props.emptyArticles();
    if (this.props.allPagingNum) {
      this.setState({ loading: false });
    }
  }

  // 外部のAPIに対してイベントを取得する
  componentDidMount() {
    // 全トピックの取得
    this.props.getAllTopics();

    const loginUser = getLoginUserInfo();
    const loginUserID = loginUser.userID;

    // セレクトボックス用の全ユーザを取得
    this.props.getAllUsersForSelectBox(loginUserID);

    // 複雑な処理はcomponentに書かずに外(action)に書く
    this.props.showAllArticles(1).then(() => {
      this.setState({ loading: false });
    });
  }

  // 記事を送信
  onSubmit() {
    this.props.emptyArticles();
    this.setState({ loading: true });

    const values = {
      refPg: 1,
      user: this.refs.UserSelectBox.getSendUser(),
      topics: this.refs.TopicSelectBox.state.selectedOption,
    };

    this.props.searchArticles(values);
  }

  render() {
    if (this.props.articles && this.props.allPagingNum && !this.props.loading) {
      // 全トピック
      const allTopics = this.props.allTopics;

      // 初期表示トピック
      const initTopics = "";

      // 全ユーザ
      const allUsers = this.props.allUsers;
      return (
        <React.Fragment>
          <div style={{ width: 200 }}>
            <UserSelectBox allUsers={allUsers} ref="UserSelectBox" />
          </div>

          <div style={{ width: 300 }}>
            <TopicSelectBox
              allTopics={allTopics}
              initTopics={initTopics}
              ref="TopicSelectBox"
              param="search"
            />
          </div>
          <Button onClick={this.onSubmit}>検索</Button>
          <AllArticles refName="articles" />
          <div>
            <Paging
              refName="articles"
              userID={this.props.userID}
              refPg={this.props.refPg}
              allPagingNum={this.props.allPagingNum}
              callback={() => this.PagingClick()}
            />
          </div>
          <div>
            <CreateArticleButton />
          </div>
          <div>
            <ToAllUsersButton />
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

const mapStateToProps = (state) => {
  // 全トピック
  const allTopics = state.topics;

  // 全ユーザ
  const allUsers = state.users.users;

  return {
    allTopics: allTopics,
    allUsers: allUsers,
    allPagingNum: state.articles.all_paging_num,
    articles: state.articles.articles,
    refPg: state.articles.ref_pg,
  };
};

const mapDispatchToProps = {
  getAllTopics,
  showAllArticles,
  emptyArticles,
  getAllUsersForSelectBox,
  searchArticles,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesIndex);
