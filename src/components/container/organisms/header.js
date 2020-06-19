import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import UserIcon from "Atoms/user_icon";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import { emptyArticles, emptyLikedArticles } from "Actions/article";
import { emptyUsers, getUserDetail } from "Actions/user";
import { getAllNotifications } from "Actions/notification";
import Logout from "Atoms/buttons/logout";
import { compose } from "redux";
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
import ShareIT from "Atoms/buttons/share_it";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import NotificationMenu from "Atoms/header/notification_menu";
import ToTopicManagementButton from "Atoms/buttons/to_topic_management";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";

// ヘッダー
class Header extends Component {
  isNotificationCalled = false;
  constructor(props) {
    super(props);
    this.state = { mobileMoreAnchorEl: null, notificationMoreAnchorEl: null };
  }

  componentDidMount() {
    const loginUser = getLoginUserInfo();
    if (loginUser !== null) {
      const userID = loginUser.userID;
      this.props.getAllNotifications(userID);
      this.isNotificationCalled = true;
    }
  }

  componentDidUpdate() {
    const loginUser = getLoginUserInfo();
    if (loginUser !== null && !this.isNotificationCalled) {
      const userID = loginUser.userID;
      this.props.getAllNotifications(userID);
      this.isNotificationCalled = true;
    } else {
      // ログアウトした or している状態の 場合
      this.isNotificationCalled = false;
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.authMessage !== nextProps.authMessage) {
      // ログイン成功時に通知を読み込む
      return true;
    } else {
      // 👆以外でメニューを表示するときに使用
      return true;
    }
  }

  // メニューバーをポップアップ表示
  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  // メニューバーを非表示
  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  // 通知のメニューバを表示
  handleNotificationMenuOpen = (event) => {
    this.setState({ notificationMoreAnchorEl: event.currentTarget });
  };

  // 通知のメニューバを非表示
  handleNotificationMenuClose = () => {
    this.setState({ notificationMoreAnchorEl: null });
  };

  // ログインページへ
  toLoginPage = () => {
    this.handleMobileMenuClose();
    this.props.history.push("/login");
  };

  // ユーザ詳細画面へ
  toUserShowPage = (loginUserID) => {
    this.handleMobileMenuClose();
    if (this.props.history.location.pathname === "/users/" + loginUserID) {
      window.location.reload(false);
    } else {
      this.props.emptyArticles();
      this.props.emptyLikedArticles();
      this.props.emptyUsers();
      this.props.getUserDetail(loginUserID);

      this.props.history.push("/users/" + loginUserID);
    }
  };

  render() {
    var Display;
    const loginUser = getLoginUserInfo();
    const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);
    const isNotificationMenuOpen = Boolean(this.state.notificationMoreAnchorEl);

    if (loginUser !== null) {
      // ログイン状態
      const loginUserIconURL = localStorage.getItem("login_user_icon_URL");

      const mobileMenuId = "primary-search-account-menu-mobile";

      // 未読の通知数をカウント
      let notificationCount = 0;
      for (let key in this.props.notifications) {
        if (this.props.notifications[key].is_read === 0) {
          notificationCount++;
        }
      }

      const renderMobileMenu = (
        // デスクトップ用、メニューバー展開後の表示
        <React.Fragment>
          <Menu
            anchorEl={this.state.mobileMoreAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={this.handleMobileMenuClose}
          >
            <div className={this.props.classes.sectionMobile}>
              {/* モバイルサイズのみ表示 */}
              <MenuItem
                onClick={() => {
                  if (
                    this.props.history.location.pathname !==
                    "/users/" + loginUser.userID
                  ) {
                    this.toUserShowPage(loginUser.userID);
                  }
                }}
              >
                <div className={this.props.classes.memuUserIcon}>
                  <UserIcon iconData={loginUserIconURL} />
                </div>
                <div className={this.props.classes.memuUserName}>
                  {loginUser.userName}
                </div>
              </MenuItem>
            </div>

            <ToAllArticlesButton
              handleMobileMenuClose={this.handleMobileMenuClose}
            />

            <ToAllUsersButton
              handleMobileMenuClose={this.handleMobileMenuClose}
            />

            <ToTopicManagementButton
              handleMobileMenuClose={this.handleMobileMenuClose}
            />

            <Logout
              fontColor="black"
              handleMobileMenuClose={this.handleMobileMenuClose}
            />
          </Menu>
        </React.Fragment>
      );
      const renderNotificationMenu = (
        // 通知のメニューバー展開
        <NotificationMenu
          notificationMoreAnchorEl={this.state.notificationMoreAnchorEl}
          isNotificationMenuOpen={isNotificationMenuOpen}
          handleNotificationMenuClose={this.handleNotificationMenuClose}
          notifications={this.props.notifications}
          isEmpty={this.props.isNotificationEmpty}
        />
      );
      Display = (
        // デスクトップ用 バー
        <div className={this.props.classes.root}>
          <AppBar position="fixed" className={this.props.classes.appBar}>
            <Toolbar className={this.props.classes.toolBar}>
              <Typography className={this.props.classes.title}>
                <ShareIT />
              </Typography>
              <div className={this.props.classes.grow} />
              <CreateArticleButton />
              <div className={this.props.classes.sectionDesktop}>
                <Button
                  onClick={() => {
                    if (
                      this.props.history.location.pathname !==
                      "/users/" + loginUser.userID
                    ) {
                      this.toUserShowPage(loginUser.userID);
                    }
                  }}
                >
                  <div className={this.props.classes.userIcon}>
                    <UserIcon iconData={loginUserIconURL} />
                  </div>
                  <div className={this.props.classes.userName}>
                    {loginUser.userName}
                  </div>
                </Button>
              </div>

              <IconButton
                color="inherit"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={(e) => this.handleNotificationMenuOpen(e)}
              >
                <Badge
                  badgeContent={notificationCount}
                  color="secondary"
                  max={99}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={(e) => this.handleMobileMenuOpen(e)}
                color="inherit"
                className={this.props.classes.moreIcon}
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
          anchorEl={this.state.mobileMoreAnchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMobileMenuOpen}
          onClose={this.handleMobileMenuClose}
        >
          <MenuItem
            onClick={this.toLoginPage}
            style={{ color: "black", fontSize: 17 }}
          >
            ログイン
          </MenuItem>
        </Menu>
      );
      Display = (
        <div className={this.props.classes.root}>
          <AppBar position="fixed" className={this.props.classes.appBar}>
            <Toolbar className={this.props.classes.toolBar}>
              <Typography className={this.props.classes.title}>
                <ShareIT />
              </Typography>

              <div className={this.props.classes.grow} />
              <div className={this.props.classes.guest}>ゲスト</div>
              <div className={this.props.classes.sectionDesktop}>
                <Button
                  onClick={this.toLoginPage}
                  style={{ color: "white", fontSize: 17, marginBottom: 0 }}
                >
                  <div>ログイン</div>
                </Button>
              </div>

              <div className={this.props.classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={(e) => this.handleMobileMenuOpen(e)}
                  color="inherit"
                  className={this.props.classes.moreIcon}
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
    return <React.Fragment>{Display}</React.Fragment>;
  }
}

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
    authMessage: state.auth.message,
  };
};

const styles = (theme) => ({
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
});

export default withRouter(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({ form: "HeaderForm" }),
    withStyles(styles)
  )(Header)
);
