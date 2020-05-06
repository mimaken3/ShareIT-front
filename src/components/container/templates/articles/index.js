import React, { Component } from "react";
import { connect } from "react-redux";
import { showAllArticles, emptyArticles } from "Actions/article";
import ToAllUsersButton from "Atoms/to_all_users_button";
import Loading from "Templates/loading";
import CreateArticleButton from "Atoms/create_article_button";
import AllArticles from "Organisms/all_articles";
import Paging from "Atoms/paging";

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

  PagingClick() {
    this.props.emptyArticles();
    if (this.props.allPagingNum) {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.props.articles && this.props.allPagingNum && !this.props.loading) {
      return (
        <React.Fragment>
          <AllArticles refName="articles" />
          <div>
            <Paging
              refName="articles"
              userID={this.props.userID}
              refPg={this.props.refPg}
              allPagingNum={this.props.allPagingNum}
              callback={() => this.PagingClick()}
            />
          </div>
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
    refPg: state.articles.ref_pg,
  };
};

const mapDispatchToProps = {
  showAllArticles,
  emptyArticles,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesIndex);
