import React from "react";
import { emptyUsers } from "Actions/user";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router";
import MenuItem from "@material-ui/core/MenuItem";

// ユーザ一覧へのボタン
const ToAllUsersButton = withRouter((props) => {
  function toAllUsersPage() {
    if (props.history.location.pathname === "/users") {
      // ユーザ一覧にいる状態で「ユーザ一覧」を押したらリロード
      window.location.reload(false);
    } else {
      props.emptyUsers();
      props.history.push("/users");
    }
  }

  return (
    <React.Fragment>
      <MenuItem
        onClick={() => {
          // メニューバーを閉じる
          props.handleMobileMenuClose();
          toAllUsersPage();
        }}
        style={{ fontSize: 17 }}
      >
        ユーザ一覧
      </MenuItem>
    </React.Fragment>
  );
});

const mapDispatchToProps = {
  emptyUsers,
};

const mapStateToProps = "";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "ToAllUsersButtonForm" })(ToAllUsersButton));
