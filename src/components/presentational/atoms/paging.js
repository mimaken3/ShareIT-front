import React from "react";
import { connect } from "react-redux";
import {
  showAllArticles,
  searchArticles,
  showLikedArticlesByUserID,
} from "Actions/article";
import { showAllUsers } from "Actions/user";
import { getAllArticlesByUserID } from "Actions/article";
import Pagination from "@material-ui/lab/Pagination";
import { ScrollTo } from "react-scroll-to";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "./paging.css";

// ページング
const Paging = ({
  refPg,
  allPagingNum,
  refName,
  showAllArticles,
  showAllUsers,
  getAllArticlesByUserID,
  searchArticles,
  userID,
  callback,
  isSearched,
  searchUser,
  searchTopics,
  showLikedArticlesByUserID,
}) => {
  const theme = createMuiTheme({
    // ページングボタンを中央に
    overrides: {
      MuiPagination: {
        ul: {
          display: "inline-block",
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <ScrollTo>
          {({ scroll }) => (
            <Pagination
              count={allPagingNum}
              defaultPage={1}
              variant="outlined"
              color="primary"
              page={refPg}
              className="paging"
              onChange={(event, page) => {
                if (isSearched) {
                  const values = {
                    refPg: page,
                    user: searchUser,
                    topics: searchTopics,
                  };
                  searchArticles(values, "paging");
                  scroll({ x: 0, y: 0 });
                  callback();
                } else if (refName === "articles") {
                  showAllArticles(page);
                  scroll({ x: 0, y: 0 });
                  callback();
                } else if (refName === "users") {
                  showAllUsers(page);
                  scroll({ x: 0, y: 0 });
                  callback();
                } else if (refName === "userArticles") {
                  getAllArticlesByUserID(userID, page);
                  scroll({ x: 0, y: 0 });
                  callback();
                } else if (refName === "userLikedArticles") {
                  showLikedArticlesByUserID(userID, page);
                  scroll({ x: 0, y: 0 });
                  callback();
                }
              }}
            />
          )}
        </ScrollTo>
      </div>
    </ThemeProvider>
  );
};

const mapStateToProps = (state, ownProps) => {
  if (ownProps.refName === "userLikedArticles") {
    // ユーザがいいねした記事一覧
    const isSearched = state.likeArticles.is_searched;
    const searchUser = state.likeArticles.search_user;
    const searchTopics = state.likeArticles.search_topics;

    return { isSearched: isSearched, searchUser: searchUser, searchTopics };
  } else {
    // ユーザの記事一覧 or 記事一覧ページ
    const isSearched = state.articles.is_searched;
    const searchUser = state.articles.search_user;
    const searchTopics = state.articles.search_topics;

    return { isSearched: isSearched, searchUser: searchUser, searchTopics };
  }
};
const mapDispatchToProps = {
  showAllArticles,
  showAllUsers,
  getAllArticlesByUserID,
  searchArticles,
  showLikedArticlesByUserID,
};

export default connect(mapStateToProps, mapDispatchToProps)(Paging);
