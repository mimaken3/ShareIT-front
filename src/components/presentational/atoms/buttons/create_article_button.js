import React from "react";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import getLoginUserInfo from "Modules/getLoginUserInfo";

// 投稿ボタン
const CreateArticleButton = withRouter((props) => {
  return (
    <React.Fragment>
      <Button
        style={{ color: "white", fontSize: "18px", marginRight: "10px" }}
        variant="outlined"
        onClick={() => handlePost()}
      >
        投稿
      </Button>
    </React.Fragment>
  );
  function handlePost() {
    const loginUserInfo = getLoginUserInfo();
    const loginUserID = loginUserInfo.userID;
    props.history.push("/api/users/" + loginUserID + "/article");
  }
});

export default CreateArticleButton;
