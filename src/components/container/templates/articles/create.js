import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Loading from "Templates/loading";
import { getAllTopics } from "Actions/topic";
import { postArticleEvent, emptyArticles } from "Actions/article";
import TopicSelectBox from "Atoms/topic_select_box";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import Privacy from "Atoms/articles/privacy";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

class articleNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 記事タイトル
      title: "",
      isTitleError: true,
      // 記事内容
      content: "",
      isContentError: true,

      submitting: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.childRef = React.createRef();
    this._onKeyPress = this._onKeyPress.bind(this);
  }

  componentDidMount() {
    // 全トピックの取得
    this.props.getAllTopics();
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
      if (content.length > 1000) {
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

  // 記事を送信
  async onSubmit() {
    this.setState({ submitting: true });

    let article = {};
    article.article_title = this.state.title;
    article.article_content = this.state.content;

    // 投稿するユーザのIDをセット
    article.created_user_id = this.props.userID;

    // 送信するトピックをセット
    article.article_topics = this.refs.TopicSelectBox.getSendTopics("その他");

    // // プライバシーを設定
    article.is_private = this.refs.Privacy.privacy;

    Promise.all([
      // storeの記事一覧を削除
      await this.props.emptyArticles(),
      // 記事作成
      await this.props.postArticleEvent(article),
    ]).then(() => {
      // ボタンを押した後に遷移するURL
      this.props.history.push("/api/users/" + this.props.userID);
    });
  }

  // タイトルをEnterで内容に移動
  _onKeyPress(event) {
    if (event.key === "Enter") {
      this.textInput.focus();
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const loginUserInfo = getLoginUserInfo();
    const loginUserID = loginUserInfo.userID;

    // タイトルの文字数表示
    let TitleCount;
    if (this.state.title.length > 255) {
      TitleCount = (
        <React.Fragment>
          <span style={{ color: "red" }}>{this.state.title.length}</span>
          /255 文字
        </React.Fragment>
      );
    } else {
      TitleCount = (
        <React.Fragment>{this.state.title.length}/255 文字</React.Fragment>
      );
    }

    // 記事内容の文字数表示
    let ContentCount;
    if (this.state.content.length > 1000) {
      ContentCount = (
        <React.Fragment>
          <span style={{ color: "red" }}>{this.state.content.length}</span>
          /1000 文字
        </React.Fragment>
      );
    } else {
      ContentCount = (
        <React.Fragment>{this.state.content.length}/1000 文字</React.Fragment>
      );
    }

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

    if (loginUserID !== this.props.userID) {
      return (
        <React.Fragment>
          <Redirect to={"/api/users/" + loginUserID + "/article"} />
        </React.Fragment>
      );
    } else if (Object.values(this.props.allTopics).length !== 0) {
      // 全トピック
      const allTopics = this.props.allTopics;

      // 初期表示トピック
      const initTopics = "";

      return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="md">
            <CssBaseline />
            <div style={{ marginBottom: "30px", marginTop: "20px" }}>
              <TextField
                required
                id="standard-required"
                label="タイトル *必須"
                value={this.state.title}
                variant="outlined"
                onKeyPress={this._onKeyPress}
                onChange={(e) => this.handleTitleChange(e)}
              />
              <div style={{ float: "right" }}>{TitleCount}</div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <TextField
                id="outlined-multiline-static"
                label="内容 *必須"
                multiline
                rows={20}
                defaultValue=""
                variant="outlined"
                inputRef={(input) => {
                  this.textInput = input;
                }}
                onChange={(e) => this.handleContentChange(e)}
              />
              <div style={{ float: "right" }}>{ContentCount}</div>
            </div>

            <div
              style={{
                maxWidth: "400px",
                marginBottom: "10px",
                marginLeft: "5px",
              }}
            >
              関連トピック
              <TopicSelectBox
                allTopics={allTopics}
                initTopics={initTopics}
                ref="TopicSelectBox"
              />
            </div>

            <div style={{ maxWidth: "100px", marginBottom: "8px" }}>
              <Privacy initPrivacy={0} ref="Privacy" />
            </div>

            <Button
              variant="contained"
              color="secondary"
              style={{ color: "white" }}
              disabled={
                this.state.isTitleError ||
                this.state.isContentError ||
                this.state.submitting
              }
              onClick={this.onSubmit}
            >
              送信
            </Button>
          </Container>
        </ThemeProvider>
      );
    } else {
      return (
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Loading />
        </Container>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  // 全トピック
  const allTopics = state.topics;

  // 投稿するユーザID
  const userID = parseInt(ownProps.match.params.userId);

  return { userID: userID, allTopics: allTopics };
};

const mapDispatchToProps = { getAllTopics, postArticleEvent, emptyArticles };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "articleNewForm" })(articleNew));
