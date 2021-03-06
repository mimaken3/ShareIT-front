import React from "react";
import Menu from "@material-ui/core/Menu";
import getIndexDisplayArr from "Modules/get_index_display_arr";
import _ from "lodash";
import Notification from "Atoms/header/notification";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  // 通知なし
  nonNotificationBox: {
    width: "140px",
    marginTop: "30px",
    marginBottom: "30px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  nonNotificationsIcon: {
    display: "table-cell",
    verticalAlign: "middle",
  },
  nonNotificationText: {
    display: "table-cell",
    verticalAlign: "middle",
  },
  // 通知あり
  notificationBox: {
    height: "50px",
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    marginLeft: "10px",
  },
  notificationText: {
    marginLeft: "5px",
  },
}));

const NotificationMenu = (props) => {
  const classes = useStyles();
  const theme = createMuiTheme({
    overrides: {
      MuiList: {
        // 通知一覧の上下の隙間
        padding: {
          paddingTop: "0px",
          paddingBottom: "0px",
        },
      },
      MuiMenu: {
        paper: {
          maxHeight: "calc(100% - 370px)",
        },
      },
      MuiPopover: {
        paper: {
          maxWidth: "calc(100% - 132px)",
          minWidth: "280px", // 「通知はありません」を１行で表示できる幅 && いい感じの幅
        },
      },
    },
  });

  if (props.isEmpty) {
    return (
      <ThemeProvider theme={theme}>
        <Menu
          anchorEl={props.notificationMoreAnchorEl} // anchorEl: 表示させるメニューをどこに表示させるか
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }} // メニューを表示する位置を指定
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={props.isNotificationMenuOpen}
          onClose={props.handleNotificationMenuClose}
        >
          <div className={classes.nonNotificationBox}>
            <div>
              <div className={classes.nonNotificationsIcon}>
                <NotificationsIcon />
              </div>
              <h4 className={classes.nonNotificationText}>通知はありません</h4>
            </div>
          </div>
        </Menu>
      </ThemeProvider>
    );
  } else {
    const notificationsArr = getIndexDisplayArr(props.notifications);

    // 通知一覧に表示する通知
    let renderNotifications = _.map(notificationsArr, (notification) => (
      <div key={notification.notification_id}>
        <Notification
          notification={notification}
          handleNotificationMenuClose={props.handleNotificationMenuClose}
        />
      </div>
    ));

    return (
      <ThemeProvider theme={theme}>
        <Menu
          anchorEl={props.notificationMoreAnchorEl} // anchorEl: 表示させるメニューをどこに表示させるか
          anchorOrigin={{ vertical: "top", horizontal: "right" }} // メニューを表示する位置を指定
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={props.isNotificationMenuOpen}
          onClose={props.handleNotificationMenuClose}
          getContentAnchorEl={null} // スクロールしても再度開いたとき、上に固定
          PaperProps={{
            style: {
              width: "20ch", // いい感じの幅に
            },
          }}
        >
          <div className={classes.notificationBox}>
            <NotificationsIcon />
            <h3 className={classes.notificationText}>通知</h3>
          </div>
          <div>{renderNotifications}</div>
        </Menu>
      </ThemeProvider>
    );
  }
};

export default NotificationMenu;
