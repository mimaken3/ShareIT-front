import React from "react";
import Menu from "@material-ui/core/Menu";
import _ from "lodash";
import LikedUser from "Atoms/users/liked_user";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

// 記事にいいねしたユーザ一覧
const LikedUsersMenu = (props) => {
  const theme = createMuiTheme({
    overrides: {
      MuiMenu: {
        paper: {
          // いいねしたユーザ一覧を表示させる最大の高さ
          maxHeight: "calc(100% - 430px)",
        },
      },
    },
  });
  const {
    likedUsersAnchorEl,
    likedUsers,
    islikedUsersOpen,
    handleLikedUsersMenuClose,
  } = props;

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderlikedUsers = _.map(likedUsers, (user) => (
    <div key={user.user_id}>
      <LikedUser
        userID={user.user_id}
        userName={user.user_name}
        iconName={user.icon_name}
        handleLikedUsersMenuClose={handleLikedUsersMenuClose}
      />
    </div>
  ));

  return (
    <ThemeProvider theme={theme}>
      <Menu
        anchorEl={likedUsersAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={islikedUsersOpen}
        onClose={(e) => handleLikedUsersMenuClose(e)}
      >
        <div>{renderlikedUsers}</div>
      </Menu>
    </ThemeProvider>
  );
};

export default LikedUsersMenu;
