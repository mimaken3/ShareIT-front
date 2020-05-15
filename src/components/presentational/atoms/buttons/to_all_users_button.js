import React from "react";
import Button from "@material-ui/core/Button";
import { emptyUsers } from "Actions/user";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router";

// ユーザ一覧へのボタン
const ToAllUsersButton = withRouter((props) => {
  function toAllUsersPage() {
    props.emptyUsers();
    props.history.push("/api/users");
  }

  return (
    <React.Fragment>
      <Button onClick={toAllUsersPage} variant="outlined">
        ユーザ一覧
      </Button>
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
