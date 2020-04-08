import { GET_ALL_TOPICS } from "../actions/";
// 配列のデータを編集するのが得意なパッケージ
// import _ from "lodash";

// reducers/index.jsに渡すためのexport
// reducerは関数として定義(引数は2つ)
// 第一引数の初期値はないので{}
// 受け取ったactionのtypeに応じて状態を変更して、その結果を返す
export default (topics = {}, action) => {
  switch (action.type) {
    case GET_ALL_TOPICS:
      // return _.mapKeys(action.response.data, "topic_id");
      return action.response.data;
    default:
      return topics;
  }
};
