import React from "react";
import { connect } from "react-redux";
import { showAllArticles } from "../../../actions/article";
import { showAllUsers } from "../../../actions/user";
import { getAllArticlesByUserID } from "../../../actions/article";
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
              } else if (refName === "users") {
                showAllUsers(page);
                scroll({ x: 0, y: 0 });
              } else if (refName === "userArticles") {
                getAllArticlesByUserID(userID, page);
                scroll({ x: 0, y: 0 });
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
