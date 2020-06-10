import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import { getUserDetail } from "Actions/user";
import UserIcon from "Atoms/user_icon";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

const useStyles = makeStyles((theme) => ({
  userName: {
    marginLeft: "10px",
  },
}));

// 記事にいいねしたユーザ
const LikedUser = withRouter((props) => {
  const classes = useStyles();
  const {
    userID,
    handleLikedUsersMenuClose,
    userName,
    iconName,
    getUserDetail,
  } = props;
  const theme = createMuiTheme({
    overrides: {
      MuiButton: {
        root: {
          textTransform: "none", // 大文字になるのを防ぐ
          width: "100%", // ボタンの反応する幅を横幅マックス
        },
        // 左寄せ && 画像を上下中央
        label: {
          justifyContent: "left",
          display: "flex",
          alignItems: "center",
        },
      },
    },
  });

  // ユーザ詳細画面へ
  function toUserDetailPage() {
    getUserDetail(userID);
    props.history.push("/users/" + userID);
  }

  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={() => {
          handleLikedUsersMenuClose();
          toUserDetailPage();
        }}
      >
        <UserIcon
          iconData={iconName}
          iconStyle={{
            borderRadius: "50%",
            width: "30px",
            height: "30px",
          }}
        />
        <span className={classes.userName}>{userName}</span>
      </Button>
    </ThemeProvider>
  );
});

const mapDispatchToProps = {
  getUserDetail,
};

const mapStateToProps = "";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "LikedUserForm" })(LikedUser));
