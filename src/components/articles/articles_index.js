import React, { Component } from "react";
import { connect } from "react-redux";
import { showAllArticles } from "../../actions/article";
import { Link } from "react-router-dom";
import ToAllUsersButton from "../presentational/atoms/to_all_users_button";
import Loading from "../container/templates/loading";
import CreateArticleButton from "../presentational/atoms/create_article_button";
import Paging from "../presentational/atoms/paging";
import _ from "lodash";

class ArticlesIndex extends Component {
  // 外部のAPIに対してイベントを取得する
  componentDidMount() {
    // 複雑な処理はcomponentに書かずに外(action)に書く
    this.props.showAllArticles(1);
  }

  // 記事を表示する関数
  renderArticles() {
    return _.map(this.props.articles, (article) => (
      <div key={article.article_id}>
        {article.article_id}{" "}
        <Link to={`/api/articles/${article.article_id}`}>
          {article.article_title}
        </Link>{" "}
        {article.article_content}
      </div>
    ));
  }

  render() {
    if (
      this.props.articles &&
      this.props.refPg &&
      Object.values(this.props.articles).length >= 1
    ) {
      return (
        <React.Fragment>
          <div>記事一覧</div>
          {this.renderArticles()}
          <div>
            <CreateArticleButton />
          </div>
          <div>
            <ToAllUsersButton />
          </div>

          <div>
            <Paging
              refName="articles"
              refPg={this.props.refPg}
              allPagingNum={this.props.allPagingNum}
            />
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

const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles,
    refPg: state.articles.ref_pg,
    allPagingNum: state.articles.all_paging_num,
  };
};

const mapDispatchToProps = { showAllArticles };

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesIndex);
