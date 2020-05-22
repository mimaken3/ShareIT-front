import {
  SHOW_LIKED_ARTICLES_BY_USER_ID,
  EMPTY_LIKED_ARTICLES,
} from "Actions/article";
import getJSTCreatedDateArr from "Modules/getJST_created_date_arr";
import _ from "lodash";

// reducerは関数として定義(引数は2つ)
// 第一引数の初期値はないので{}
// 受け取ったactionのtypeに応じて状態を変更して、その結果を返す
let initialState = {
  is_searched: false,
  search_user: 0,
  search_topics: "0",
  is_empty: true,
  ref_pg: 0,
  all_paging_num: 0,
  articles: {},
};

export default (like_articles = initialState, action) => {
  switch (action.type) {
    case SHOW_LIKED_ARTICLES_BY_USER_ID:
      localStorage.removeItem("currentPage");
      localStorage.setItem("currentPage", action.response.data.ref_pg);

      // 作成日を年月日時分に変換
      const _articles = action.response.data.articles;
      const articles2 = getJSTCreatedDateArr(_articles);

      return Object.assign({}, like_articles, {
        is_searched: action.response.data.is_searched,
        search_user: action.response.data.search_user,
        search_topics: action.response.data.search_topics,
        is_empty: action.response.data.is_empty,
        ref_pg: action.response.data.ref_pg,
        all_paging_num: action.response.data.all_paging_num,
        articles: _.mapKeys(articles2, "article_id"),
      });

    case EMPTY_LIKED_ARTICLES:
      return Object.assign({}, like_articles, {
        is_empty: true,
        ref_pg: 0,
        all_paging_num: 0,
        articles: {},
      });
    default:
      return like_articles;
  }
};
