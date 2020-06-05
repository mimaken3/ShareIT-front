import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import UserIcon from "Atoms/user_icon";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import { emptyArticles, emptyLikedArticles } from "Actions/article";
import { emptyUsers, getUserDetail } from "Actions/user";
import { getAllNotifications } from "Actions/notification";
import Logout from "Atoms/buttons/logout";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import CreateArticleButton from "Atoms/buttons/create_article_button";
import ToAllUsersButton from "Atoms/buttons/to_all_users_button";
import ToAllArticlesButton from "Atoms/buttons/to_all_articles_button";
import { ScrollTo } from "react-scroll-to";
import ShareIT from "Atoms/buttons/share_it";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import NotificationMenu from "Atoms/header/notification_menu";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#00CCFF", // 水色
  },
  toolBar: {
    height: "85px",
    width: "100%",
    maxWidth: "850px",
    marginRight: "auto",
    marginLeft: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  shareIT: {
    fontSize: 30, // shareITタイトルの文字サイズ
  },
  userIcon: {
    width: "50px",
    height: "50px",
    marginRight: "10px",
  },
  memuUserIcon: {
    width: "50px",
    height: "50px",
    marginRight: "10px",
  },
  userName: {
    color: "white",
    fontSize: "18px",
  },
  guest: {
    color: "white",
    fontSize: "18px",
    marginRight: "10px",
    marginTop: "auto",
    marginBottom: "auto",
  },
  memuUserName: {
    color: "black",
    fontSize: "18px",
  },
  memuGuestUserName: {
    color: "black",
    fontSize: "18px",
  },
  sectionDesktop: {
    display: "none",
    // sm: 600px
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    // sm: 600px
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  moreIcon: {
    marginRight: "0px", // 今後変更の可能性あり
  },
}));

// ヘッダー
const Header = withRouter((props) => {
  const { getAllNotifications } = props;
  const loginUser = getLoginUserInfo();

  useEffect(() => {
    if (loginUser !== null) {
      const userID = loginUser.userID;
      getAllNotifications(userID);
    }
  }, []);

  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [notificationMoreAnchorEl, setNotificationMenu] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNotificationMenuOpen = Boolean(notificationMoreAnchorEl);

  // メニューバーをポップアップ表示
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // メニューバーを非表示
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // 通知のメニューバを表示
  const handleNotificationMenuOpen = (event) => {
    setNotificationMenu(event.currentTarget);
  };

  // 通知のメニューバを非表示
  const handleNotificationMenuClose = () => {
    setNotificationMenu(null);
  };

  var Display;
  if (loginUser !== null) {
    // ログイン状態
    const loginUserIconURL = localStorage.getItem("login_user_icon_URL");

    const mobileMenuId = "primary-search-account-menu-mobile";

    // 未読の通知数をカウント
    let notificationCount = 0;
    for (let key in props.notifications) {
      if (props.notifications[key].is_read === 0) {
        notificationCount++;
      }
    }

    const renderMobileMenu = (
      // デスクトップ用、メニューバー展開後の表示
      <React.Fragment>
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <div className={classes.sectionMobile}>
            {/* モバイルサイズのみ表示 */}
            <MenuItem
              onClick={() => {
                if (
                  props.history.location.pathname !==
                  "/users/" + loginUser.userID
                ) {
                }
                toUserShowPage(loginUser.userID);
              }}
            >
              <div className={classes.memuUserIcon}>
                <UserIcon iconData={loginUserIconURL} />
              </div>
              <div className={classes.memuUserName}>{loginUser.userName}</div>
            </MenuItem>
          </div>

          <ToAllArticlesButton handleMobileMenuClose={handleMobileMenuClose} />

          <ToAllUsersButton handleMobileMenuClose={handleMobileMenuClose} />

          <Logout
            fontColor="black"
            handleMobileMenuClose={handleMobileMenuClose}
          />
        </Menu>
      </React.Fragment>
    );

    const renderNotificationMenu = (
      // 通知のメニューバー展開
      <NotificationMenu
        notificationMoreAnchorEl={notificationMoreAnchorEl}
        isNotificationMenuOpen={isNotificationMenuOpen}
        handleNotificationMenuClose={handleNotificationMenuClose}
        notifications={props.notifications}
        isEmpty={props.isNotificationEmpty}
      />
    );

    Display = (
      // デスクトップ用 バー
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <Typography className={classes.title}>
              <ShareIT />
            </Typography>
            <div className={classes.grow} />
            <CreateArticleButton />
            <div className={classes.sectionDesktop}>
              <ScrollTo>
                {({ scroll }) => (
                  <Button
                    onClick={() => {
                      if (
                        props.history.location.pathname !==
                        "/users/" + loginUser.userID
                      ) {
                        scroll({ x: 0, y: 0 });
                      }
                      toUserShowPage(loginUser.userID);
                    }}
                  >
                    <div className={classes.userIcon}>
                      <UserIcon iconData={loginUserIconURL} />
                    </div>
                    <div className={classes.userName}>{loginUser.userName}</div>
                  </Button>
                )}
              </ScrollTo>
            </div>

            <IconButton
              color="inherit"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleNotificationMenuOpen}
            >
              <Badge badgeContent={notificationCount} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              className={classes.moreIcon}
            >
              <MoreIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {renderNotificationMenu}
        {renderMobileMenu}
      </div>
    );
  } else {
    // 未ログイン状態
    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem
          onClick={toLoginPage}
          style={{ color: "black", fontSize: 17 }}
        >
          ログイン
        </MenuItem>
      </Menu>
    );
    Display = (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <Typography className={classes.title}>
              <ShareIT />
            </Typography>

            <div className={classes.grow} />
            <div className={classes.guest}>ゲスト</div>
            <div className={classes.sectionDesktop}>
              <Button
                onClick={toLoginPage}
                style={{ color: "white", fontSize: 17, marginBottom: 0 }}
              >
                <div>ログイン</div>
              </Button>
            </div>

            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
                className={classes.moreIcon}
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </div>
    );
  }

  // ログインページへ
  function toLoginPage() {
    handleMobileMenuClose();
    props.history.push("/login");
  }

  // ユーザ詳細画面へ
  function toUserShowPage(loginUserID) {
    handleMobileMenuClose();
    if (props.history.location.pathname === "/users/" + loginUserID) {
      window.location.reload(false);
    } else {
      props.emptyArticles();
      props.emptyLikedArticles();
      props.emptyUsers();
      props.getUserDetail(loginUserID);

      props.history.push("/users/" + loginUserID);
    }
  }

  return <React.Fragment>{Display}</React.Fragment>;
});

const mapDispatchToProps = {
  emptyArticles,
  emptyLikedArticles,
  emptyUsers,
  getUserDetail,
  getAllNotifications,
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications.notifications,
    isNotificationEmpty: state.notifications.is_empty,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "HeaderForm" })(Header));
