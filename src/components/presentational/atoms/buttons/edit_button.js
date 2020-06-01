import React from "react";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import { withRouter } from "react-router";

// 編集ボタン
const EditButton = withRouter((props) => {
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        startIcon={<EditIcon />}
        onClick={() => Edit()}
      >
        編集
      </Button>
    </React.Fragment>
  );

  // 編集画面へ
  function Edit() {
    props.history.push("/" + props.path + "/" + props.id + "/edit");
  }
});

export default EditButton;
