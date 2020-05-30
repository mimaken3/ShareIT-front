import React, { Component } from "react";
import { connect } from "react-redux";
// 入力フォーム作成で使う
import { reduxForm } from "redux-form";
import { getArticleDetail, putEvent } from "Actions/article";
import { getAllTopics } from "Actions/topic";
import TopicSelectBox from "Atoms/topic_select_box";
import CreatedDate from "Atoms/created_date";
import { Button } from "@material-ui/core";
import Loading from "Templates/loading";
import UnauthorizedPage from "Atoms/unauthorized_page";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import DeleteButton from "Atoms/buttons/delete_button";
import Privacy from "Atoms/articles/privacy";
import convertJSTToDate from "Modules/convert_JST_to_date";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import BackButton from "Atoms/buttons/back";
import SendIcon from "@material-ui/icons/Send";
import Count from "Atoms/count";
import ScrollToTopOnMount from "Atoms/scroll_to_top_on_mount";

class ArticleUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 記事タイトル
      title: "",
      isTitleError: false,
      // 記事内容
      content: "",
      isContentError: false,

      submitting: false,
      loading: true,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  // 外部のAPIに対してイベントを取得する
  componentDidMount() {
    // 全トピックの取得
    this.props.getAllTopics();

    // 記事情報を取得
    const { articleId } = this.props.match.params;
    if (articleId)
      this.props.getArticleDetail(articleId).then(() => {
        this.setState({
          title: this.props.article.article_title,
          content: this.props.article.article_content,
          loading: false,
        });
      });
  }

  // タイトルの入力チェック
  handleTitleChange = (e) => {
    const title = e.target.value;
    this.setState({ title: title });

    if (title.match(/\S/g)) {
      if (title.length > 255) {
        this.setState({
          isTitleError: true,
        });
      } else {
        this.setState({ isTitleError: false });
      }
    } else {
      this.setState({ isTitleError: true });
    }
  };

  // 記事内容の入力チェック
  handleContentChange = (e) => {
    const content = e.target.value;
    this.setState({ content: content });

    if (content.match(/\S/g)) {
      if (content.length > 9999) {
        this.setState({
          isContentError: true,
        });
      } else {
        this.setState({ isContentError: false });
      }
    } else {
      this.setState({ isContentError: true });
    }
  };

  // タイトルをEnterで内容に移動
  _onKeyPress(event) {
    if (event.key === "Enter") {
      this.textInput.focus();
    }
  }

  // 記事を更新して送信
  async onSubmit() {
    this.setState({ submitting: true });

    const article = {
      article_id: this.props.article.article_id,
      article_title: this.state.title,
      article_content: this.state.content,
      article_topics: this.refs.TopicSelectBox.getSendTopics(
        this.props.article.article_topics
      ),
      is_liked: this.props.article.is_liked,
      like_num: this.props.article.like_num,
      created_date: convertJSTToDate(this.props.article.created_date),
      updated_date: this.props.article.updated_date,
      deleted_date: this.props.article.deleted_date,
      is_private: this.refs.Privacy.privacy,
    };

    await this.props.putEvent(article);
    // 更新ボタンを押したとに表示するPATH
    this.props.history.push("/api/articles/" + this.props.article.article_id);
  }

  render() {
    const loginUserInfo = getLoginUserInfo();
    const loginUserID = loginUserInfo.userID;
    const isAdmin = loginUserInfo.admin;

    const theme = createMuiTheme({
      palette: {
        primary: {
          main: "#888888", // グレー
        },
        secondary: {
          main: "#00CCFF", // 水色
        },
      },
      overrides: {
        MuiFormControl: {
          root: {
            width: "100%",
          },
        },
      },
    });

    if (this.state.loading) {
      return (
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <ScrollToTopOnMount />
          <Loading />
        </Container>
      );
    } else {
      if (
        this.props.article &&
        Object.values(this.props.allTopics).length !== 0
      ) {
        if (loginUserID !== this.props.article.created_user_id && !isAdmin) {
          // 別ユーザ(admin以外)がアクセスしようとした場合
          return (
            <React.Fragment>
              <UnauthorizedPage page="articles" />
            </React.Fragment>
          );
        } else {
          // 全トピック
          const allTopics = this.props.allTopics;

          // 初期表示トピック
          const initTopics = this.props.article.article_topics;

          const sendObjArticleID = { articleID: this.props.article.article_id };

          const backURL = "/api/articles/" + this.props.article.article_id;

          return (
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="md">
                <CssBaseline />
                <ScrollToTopOnMount />

                <div style={{ marginBottom: "30px", marginTop: "20px" }}>
                  <TextField
                    id="standard-required"
                    label="タイトル *必須"
                    value={this.state.title}
                    variant="outlined"
                    onKeyPress={this._onKeyPress}
                    onChange={(e) => this.handleTitleChange(e)}
                  />
                  <Count text={this.state.title} param="articleTitle" />
                </div>

                <div style={{ marginBottom: "30px" }}>
                  <TextField
                    id="outlined-multiline-static"
                    label="内容 *必須"
                    multiline
                    rows={20}
                    value={this.state.content}
                    variant="outlined"
                    inputRef={(input) => {
                      this.textInput = input;
                    }}
                    onChange={(e) => this.handleContentChange(e)}
                  />
                  <Count text={this.state.content} param="articleContent" />
                </div>

                <div
                  style={{
                    maxWidth: "400px",
                    marginBottom: "10px",
                    marginLeft: "8px",
                  }}
                >
                  関連トピック:
                  <TopicSelectBox
                    allTopics={allTopics}
                    initTopics={initTopics}
                    ref="TopicSelectBox"
                  />
                </div>

                <div style={{ maxWidth: "100px", marginBottom: "10px" }}>
                  <Privacy
                    initPrivacy={this.props.article.is_private}
                    ref="Privacy"
                  />
                </div>

                <div style={{ marginTop: "20px", marginLeft: "8px" }}>
                  <span>作成日 </span>
                  <CreatedDate createdDate={this.props.article.created_date} />
                </div>

                <div
                  style={{
                    float: "left",
                    marginTop: "10px",
                    marginBottom: "20px",
                    marginLeft: "8px",
                  }}
                >
                  <div style={{ float: "left", marginRight: "5px" }}>
                    <BackButton backURL={backURL} />
                  </div>

                  <div style={{ float: "left" }}>
                    <DeleteButton param="article" sendObj={sendObjArticleID} />
                  </div>
                </div>

                <div style={{ clear: "both" }}></div>

                <Button
                  variant="contained"
                  color="secondary"
                  style={{ color: "white", marginLeft: "8px" }}
                  disabled={
                    this.state.isTitleError ||
                    this.state.isContentError ||
                    this.state.submitting
                  }
                  onClick={this.onSubmit}
                  startIcon={<SendIcon />}
                >
                  更新
                </Button>
              </Container>
            </ThemeProvider>
          );
        }
      } else {
        return (
          <Container component="main" maxWidth="md">
            <CssBaseline />
            <ScrollToTopOnMount />
            <Loading />
          </Container>
        );
      }
    }
  }
}

// バリデーションを行う関数
// const validate = (values) => {
//   const errors = {};
//   if (!values.article_title)
//     errors.article_title = "タイトルを入力してください";
//   if (!values.article_content)
//     errors.article_content = "内容を入力してください";

//   return errors;
// };

// stateとactionをcomponentに関連付ける実装
// このstatusは状態のトップレベルを表す
// ReduxのStoreを第一引数にとる関数で、Componentにpropsとして渡すものをフィルタリングするときに使う。
const mapStateToProps = (state, ownProps) => {
  // 詳細画面で必要な各種情報を取得

  // 更新する記事情報
  const article = state.articles.articles[ownProps.match.params.articleId];

  // 全トピック
  const allTopics = state.topics;

  // 初期状態でどんな値を表示するかをinitialValuesで設定
  return {
    article: article,
    allTopics: allTopics,
  };
};

const mapDispatchToProps = {
  getArticleDetail,
  putEvent,
  getAllTopics,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({ form: "articleUpdateForm", enableReinitialize: true })(
    ArticleUpdate
  )
);
