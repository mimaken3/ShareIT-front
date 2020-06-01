import React from "react";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import { ScrollTo } from "react-scroll-to";

// 投稿ボタン
const CreateArticleButton = withRouter((props) => {
  return (
    <React.Fragment>
      <ScrollTo>
        {({ scroll }) => (
          <Button
            style={{ color: "white", fontSize: "18px", marginRight: "10px" }}
            variant="outlined"
            onClick={() => {
              scroll({ x: 0, y: 0 });
              handlePost();
            }}
          >
            投稿
          </Button>
        )}
      </ScrollTo>
    </React.Fragment>
  );
  function handlePost() {
    const loginUserInfo = getLoginUserInfo();
    const loginUserID = loginUserInfo.userID;
    props.history.push("/users/" + loginUserID + "/article");
  }
});

export default CreateArticleButton;
