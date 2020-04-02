import React, { Component } from "react";
import { connect } from "react-redux";
// 入力フォーム作成で使う
import { Field, reduxForm } from "redux-form";
import { getArticleDetail, putEvent } from "../actions";
import { Link } from "react-router-dom";
// import _ from "lodash";

class ArticleUpdate extends Component {
  //   constructor(props) {
  //     super(props);
  //     // クラスのインスタンスでasync onSubmit...のインスタンスが使える
  //     this.onSubmit = this.onSubmit.bind(this);
  //   }
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // 外部のAPIに対してイベントを取得する
  componentDidMount() {
    // 複雑な処理はcomponentに書かずに外(action)に記述
    const { articleId } = this.props.match.params;
    if (articleId) this.props.getArticleDetail(articleId);
  }

  renderField(field) {
    const {
      input,
      label,
      type,
      // mata: { touched, error }
      meta: { error }
    } = field;
    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {/* {touched && error && <span>{error}</span>} */}
        {error && <span>{error}</span>}
      </div>
      //   <TextField
      //     hintText={label}
      //     floatingLabelText={label}
      //     type={type}
      //     errorText={touched && error}
      //     {...input}
      //     fullWidth={true}
      //   />
    );
  }

  //   // 非同期で行う
  //   async onSubmit(values){
  //     await this.prop.
  // }

  // 記事を更新
  async onSubmit(values) {
    await this.props.putEvent(values);
    // 更新ボタンを押したとに表示するPATH
    this.props.history.push("/article/" + values.article_id);
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    if (this.props.article) {
      return (
        <form onSubmit={handleSubmit(this.onSubmit)}>
          {/* <form onSubmit={handleSubmit(this.onSubmit)}> */}
          <div>
            タイトル:
            <Field
              label="article_title"
              name="article_title"
              type="text"
              component={this.renderField}
            />
          </div>
          <div>
            内容:
            <Field
              label="article_content"
              name="article_content"
              type="text"
              component={this.renderField}
            />
          </div>
          <div>
            トピック:
            <Field
              label="article_topics"
              name="article_topics"
              type="text"
              component={this.renderField}
            />
          </div>
          <div>作成日: {this.props.article.created_date}</div>
          {/* </form> */}

          <input
            type="submit"
            value="Submit"
            disable={pristine || submitting}
          />
          <Link to={`/articles`}>一覧画面へ</Link>
        </form>
      );
    } else {
      return (
        <React.Fragment>
          <div>Now loading</div>
        </React.Fragment>
      );
    }
  }
}

const validate = values => {
  const errors = {};
  if (!values.article_title)
    errors.article_title = "タイトルを入力してください";
  if (!values.article_content)
    errors.article_content = "内容を入力してください";
};

// stateとactionをcomponentに関連付ける実装
// このstatusは状態のトップレベルを表す
// ReduxのStoreを第一引数にとる関数で、Componentにpropsとして渡すものをフィルタリングするときに使う。
const mapStateToProps = (state, ownProps) => {
  // 詳細画面で必要な各種情報を取得

  const article = state.articles[ownProps.match.params.articleId];

  // 初期状態でどんな値を表示するかをinitialValuesで設定
  return { initialValues: article, article: article };
};

const mapDispatchToProps = { getArticleDetail, putEvent };

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
  reduxForm({ validate, form: "articleUpdateForm", enableReinitialize: true })(
    ArticleUpdate
  )
);
