import { SHOW_ALL_ARTICLES } from "../actions";
import _ from "lodash";

// reducers/index.jsに渡すためのexport
// reducerは関数として定義(引数は2つ)
// 第一引数の初期値はないので{}
// 受け取ったactionのtypeに応じて状態を変更して、その結果を返す
export default (articles = {}, action) => {
  switch (action.type) {
    case SHOW_ALL_ARTICLES:
      return _.mapKeys(action.response.data, "article_id");
    default:
      return articles;
  }
};
