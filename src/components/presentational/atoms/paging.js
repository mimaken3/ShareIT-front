import React from "react";
import { connect } from "react-redux";
import { showAllArticles } from "../../../actions/article";
import { showAllUsers } from "../../../actions/user";
import { getAllArticlesByUserID } from "../../../actions/article";
import Pagination from "@material-ui/lab/Pagination";

// ページング
const Paging = ({
  refPg,
  allPagingNum,
  refName,
  showAllArticles,
  showAllUsers,
  getAllArticlesByUserID,
  userID,
}) => {
  return (
    <React.Fragment>
      <Pagination
        count={allPagingNum}
        defaultPage={1}
        variant="outlined"
        color="primary"
        page={refPg}
        onChange={(event, page) => {
          if (refName === "articles") {
            showAllArticles(page);
          } else if (refName === "users") {
            showAllUsers(page);
          } else if (refName === "userArticles") {
            getAllArticlesByUserID(userID, page);
          }
        }}
      />
    </React.Fragment>
  );
};

const mapStateToProps = "";
const mapDispatchToProps = {
  showAllArticles,
  showAllUsers,
  getAllArticlesByUserID,
};

export default connect(mapStateToProps, mapDispatchToProps)(Paging);
