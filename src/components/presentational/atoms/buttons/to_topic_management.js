import React from "react";
import { withRouter } from "react-router";
import MenuItem from "@material-ui/core/MenuItem";
import getLoginUserInfo from "Modules/getLoginUserInfo";

// トピック管理画面へのボタン
const ToTopicManagementButton = withRouter((props) => {
  function toTopicManagementPage() {
    const loginUserInfo = getLoginUserInfo();
    const loginUserID = loginUserInfo.userID;
    if (
      props.history.location.pathname ===
      "/users/" + loginUserID + "/topics"
    ) {
      // トピック管理画面にいる状態で「トピックを管理」を押したらリロード
      window.location.reload(false);
    } else {
      props.history.push("/users/" + loginUserID + "/topics");
    }
  }

  return (
    <React.Fragment>
      <MenuItem
        onClick={() => {
          // メニューバーを閉じる
          props.handleMobileMenuClose();
          toTopicManagementPage();
        }}
        style={{ fontSize: 17 }}
      >
        トピックを管理
      </MenuItem>
    </React.Fragment>
  );
});

export default ToTopicManagementButton;
