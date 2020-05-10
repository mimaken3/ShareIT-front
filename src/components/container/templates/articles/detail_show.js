import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { getArticleDetail, deleteEvent } from "Actions/article";
import { getAllComments } from "Actions/comment";
import ArticleTitle from "Atoms/articles/title";
import ArticleContent from "Atoms/articles/content";
import CreatedDate from "Atoms/created_date.js";
import Topic from "Atoms/topics/topic";
import ArticleID from "Atoms/articles/id";
import ToAllArticlesButton from "Atoms/buttons/to_all_articles_button";
import Loading from "Templates/loading";
import EditButton from "Atoms/buttons/edit_button";
import CreateArticleButton from "Atoms/buttons/create_article_button";
import Like from "Molecules/likes/like";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import AllComments from "Organisms/all_comments";
import CommentNew from "Molecules/comments/create";
import DeleteButton from "Atoms/buttons/delete_button";
import NotFoundPage from "Templates/not_found_page";

class ArticleShow extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.state = { loading: true };
  }

  componentDidMount() {
    const { articleId } = this.props.match.params;
    if (articleId) {
      Promise.all([
        this.props.getAllComments(articleId),
        this.props.getArticleDetail(articleId),
      ]).then(() => {
        this.setState({ loading: false });
      });
    }
  }

  // 記事の削除
  async onDeleteClick() {
    const article_id = this.props.match.params.articleId;
    await this.props.deleteEvent(article_id);
    this.props.history.push("/api/articles");
  }

  render() {
    const loginUser = getLoginUserInfo();
    const loginUserID = loginUser.userID;
    const isAdmin = loginUser.admin;
    if (this.props.article && !this.state.loading) {
      var AuthorizedEditButton;
      if (loginUserID === this.props.article.created_user_id || isAdmin) {
        const sendObj = { articleID: this.props.article.article_id };
        AuthorizedEditButton = (
          <div>
            <EditButton path="articles" id={this.props.article.article_id} />
            <DeleteButton param="article" sendObj={sendObj} />
          </div>
        );
      }

      return (
        <React.Fragment>
          <div>記事詳細</div>
          <div>
            <ArticleID articleID={this.props.article.article_id} />
          </div>

          <div>
            <ArticleTitle articleTitle={this.props.article.article_title} />
          </div>

          <div>
            <Topic topic={this.props.article.article_topics} />
          </div>

          <div>
            <ArticleContent
              articleContent={this.props.article.article_content}
            />
          </div>

          <Like
            articleID={this.props.article.article_id}
            isLiked={this.props.article.is_liked}
            likeNum={this.props.article.like_num}
            loginUserID={loginUserID}
          />

          <div>
            <CreatedDate createdDate={this.props.article.created_date} />
          </div>

          <div>{AuthorizedEditButton}</div>

          <div>
            <CreateArticleButton />
          </div>

          <div>
            <ToAllArticlesButton />
          </div>

          <div>
            <AllComments articleID={this.props.article.article_id} />
          </div>

          <div>
            <CommentNew articleID={this.props.article.article_id} />
          </div>
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

// stateとactionをcomponentに関連付ける実装
// このstatusは状態のトップレベルを表す
// ReduxのStoreを第一引数にとる関数で、Componentにpropsとして渡すものをフィルタリングするときに使う。
const mapStateToProps = (state, ownProps) => {
  // 詳細画面で必要な各種情報を取得
  const article = state.articles.articles[ownProps.match.params.articleId];

  // 記事の存在
  const isEmpty = state.articles.is_empty;

  // 初期状態でどんな値を表示するかをinitialValuesで設定
  return { initialValues: article, article: article, isEmpty: isEmpty };
};

const mapDispatchToProps = { getArticleDetail, deleteEvent, getAllComments };

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
  reduxForm({ form: "articleShowForm", enableReinitialize: true })(ArticleShow)
);
