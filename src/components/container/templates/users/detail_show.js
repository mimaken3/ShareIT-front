import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { getUserDetail } from "Actions/user";
import {
  getAllArticlesByUserID,
  showLikedArticlesByUserID,
  emptyLikedArticles,
  emptyArticles,
} from "Actions/article";
import UserName from "Atoms/users/name";
import Profile from "Atoms/users/profile";
import { withStyles } from "@material-ui/core/styles";
import Loading from "Templates/loading";
import EditButton from "Atoms/buttons/edit_button";
import TopicTags from "Atoms/topic_tags";
import UserIcon from "Atoms/user_icon";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import DeleteButton from "Atoms/buttons/delete_button";
import NotFoundPage from "Templates/not_found_page";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { compose } from "redux";
import "react-tabs/style/react-tabs.css";
import TabsIndex from "Organisms/tabs_index";
import ScrollToTopOnMount from "Atoms/scroll_to_top_on_mount";

class UserShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };

    this.props.emptyArticles();
    this.props.emptyLikedArticles();
  }

  // 初回読み込み用
  componentDidMount() {
    // 複雑な処理はcomponentに書かずに外(action)に記述
    const { userId } = this.props.match.params;
    if (userId) {
      Promise.all(
        // ユーザの詳細情報を取得
        [this.props.getUserDetail(userId)],

        // ユーザの記事一覧を取得
        [this.props.getAllArticlesByUserID(userId, 1)],

        // ユーザのいいねした記事一覧を取得
        [this.props.showLikedArticlesByUserID(userId, 1)]
      ).then(() => {
        this.setState({ loading: false });
      });
    }
  }

  // propsの値が変わったら呼ばれる
  // 主にヘッダーから用
  shouldComponentUpdate(nextProps) {
    return (
      this.state.loading || // 初回
      (!this.state.loading && typeof this.props.user === "undefined") || // ユーザA -> ヘッダーのユーザB
      this.props.location.pathname !== nextProps.location.pathname // ユーザA -> ヘッダーのユーザB
    );
  }

  // propsの値が変わったら呼ばれる
  // 主にヘッダーから用
  componentDidUpdate() {
    const { userId } = this.props.match.params;
    Promise.all(
      // ユーザ詳細
      [this.props.getUserDetail(userId)],

      // ユーザの記事一覧を取得
      [this.props.getAllArticlesByUserID(userId, 1)],

      // ユーザのいいねした記事一覧を取得
      [this.props.showLikedArticlesByUserID(userId, 1)]
    ).then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    if (this.props.user && !this.state.loading) {
      const loginUser = getLoginUserInfo();
      const loginUserID = loginUser.userID;
      const isAdmin = loginUser.admin;
      var AuthorizedButton;
      if (loginUserID === this.props.user.user_id || isAdmin) {
        const sendObj = { user: this.props.user };
        AuthorizedButton = (
          <div className={this.props.classes.auth}>
            <div className={this.props.classes.editButton}>
              <EditButton path="users" id={this.props.user.user_id} />
            </div>
            <div className={this.props.classes.deleteButton}>
              <DeleteButton param="user" sendObj={sendObj} />
            </div>
          </div>
        );
      }

      return (
        <Container component="main" maxWidth="sm">
          <ScrollToTopOnMount />
          <CssBaseline />

          <div className={this.props.classes.userDetailBox}>
            <div className={this.props.classes.userIcon}>
              <UserIcon iconData={this.props.user.icon_name} />
            </div>

            <div className={this.props.classes.userName}>
              <UserName userName={this.props.user.user_name} />
            </div>

            <div className={this.props.classes.topicTags}>
              <TopicTags topics={this.props.user.interested_topics} />
            </div>

            <div className={this.props.classes.profileBox}>
              <span className={this.props.classes.profile}>
                <Profile profile={this.props.user.profile} />
              </span>
            </div>

            {AuthorizedButton}

            <div className={this.props.classes.stopFloat}></div>
          </div>

          <TabsIndex userID={this.props.user.user_id} />
        </Container>
      );
    } else if (this.props.isEmpty && !this.state.loading) {
      return (
        <React.Fragment>
          <ScrollToTopOnMount />
          <NotFoundPage />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <ScrollToTopOnMount />
          <Loading />
        </React.Fragment>
      );
    }
  }
}

const mapDispatchToProps = {
  getUserDetail,
  getAllArticlesByUserID,
  showLikedArticlesByUserID,
  emptyArticles,
  emptyLikedArticles,
};

const mapStateToProps = (state, ownProps) => {
  // 詳細画面で必要な各種情報を取得
  const user = state.users.users[ownProps.match.params.userId];

  // ユーザの存在
  const isEmpty = state.users.is_empty;

  return {
    user: user,
    isEmpty: isEmpty,
  };
};

const styles = () => ({
  userDetailBox: {
    marginTop: "30px",
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  userIcon: {
    width: "100px",
    height: "100px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  userName: {
    textAlign: "center",
  },
  topicTags: {
    textAlign: "center",
  },
  editButton: {
    float: "left",
    marginRight: "5px",
  },
  deleteButton: {
    float: "left",
  },
  stopFloat: {
    clear: "both",
  },
  tabs: {
    marginTop: "30px",
  },
  profile: {
    display: "inline-block",
    textAlign: "left",
  },
  profileBox: {
    textAlign: "center",
    marginTop: "20px",
  },
  auth: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "176px",
    marginTop: "60px",
  },
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: "userShowForm" }),
  withStyles(styles)
)(UserShow);
