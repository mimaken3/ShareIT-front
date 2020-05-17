import React from "react";
import { withRouter } from "react-router";
import { emptyArticles } from "Actions/article";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import MenuItem from "@material-ui/core/MenuItem";

// 記事一覧へのボタン
const ToAllArticlesButton = withRouter((props) => {
  function toAllArticlesPage() {
    // メニューバーを閉じる
    props.callback();

    if (props.history.location.pathname === "/api/articles") {
      window.location.reload(false);
    } else {
      props.emptyArticles();
      props.history.push("/api/articles");
    }
  }

  return (
    <React.Fragment>
      <MenuItem onClick={() => toAllArticlesPage()} style={{ fontSize: 17 }}>
        記事一覧
      </MenuItem>
    </React.Fragment>
  );
});

const mapDispatchToProps = {
  emptyArticles,
};

const mapStateToProps = "";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "ToAllArticlesButtonForm" })(ToAllArticlesButton));
