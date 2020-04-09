import React, { Component } from "react";
import { connect } from "react-redux";
import { showAllArticles } from "../../actions/article";
import { Link } from "react-router-dom";
import _ from "lodash";

class ArticlesIndex extends Component {
  // 外部のAPIに対してイベントを取得する
  componentDidMount() {
    // 複雑な処理はcomponentに書かずに外(action)に書く
    this.props.showAllArticles();
  }

  // 記事を表示する関数
  renderArticles() {
    return _.map(this.props.articles, article => (
      <div key={article.article_id}>
        {article.article_id}{" "}
        <Link to={`/article/${article.article_id}`}>
          {article.article_title}
        </Link>{" "}
        {article.article_content}
      </div>
    ));
  }

  render() {
    return (
      <React.Fragment>
        <div>記事一覧</div>
        {this.renderArticles()}
      </React.Fragment>
    );
  }
}

// stateとactionをcomponentに関連付ける実装
// このstatusは状態のトップレベルを表す
const mapStateToProps = state => ({ articles: state.articles });

const mapDispatchToProps = { showAllArticles };

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesIndex);
