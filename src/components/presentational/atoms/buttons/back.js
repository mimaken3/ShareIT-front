import React from "react";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

// 戻るボタン
const BackButton = withRouter((props) => {
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIosIcon />}
        onClick={() => Back()}
      >
        戻る
      </Button>
    </React.Fragment>
  );

  function Back() {
    props.history.push(props.backURL);
  }
});

export default BackButton;
