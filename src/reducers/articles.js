import {
  SHOW_ALL_ARTICLES,
  SHOW_ARTICLE_DETAIL,
  UPDATE_ARTICLE_EVENT,
  CREATE_ARTICLE_EVENT,
  DELETE_ARTICLE_EVENT,
} from "../actions/article";
import _ from "lodash";

// reducerは関数として定義(引数は2つ)
// 第一引数の初期値はないので{}
// 受け取ったactionのtypeに応じて状態を変更して、その結果を返す
let initialState = { ref_pg: 0, all_paging_num: 0, articles: {} };
export default (articles = initialState, action) => {
  switch (action.type) {
    case SHOW_ALL_ARTICLES:
      localStorage.removeItem("currentPage");
      localStorage.setItem("currentPage", action.response.data.ref_pg);

      return Object.assign({}, articles, {
        ref_pg: action.response.data.ref_pg,
        all_paging_num: action.response.data.all_paging_num,
        articles: _.mapKeys(action.response.data.articles, "article_id"),
      });

    case SHOW_ARTICLE_DETAIL:
    case CREATE_ARTICLE_EVENT:
    case UPDATE_ARTICLE_EVENT:
      const data = action.response.data;
      return Object.assign({}, articles, {
        ref_pg: 0,
        all_paging_num: 0,
        articles: { ...articles.articles, [data.article_id]: data },
      });

    case DELETE_ARTICLE_EVENT:
      delete articles.articles[action.articleId];
      // スプレット演算子を使用し、更新後の記事一覧を表示
      return Object.assign({}, articles, {
        ref_pg: 0,
        all_paging_num: 0,
        articles: { ...articles.articles },
      });
    default:
      return articles;
  }
};
