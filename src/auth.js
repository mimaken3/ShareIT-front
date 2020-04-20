import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router";
import PropTypes from "prop-types";

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
    if (!localStorage.getItem("shareIT_token")) {
      this.setState({ isAuthenticated: false });
    } else {
      this.setState({ isAuthenticated: true });
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
