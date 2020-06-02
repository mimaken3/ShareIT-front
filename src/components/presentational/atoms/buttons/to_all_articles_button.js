import React from "react";
import { withRouter } from "react-router";
import { emptyArticles } from "Actions/article";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import MenuItem from "@material-ui/core/MenuItem";
import { ScrollTo } from "react-scroll-to";

// 記事一覧へのボタン
const ToAllArticlesButton = withRouter((props) => {
  function toAllArticlesPage() {
    // メニューバーを閉じる
    props.callback();

    if (props.history.location.pathname === "/articles") {
      // 記事一覧にいる状態で「記事一覧」を押したらリロード
      window.location.reload(false);
    } else {
      props.emptyArticles();
      props.history.push("/articles");
    }
  }

  return (
    <React.Fragment>
      <ScrollTo>
        {({ scroll }) => (
          <MenuItem
            onClick={() => {
              scroll({ x: 0, y: 0 });
              toAllArticlesPage();
            }}
            style={{ fontSize: 17 }}
          >
            記事一覧
          </MenuItem>
        )}
      </ScrollTo>
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
