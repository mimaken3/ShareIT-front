import React, { Component } from "react";
import ToAllUsersButton from "Atoms/to_all_users_button";
import CreateArticleButton from "Atoms/create_article_button";
import AllArticlesWithPaging from "Organisms/all_articles_with_paging";

// 記事一覧ページ
class ArticlesIndex extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <AllArticlesWithPaging historyAction={this.props.history.action} />
        </div>

        <div>
          <CreateArticleButton />
        </div>

        <div>
          <ToAllUsersButton />
        </div>
      </React.Fragment>
    );
  }
}

export default ArticlesIndex;
