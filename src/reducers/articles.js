import {
  SHOW_ALL_ARTICLES,
  SHOW_ALL_ARTICLES_BY_USER_ID,
  SHOW_SEARCHING_FOR_ALL_ARTICLES,
  SHOW_ARTICLE_DETAIL,
  UPDATE_ARTICLE_EVENT,
  CREATE_ARTICLE_EVENT,
  DELETE_ARTICLE_EVENT,
  ARTICLE_NOT_EXIST,
  EMPTY_ARTICELS,
} from "Actions/article";
import { TOGGLE_LIKE } from "Actions/like";
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

export default (articles = initialState, action) => {
  switch (action.type) {
    case SHOW_ALL_ARTICLES:
    case SHOW_ALL_ARTICLES_BY_USER_ID:
    case SHOW_SEARCHING_FOR_ALL_ARTICLES:
      localStorage.removeItem("currentPage");
      localStorage.setItem("currentPage", action.response.data.ref_pg);

      // 作成日を年月日時分に変換
      const _articles = action.response.data.articles;
      const articles2 = getJSTCreatedDateArr(_articles);

      return Object.assign({}, articles, {
        is_searched: action.response.data.is_searched,
        search_user: action.response.data.search_user,
        search_topics: action.response.data.search_topics,
        is_empty: action.response.data.is_empty,
        ref_pg: action.response.data.ref_pg,
        all_paging_num: action.response.data.all_paging_num,
        articles: _.mapKeys(articles2, "article_id"),
      });

    case SHOW_ARTICLE_DETAIL:
    case CREATE_ARTICLE_EVENT:
    case UPDATE_ARTICLE_EVENT:
    case TOGGLE_LIKE:
      // 作成日を年月日時分に変換
      const _data = action.response.data;
      const data = getJSTCreatedDateArr(_data);

      return Object.assign({}, articles, {
        is_empty: false,
        ref_pg: articles.ref_pg,
        all_paging_num: articles.all_paging_num,
        articles: {
          ...articles.articles,
          [data.article_id]: data,
        },
      });

    case DELETE_ARTICLE_EVENT:
      delete articles.articles[action.articleId];
      // スプレット演算子を使用し、更新後の記事一覧を表示
      return Object.assign({}, articles, {
        is_empty: false,
        ref_pg: 0,
        all_paging_num: 1,
        articles: { ...articles.articles },
      });

    case ARTICLE_NOT_EXIST:
      return Object.assign({}, articles, {
        is_empty: true,
        ref_pg: 0,
        all_paging_num: 1,
        articles: {},
      });

    case EMPTY_ARTICELS:
      return Object.assign({}, articles, {
        is_empty: true,
        ref_pg: 0,
        all_paging_num: 0,
        articles: {},
      });
    default:
      return articles;
  }
};
