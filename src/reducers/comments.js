import {
  SHOW_ALL_COMMENTS,
  CREATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
} from "Actions/comment";
import getIteratoredObjArr from "Modules/getIteratoredObjArr";

// reducerは関数として定義(引数は2つ)
// 第一引数の初期値はないので{}
// 受け取ったactionのtypeに応じて状態を変更して、その結果を返す
export default (comments = {}, action) => {
  switch (action.type) {
    case SHOW_ALL_COMMENTS:
      return action.response.data;

    case CREATE_COMMENT:
      const comment = action.response.data;

      // イテレータ付きのオブジェクト配列を返す
      const iteratoredCreateCommentsObj = getIteratoredObjArr(comments);

      return [...iteratoredCreateCommentsObj, comment];

    case UPDATE_COMMENT:
      const updatedComment = action.response.data;

      // イテレータ付きのオブジェクト配列を返す
      const iteratoredCreateCommentsObj2 = getIteratoredObjArr(comments);

      return {
        ...iteratoredCreateCommentsObj2,
        [action.index]: updatedComment,
      };

    case DELETE_COMMENT:
      delete comments[action.index];

      // イテレータ付きのオブジェクト配列を返す
      const iteratoredCommentsObj = getIteratoredObjArr(comments);

      return { ...iteratoredCommentsObj };

    default:
      return comments;
  }
};