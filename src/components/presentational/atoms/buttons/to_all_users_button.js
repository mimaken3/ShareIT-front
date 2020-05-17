import React from "react";
import { emptyUsers } from "Actions/user";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router";
import MenuItem from "@material-ui/core/MenuItem";

// ユーザ一覧へのボタン
const ToAllUsersButton = withRouter((props) => {
  function toAllUsersPage() {
    // メニューバーを閉じる
    props.callback();

    props.emptyUsers();
    props.history.push("/api/users");
  }

  return (
    <React.Fragment>
      <MenuItem onClick={toAllUsersPage} style={{ fontSize: 17 }}>
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
