import {
  SHOW_ALL_COMMENTS,
  CREATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
} from "Actions/comment";
import getIteratoredObjArr from "Modules/getIteratoredObjArr";
import getJSTCreatedDateArr from "Modules/getJST_created_date_arr";

// reducerは関数として定義(引数は2つ)
// 第一引数の初期値はないので{}
// 受け取ったactionのtypeに応じて状態を変更して、その結果を返す
export default (comments = {}, action) => {
  switch (action.type) {
    case SHOW_ALL_COMMENTS:
      // 作成日を年月日時分に変換
      const _allComments = action.response.data;
      const allComments = getJSTCreatedDateArr(_allComments);
      return allComments;

    case CREATE_COMMENT:
      // 作成日を年月日時分に変換
      const _comment = action.response.data;
      const comment = getJSTCreatedDateArr(_comment);

      // イテレータ付きのオブジェクト配列を返す
      const iteratoredCreateCommentsObj = getIteratoredObjArr(comments);

      return [...iteratoredCreateCommentsObj, comment];

    case UPDATE_COMMENT:
      // 作成日を年月日時分に変換
      const _updatedComment = action.response.data;
      const updatedComment = getJSTCreatedDateArr(_updatedComment);

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
