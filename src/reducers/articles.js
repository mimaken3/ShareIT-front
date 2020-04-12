import {
  SHOW_ALL_ARTICLES,
  SHOW_ARTICLE_DETAIL,
  UPDATE_ARTICLE,
  UPDATE_ARTICLE_EVENT,
  CREATE_ARTICLE_EVENT,
  DELETE_ARTICLE_EVENT
} from "../actions/article";
import _ from "lodash";

// reducers/index.jsに渡すためのexport
// reducerは関数として定義(引数は2つ)
// 第一引数の初期値はないので{}
// 受け取ったactionのtypeに応じて状態を変更して、その結果を返す
export default (articles = {}, action) => {
  switch (action.type) {
    case SHOW_ALL_ARTICLES:
      return _.mapKeys(action.response.data, "article_id");

    case SHOW_ARTICLE_DETAIL:
    case CREATE_ARTICLE_EVENT:
    case UPDATE_ARTICLE_EVENT:
      const data = action.response.data;
      // {article_id: 5, article_title: "vimでビジュアルモードに変更", created_user_id: 3, article_content: ":q + v or V", article_topics: "3,12,13,20,", …}
      // 他でid5が削除された場合に、最新のid5の記事を更新するため...articlesと記述
      // ...articlesでイベントのオブジェクトを展開して、
      // [data.article_id]をkeyとしたdataというオブジェクトを持って、上書きした情報をまるっとわたす
      return { ...articles, [data.article_id]: data };

    case UPDATE_ARTICLE:
      const data2 = action.response.data;
      return { ...articles, [data2.artice_id]: data2 };

    case DELETE_ARTICLE_EVENT:
      delete articles[action.articleId];
      // スプレット演算子を使用し、更新後の記事一覧を表示
      return { ...articles };

    default:
      return articles;
  }
};
