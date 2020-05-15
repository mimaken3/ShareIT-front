import React from "react";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import { emptyArticles } from "Actions/article";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

// 記事一覧へのボタン
const ToAllArticlesButton = withRouter((props) => {
  function toAllArticlesPage() {
    props.emptyArticles();
    props.history.push("/api/articles");
  }

  return (
    <React.Fragment>
      <Button onClick={toAllArticlesPage} variant="outlined">
        記事一覧
      </Button>
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
