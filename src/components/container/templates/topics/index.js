import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Loading from "Templates/loading";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import ScrollToTopOnMount from "Atoms/scroll_to_top_on_mount";
import UnauthorizedPage from "Atoms/unauthorized_page";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import { getTopicsByUserID, postTopic } from "Actions/topic";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import TopicTable from "Organisms/topics/table";
import CreateTopic from "Molecules/topics/create";

// トピック管理ページ
class TopicsIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isAuth: false,
    };
  }

  componentDidMount() {
    const loginUserInfo = getLoginUserInfo();
    const loginUserID = loginUserInfo.userID;

    if (parseInt(this.props.pageUserID) === loginUserID) {
      this.setState({ isAuth: true });
      this.props.getTopicsByUserID(loginUserID).then(() => {
        this.setState({ loading: false });
      });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: "#00CCFF", // 水色
        },
        secondary: {
          main: "#888888", // グレー
        },
      },
    });

    if (this.state.loading) {
      return (
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <ScrollToTopOnMount />
          <Loading />
        </Container>
      );
    } else {
      if (this.state.isAuth) {
        let createTopicRender = (
          <>
            <div
              style={{
                marginTop: "30px",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <CreateTopic />
            </div>
            <div style={{ clear: "both" }}></div>
          </>
        );

        if (this.props.isEmpty) {
          // 管理するトピックがない場合
          return (
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                <h3>自分でトピックを作成して管理することができます</h3>
              </div>
              {createTopicRender}
            </ThemeProvider>
          );
        } else {
          return (
            <ThemeProvider theme={theme}>
              {/* <Container component="main" maxWidth="sm"> */}
              <CssBaseline />
              <div style={{ marginTop: "10px" }}>
                <TopicTable topics={this.props.topics} />
              </div>
              {createTopicRender}
              {/* </Container> */}
            </ThemeProvider>
          );
        }
      } else {
        return (
          // 別ユーザ(admin以外)がアクセスしようとした場合
          <>
            <UnauthorizedPage page="articles" />
          </>
        );
      }
    }
  }
}

const mapDispatchToProps = { getTopicsByUserID, postTopic };

const mapStateToProps = (state, ownProps) => {
  const isEmpty = state.topicManagement.is_empty;
  const topics = state.topicManagement.topics;
  const pageUserID = ownProps.match.params.userId;

  return {
    pageUserID,
    isEmpty,
    topics,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "TopicsIndexForm" })(TopicsIndex));
