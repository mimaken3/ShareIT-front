import React, { Component } from "react";
import { connect } from "react-redux";
import { showAllArticles } from "../../actions/article";
import ToAllUsersButton from "../presentational/atoms/to_all_users_button";
import Loading from "../container/templates/loading";
import CreateArticleButton from "../presentational/atoms/create_article_button";
import AllArticles from "../container/organisms/all_articles";

class ArticlesIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  // 外部のAPIに対してイベントを取得する
  componentDidMount() {
    // 複雑な処理はcomponentに書かずに外(action)に書く
    this.props.showAllArticles(1).then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    if (this.props.articles && this.props.allPagingNum && !this.state.loading) {
      return (
        <React.Fragment>
          <AllArticles refName="articles" />

          <div>
            <CreateArticleButton />
          </div>
          <div>
            <ToAllUsersButton />
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
    allPagingNum: state.articles.all_paging_num,
    articles: state.articles.articles,
  };
};

const mapDispatchToProps = { showAllArticles };

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesIndex);
