import React, { Component } from "react";
import { connect } from "react-redux";
// 入力フォーム作成で使う
import { reduxForm } from "redux-form";
import { getUserDetail } from "Actions/user";
import { getAllArticlesByUserID } from "Actions/article";
import ToAllUsersButton from "Atoms/to_all_users_button";
import UserName from "Atoms/users/name";
import UserID from "Atoms/users/id";
import Profile from "Atoms/users/profile";
import CreatedDate from "Atoms/created_date.js";
import Topic from "Atoms/topics/topic";
import Loading from "Templates/loading";
import EditButton from "Atoms/edit_button";
import CreateArticleButton from "Atoms/create_article_button";
import UserIcon from "Atoms/user_icon";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import DeleteButton from "Atoms/delete_button";
import NotFoundPage from "Templates/not_found_page";
import ArticleIndex from "Templates/articles/index";

class UserShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  // 初回読み込み用
  componentDidMount() {
    // 複雑な処理はcomponentに書かずに外(action)に記述
    const { userId } = this.props.match.params;
    if (userId) {
      Promise.all([this.props.getUserDetail(userId)]).then(() => {
        this.setState({ loading: false });
      });
    }
  }

  // propsの値が変わったら呼ばれる
  // 主にヘッダーから用
  componentDidUpdate() {
    const { userId } = this.props.match.params;
    if (userId && this.props.user) {
      this.props.getUserDetail(userId);
    }
  }

  render() {
    if (this.props.user && !this.state.loading) {
      const loginUser = getLoginUserInfo();
      const loginUserID = loginUser.userID;
      var AuthorizedEditButton;
      if (loginUserID === this.props.user.user_id) {
        const sendObj = { user: this.props.user };
        AuthorizedEditButton = (
          <div>
            <EditButton path="users" id={this.props.user.user_id} />
            <DeleteButton param="user" sendObj={sendObj} />
          </div>
        );
      }
      return (
        <React.Fragment>
          <div>ユーザ詳細</div>

          <UserIcon iconData={this.props.user.icon_name} />

          <div>
            <UserID userID={this.props.user.user_id} />
          </div>

          <div>
            <UserName userName={this.props.user.user_name} />
          </div>

          <div>
            <Topic topic={this.props.user.interested_topics} />
          </div>

          <div>
            <Profile profile={this.props.user.profile} />
          </div>

          <div>
            <CreatedDate createdDate={this.props.user.created_date} />
          </div>

          <div>{AuthorizedEditButton}</div>

          <div>
            <CreateArticleButton />
          </div>

          <div>
            <ToAllUsersButton />
          </div>

          <ArticleIndex
            param="userDetailShow"
            userID={this.props.user.user_id}
          />
        </React.Fragment>
      );
    } else if (this.props.isEmpty && !this.state.loading) {
      return (
        <React.Fragment>
          <div>
            <NotFoundPage />
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

const mapDispatchToProps = {
  getUserDetail,
  getAllArticlesByUserID,
};

// stateとactionをcomponentに関連付ける実装
// このstatusは状態のトップレベルを表す
// ReduxのStoreを第一引数にとる関数で、Componentにpropsとして渡すものをフィルタリングするときに使う。
const mapStateToProps = (state, ownProps) => {
  // 詳細画面で必要な各種情報を取得
  const user = state.users.users[ownProps.match.params.userId];

  // ユーザの存在
  const isEmpty = state.users.is_empty;

  // 初期状態でどんな値を表示するかをinitialValuesで設定
  return {
    initialValues: user,
    user: user,
    isEmpty: isEmpty,
    allPagingNum: state.articles.all_paging_num,
  };
};

// connect 第一引数はcomponentに渡すpropsを制御する
// 第二引数はreducerを呼び出して、reduxで管理しているstateを更新する
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  // enableReinitialize: When set to true, the form will reinitialize
  // every time the initialValues prop change. Defaults to false.
  // titleとbody属性を表示するときに使う
  // 直接詳細画面へアクセスしたとき(本来なら最初に記事一覧を取得して、それらの情報がブラウザのメモリに残った状態で、
  // 詳細へ行くとメモリから詳細を取得する)適宜、該当のイベントをAPIサーバから取得する
  // formにはユニークな名前を渡す
  reduxForm({ form: "userShowForm", enableReinitialize: true })(UserShow)
);
