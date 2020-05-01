import { SHOW_ALL_COMMENTS, CREATE_COMMENT } from "../actions/comment";

// reducerは関数として定義(引数は2つ)
// 第一引数の初期値はないので{}
// 受け取ったactionのtypeに応じて状態を変更して、その結果を返す
export default (comments = {}, action) => {
  switch (action.type) {
    case SHOW_ALL_COMMENTS:
      return action.response.data;
    case CREATE_COMMENT:
      const comment = action.response.data;

      return [...comments, comment];
    default:
      return comments;
  }
};
