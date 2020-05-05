import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { loginUserEvent } from "Actions/user";

let isUserNameCheck = false;
let isEmailCheck = false;
class Login extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static propTypes = {
    message: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  };

  // ログイン
  async onSubmit(values) {
    const userInfo = {
      user_name: values.user_name,
      password: values.password,
    };
    // 送信
    await this.props.loginUserEvent(userInfo).then(() => {
      this.props.history.push("/api/articles");
    });
  }

  renderField(field) {
    const {
      input,
      label,
      type,
      meta: { touched, error },
    } = field;

    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <React.Fragment>
        <div>Login</div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            ユーザ名:
            <Field
              label="ユーザ名"
              name="user_name"
              disabled={submitting}
              type="text"
              component={this.renderField}
            />
          </div>

          <div>
            パスワード
            <Field
              label="パスワード"
              name="password"
              type="password"
              component={this.renderField}
            />
          </div>

          <div>
            <input
              type="submit"
              value="Submit"
              disabled={submitting || !isUserNameCheck || !isEmailCheck}
            />
          </div>
        </form>
        <div>
          <Link to={`/signUp`}>アカウントを作成</Link>
        </div>
      </React.Fragment>
    );
  }
}

const validate = (values) => {
  const errors = {};

  // ユーザ名
  if (values.user_name) {
    if (values.user_name.length > 20 || values.user_name.length < 2) {
      errors.user_name = "ユーザ名は2文字以上20文字以内です";
      isUserNameCheck = false;
    } else {
      isUserNameCheck = true;
    }
  } else {
    errors.user_name = "ユーザ名を入力して下さい";
    isUserNameCheck = false;
  }

  // パスワード
  if (values.password) {
    if (values.password.length > 16 || values.password.length < 8) {
      errors.password = "パスワードは8文字以上16文字以内です";
      isEmailCheck = false;
    } else {
      isEmailCheck = true;
    }
  } else {
    errors.password = "パスワードを入力して下さい";
    isEmailCheck = false;
  }

  return errors;
};

const mapDispatchToProps = { loginUserEvent };

const mapStateToProps = "";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ validate, form: "loginForm" })(Login));
