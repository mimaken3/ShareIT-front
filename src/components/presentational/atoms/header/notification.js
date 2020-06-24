import React from "react";
import Button from "@material-ui/core/Button";
import UserIcon from "Atoms/user_icon";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { emptyLikedArticles, getArticleDetail } from "Actions/article";
import { getUserDetail, getLikedUsersByArticleID } from "Actions/user";
import { getAllNotifications, changeNonReadToRead } from "Actions/notification";
import { getAllComments } from "Actions/comment";
import AgoCreatedDate from "Atoms/ago_created_date";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sourceUserName: {
    float: "left",
  },
  behavior: {
    float: "left",
  },
  sourceUserIcon: {
    width: "30px",
    height: "30px",
    float: "left",
    marginRight: "10px",
  },
  sourceUserBox: {
    float: "left",
    maxWidth: "82%",
  },
  createdDate: {
    fontSize: "12px",
    float: "left",
  },
  divBehavior: {
    float: "left",
    clear: "both",
  },
}));

// 通知一覧に表示する通知
const Notification = withRouter((props) => {
  const classes = useStyles();
  let destinationPath;
  if (props.notification.destination_type_id === 1) {
    // 記事にいいね => 記事詳細画面へ
    destinationPath =
      "/articles/" + props.notification.destination_type_name_id;
  } else if (props.notification.destination_type_id === 2) {
    // 記事にコメント => 記事詳細画面へ
    destinationPath =
      "/articles/" + props.notification.destination_type_name_id;
  }

  // 通知元の画面へ
  function toSomethingPage() {
    // 未読だったら既読にする
    if (props.notification.is_read === 0) {
      props.changeNonReadToRead(props.notification);
    }

    if (props.history.location.pathname === destinationPath) {
      // 今いるページと通知元が同じだった場合
      window.location.reload(false);
    } else {
      if (props.notification.destination_type_id === 1) {
        // 記事にいいね => 記事詳細画面へ
        props.getAllComments(props.notification.destination_type_name_id);
        props.getLikedUsersByArticleID(
          props.notification.destination_type_name_id
        );
        props.getUserDetail(props.notification.user_id);
        props.getArticleDetail(props.notification.destination_type_name_id);
      } else if (props.notification.destination_type_id === 2) {
        // 記事にコメント => 記事詳細画面へ
        props.getAllComments(props.notification.destination_type_name_id);
        props.getLikedUsersByArticleID(
          props.notification.destination_type_name_id
        );
        props.getUserDetail(props.notification.user_id);
        props.getArticleDetail(props.notification.destination_type_name_id);
      }

      props.history.push(destinationPath);
    }
  }

  let behavior;
  if (props.notification.behavior_type_id === 1) {
    behavior = (
      <React.Fragment>
        <div className={classes.sourceUserName}>
          {props.notification.source_user_name}さん
        </div>
        <div className={classes.behavior}>がいいねしました</div>
      </React.Fragment>
    );
  } else if (props.notification.behavior_type_id === 2) {
    behavior = (
      <React.Fragment>
        <div className={classes.sourceUserName}>
          {props.notification.source_user_name}さん
        </div>
        <div className={classes.behavior}>がコメントしました</div>
      </React.Fragment>
    );
  }

  let userBox = (
    <Button
      onClick={() => {
        props.handleNotificationMenuClose();
        toSomethingPage();
      }}
    >
      <div className={classes.sourceUserIcon}>
        <UserIcon
          iconData={props.notification.source_user_icon_name}
          iconStyle={{
            borderRadius: "50%",
            width: "30px",
            height: "30px",
          }}
        />
      </div>
      <div className={classes.sourceUserBox}>
        <div className={classes.createdDate}>
          <AgoCreatedDate date={props.notification.created_date} />
        </div>
        <div className={classes.divBehavior}>{behavior}</div>
      </div>
    </Button>
  );

  let _notification;
  if (props.notification.is_read) {
    // 既読
    _notification = <React.Fragment>{userBox}</React.Fragment>;
  } else {
    // 未読
    _notification = (
      <React.Fragment>
        <div style={{ backgroundColor: "#ECF3FF" }}>{userBox}</div>
      </React.Fragment>
    );
  }

  const theme = createMuiTheme({
    overrides: {
      MuiButton: {
        root: {
          textTransform: "none", // 大文字になるのを防ぐ
          width: "100%", // ボタンの反応する幅を横幅マックス
        },
        // 通知の文字を左寄せ && 画像を上下中央
        label: {
          justifyContent: "left",
          display: "flex",
          alignItems: "center",
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{_notification}</ThemeProvider>;
});

const mapDispatchToProps = {
  emptyLikedArticles,
  getUserDetail,
  getAllNotifications,
  getArticleDetail,
  changeNonReadToRead,
  getAllComments,
  getLikedUsersByArticleID,
};

const mapStateToProps = "";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "NotificationForm" })(Notification));
