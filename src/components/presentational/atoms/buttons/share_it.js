import React from "react";
import { withRouter } from "react-router";
import { emptyArticles } from "Actions/article";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { ScrollTo } from "react-scroll-to";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  shareIT: {
    fontSize: 30, // shareITタイトルの文字サイズ
  },
}));

// ShareIT (トップページ)
const ShareIT = withRouter((props) => {
  const classes = useStyles();

  function toAllArticlesPage() {
    if (props.history.location.pathname === "/articles") {
      window.location.reload(false);
    } else {
      props.emptyArticles();
      props.history.push("/articles");
    }
  }

  return (
    <ScrollTo>
      {({ scroll }) => (
        <Button
          color="inherit"
          className={classes.shareIT}
          onClick={() => {
            if (props.history.location.pathname !== "/articles") {
              scroll({ x: 0, y: 0 });
            }
            toAllArticlesPage();
          }}
        >
          ShareIT
        </Button>
      )}
    </ScrollTo>
  );
});

const mapDispatchToProps = {
  emptyArticles,
};

const mapStateToProps = "";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "ShareITForm" })(ShareIT));
