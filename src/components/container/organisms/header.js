import React from "react";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import UserIcon from "Atoms/user_icon";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import { emptyArticles } from "Actions/article";
import { emptyUsers, getUserDetail } from "Actions/user";
import Logout from "Atoms/buttons/logout";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";

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
  },
  memuUserIcon: {
    width: "50px",
    height: "50px",
  },
  userName: {
    color: "white",
    fontSize: "18px",
  },
  guest: {
    color: "white",
    fontSize: "18px",
    lineHeight: "180px",
    marginRight: "20px",
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
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  moreIcon: {
    marginRight: "30px",
  },
}));

// ヘッダー
const Header = withRouter((props) => {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // メニューバーを非表示
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // メニューバーを表示
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const loginUser = getLoginUserInfo();
  var Display;
  if (loginUser !== null) {
    // ログイン状態
    const loginUserIconURL = localStorage.getItem("login_user_icon_URL");

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
        <MenuItem>
          <Button onClick={() => toUserShowPage(loginUser.userID)}>
            <div className={classes.memuUserIcon}>
              <UserIcon iconData={loginUserIconURL} />
            </div>
            <div className={classes.memuUserName}>{loginUser.userName}</div>
          </Button>
        </MenuItem>
        <MenuItem>
          <div>
            <Logout fontColor="black" />
          </div>
        </MenuItem>
      </Menu>
    );
    Display = (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <Typography className={classes.title}>
              <Button
                color="inherit"
                className={classes.shareIT}
                onClick={toAllArticlesPage}
              >
                ShareIT
              </Button>
            </Typography>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Button onClick={() => toUserShowPage(loginUser.userID)}>
                <div className={classes.userIcon}>
                  <UserIcon iconData={loginUserIconURL} />
                </div>
                <div className={classes.userName}>{loginUser.userName}</div>
              </Button>
              <Logout fontColor="white" />
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
        <MenuItem>
          <Button onClick={() => toUserShowPage(loginUser.userID)}>
            <div className={classes.memuGuestUserName}>ゲスト</div>
          </Button>
        </MenuItem>
        <MenuItem>
          <div>
            <Button
              onClick={toLoginPage}
              style={{ color: "black", fontSize: 17 }}
            >
              ログイン
            </Button>
          </div>
        </MenuItem>
      </Menu>
    );
    Display = (
      <div>
        <div className={classes.root}>
          <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
              <Typography className={classes.title}>
                <Button
                  color="inherit"
                  className={classes.shareIT}
                  onClick={toAllArticlesPage}
                >
                  ShareIT
                </Button>
              </Typography>

              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <div className={classes.guest}>ゲスト</div>
                <Button
                  onClick={toLoginPage}
                  style={{ color: "white", fontSize: 17 }}
                >
                  ログイン
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
      </div>
    );
  }

  // 記事一覧画面へ
  function toAllArticlesPage() {
    handleMobileMenuClose();
    if (props.history.location.pathname === "/api/articles") {
      window.location.reload(false);
    } else {
      props.emptyArticles();
      props.history.push("/api/articles");
    }
  }

  // ログインページへ
  function toLoginPage() {
    handleMobileMenuClose();
    props.history.push("/login");
  }

  // ユーザ詳細画面へ
  function toUserShowPage(loginUserID) {
    handleMobileMenuClose();
    props.emptyArticles();
    props.emptyUsers();
    props.getUserDetail(loginUserID);

    props.history.push("/api/users/" + loginUserID);
  }

  return <React.Fragment>{Display}</React.Fragment>;
});

const mapDispatchToProps = {
  emptyArticles,
  emptyUsers,
  getUserDetail,
};

const mapStateToProps = "";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "HeaderForm" })(Header));
