import React from "react";
import { connect } from "react-redux";
import { showAllArticles } from "../../../actions/article";
import Pagination from "@material-ui/lab/Pagination";

// ページング
const Paging = ({ refPg, allPagingNum, refName, showAllArticles }) => {
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
          }
        }}
      />
    </React.Fragment>
  );
};

const mapStateToProps = "";
const mapDispatchToProps = { showAllArticles };

export default connect(mapStateToProps, mapDispatchToProps)(Paging);
