import React from "react";
import { connect } from "react-redux";
import { showAllArticles, searchArticles } from "Actions/article";
import { showAllUsers } from "Actions/user";
import { getAllArticlesByUserID } from "Actions/article";
import Pagination from "@material-ui/lab/Pagination";
import { ScrollTo } from "react-scroll-to";

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
}) => {
  return (
    <React.Fragment>
      <ScrollTo>
        {({ scroll }) => (
          <Pagination
            count={allPagingNum}
            defaultPage={1}
            variant="outlined"
            color="primary"
            page={refPg}
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
              }
            }}
          />
        )}
      </ScrollTo>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const isSearched = state.articles.is_searched;
  const searchUser = state.articles.search_user;
  const searchTopics = state.articles.search_topics;

  return { isSearched: isSearched, searchUser: searchUser, searchTopics };
};
const mapDispatchToProps = {
  showAllArticles,
  showAllUsers,
  getAllArticlesByUserID,
  searchArticles,
};

export default connect(mapStateToProps, mapDispatchToProps)(Paging);
