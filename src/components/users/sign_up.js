import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
// 入力フォーム作成で使う
import { Field, reduxForm } from "redux-form";
import { getAllTopics } from "../../actions/topic";
import TopicSelectBox from "../presentational/atoms/topic_select_box";
import Loading from "../presentational/atoms/loading";
import { postUserEvent } from "../../actions/user";
import { Link } from "react-router-dom";

const ROOT_URL = "https://shareit-part2-pro.appspot.com";

let isUserNameCheck = false;
let isEmailCheck = false;
let isError = true;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderField = this.renderField.bind(this);

    this.state = {
      userNameCheckText: "",
      emailCheckText: "",
      result_user_name_num: 1,
      result_email_num: 1
    };
  }

  componentDidMount() {
    // 全トピックの取得
    this.props.getAllTopics();
  }

  // ユーザ情報を登録
  async onSubmit(values) {
    // 送信するトピックをセット
    values.interested_topics = this.refs.TopicSelectBox.getSendTopics("その他");

    delete values.confirm_password;

    // 登録
    await this.props.postUserEvent(values);

    // 登録後の遷移先
    this.props.history.push("/users");
  }

  // ユーザ名の重複チェック
  async onBlurUserName(e) {
    if (isUserNameCheck) {
      // フォーカスが外れたときの処理
      const userInfo = {
        user_name: e.target.value,
        email: ""
      };

      await axios
        .post(`${ROOT_URL}/signUp/check`, userInfo)
        .then(response => {
          this.setState({
            userNameCheckText: response.data.result_user_name_text,
            result_user_name_num: response.data.result_email_num
          });
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }

  // メアドの重複チェック
  async onBlurEmail(e) {
    if (isEmailCheck) {
      // フォーカスが外れたときの処理
      const userInfo = {
        user_name: "",
        email: e.target.value
      };

      await axios
        .post(`${ROOT_URL}/signUp/check`, userInfo)
        .then(response => {
          this.setState({
            emailCheckText: response.data.result_email_text,
            result_email_num: response.data.result_email_num
          });
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }

  renderField(field) {
    const {
      input,
      label,
      type,
      meta: { touched, error }
    } = field;

    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}

        {/* メアドの重複チェックの結果表示 */}
        {input.name === "email" && error === undefined && (
          <span>{this.state.emailCheckText}</span>
        )}

        {/* ユーザ名の重複チェックの結果表示 */}
        {input.name === "user_name" && error === undefined && (
          <span>{this.state.userNameCheckText}</span>
        )}
      </div>
    );
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    let isDuplicateName = this.state.result_user_name_num;
    let isDuplicateEmail = this.state.result_email_num;

    if (Object.values(this.props.allTopics).length !== 0) {
      // 全トピック
      const allTopics = this.props.allTopics;

      // 初期表示トピック
      const initTopics = "";
      return (
        <React.Fragment>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div>ユーザ登録</div>
            <div>
              ユーザ名:
              <Field
                label="ユーザ名"
                name="user_name"
                disabled={submitting}
                type="text"
                component={this.renderField}
                onBlur={e => this.onBlurUserName(e)}
              />
            </div>

            <div>
              メールアドレス:
              <Field
                label="メールアドレス"
                name="email"
                type="text"
                component={this.renderField}
                onBlur={e => this.onBlurEmail(e)}
              />
            </div>

            <div>
              興味のあるトピック
              <TopicSelectBox
                allTopics={allTopics}
                initTopics={initTopics}
                ref="TopicSelectBox"
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
              確認用パスワード
              <Field
                label="確認用パスワード"
                name="confirm_password"
                type="password"
                component={this.renderField}
              />
            </div>

            <div>
              <input
                type="submit"
                value="Submit"
                disabled={
                  isError || isDuplicateName || isDuplicateEmail || submitting
                }
              />
            </div>
          </form>
          <div>
            <Link to={`/login`}>ログイン</Link>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div>
            <Loading />
          </div>
        </React.Fragment>
      );
    }
  }
}

const validate = values => {
  const errors = {};

  // ユーザ名
  if (values.user_name) {
    if (values.user_name.length > 20 || values.user_name.length < 2) {
      errors.user_name = "ユーザ名は2文字以上20文字以内です";
      isUserNameCheck = false;
    } else {
      // ユーザ名の重複チェック
      isUserNameCheck = true;
    }
  } else {
    errors.user_name = "ユーザ名を入力して下さい";
    isUserNameCheck = false;
  }

  // メアド
  if (values.email) {
    let regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    if (!regexp.test(values.email)) {
      errors.email = "メールアドレスの書式が間違っています";
      isEmailCheck = false;
    } else {
      // メアドの重複チェック
      isEmailCheck = true;
    }
  } else {
    errors.email = "メールアドレスを入力して下さい";
    isEmailCheck = false;
  }

  // パスワード
  if (values.password) {
    if (values.password.length > 16 || values.password.length < 8) {
      errors.password = "パスワードは8文字以上16文字以内です";
    }
  } else {
    errors.password = "パスワードを入力して下さい";
  }

  // 確認用パスワード
  if (values.confirm_password) {
    if (
      values.confirm_password.length > 16 ||
      values.confirm_password.length < 8
    ) {
      errors.confirm_password = "パスワードは8文字以上16文字以内です";
    }
  } else {
    errors.confirm_password = "パスワードを入力して下さい";
  }

  // パスワードと確認用パスワード
  if (!errors.password && !errors.confirm_password) {
    if (!(values.password === values.confirm_password)) {
      errors.confirm_password = "パスワードと確認用パスワードが一致しません";
    }
  }

  if (Object.keys(errors).length === 0) {
    // 何もエラーがない場合
    isError = false;
  } else {
    isError = true;
  }
  return errors;
};

const mapDispatchToProps = { getAllTopics, postUserEvent };

// stateとactionをcomponentに関連付ける実装
// このstatusは状態のトップレベルを表す
// ReduxのStoreを第一引数にとる関数で、Componentにpropsとして渡すものをフィルタリングするときに使う。
const mapStateToProps = state => {
  // 全トピック
  const allTopics = state.topics;

  return { allTopics: allTopics };
};

// connect 第一引数はcomponentに渡すpropsを制御する
// 第二引数はreducerを呼び出して、reduxで管理しているstateを更新する
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  // enableReinitialize: When set to true, the form will reinitialize
  // every time the initialValues prop change. Defaults to false.
  // titleとbody属性を表示するときに使う
  // 直接詳細画面へアクセスしたとき(本来なら最初に記事一覧を取得して、それらの情報がブラウザのメモリに残った状態で、
  // 詳細へ行くとメモリから詳細を取得する)適宜、該当のイベントをAPIサーバから取得する
  // formにはユニークな名前を渡す
  reduxForm({ validate, form: "signUpForm", enableReinitialize: true })(SignUp)
);
