import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import * as JWT from "jwt-decode";

class Auth extends Component {
  static propTypes = {
    user: PropTypes.string,
  };

  // 画面が表示されるとき
  UNSAFE_componentWillMount() {
    this.userWillTransfer(this.props);
  }

  // 画面が更新されたとき
  // componentWillUpdate: v17で廃止
  // componentWillUpdate(nextProps) {
  //   this.userWillTransfer(this.props);
  // }

  // ログイン状態をチェック
  userWillTransfer(props) {
    const token = localStorage.getItem("shareIT_token");
    if (token !== null) {
      const jwt = JWT(token);
      var current_time = new Date().getTime() / 1000;
      if (current_time > jwt.exp) {
        // 有効期限切れのため再度ログインさせる
        this.setState({ isAuthenticated: false });
        localStorage.removeItem("currentPage");
        localStorage.removeItem("login_user_icon_URL");
        localStorage.removeItem("shareIT_token");
      } else {
        // ログイン済み
        this.setState({ isAuthenticated: true });
      }
    } else {
      // 未ログイン状態なのでログイン画面へ
      this.setState({ isAuthenticated: false });
    }
  }

  render() {
    return this.state.isAuthenticated ? (
      <Route children={this.props.children} />
    ) : (
      <Redirect to={"/login"} />
    );
  }
}

const mapStateToProps = "";

export default withRouter(connect(mapStateToProps)(Auth));
