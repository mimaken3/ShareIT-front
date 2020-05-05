import React from "react";
import { connect } from "react-redux";
import { showAllArticles } from "Actions/article";
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
  userID,
  callback,
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
              if (refName === "articles") {
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

const mapStateToProps = "";
const mapDispatchToProps = {
  showAllArticles,
  showAllUsers,
  getAllArticlesByUserID,
};

export default connect(mapStateToProps, mapDispatchToProps)(Paging);
