import {
  GET_LIKED_USERS_BY_ARTICLE_ID,
  TOGGLE_LIKE_AT_ARTICLE_DETAIL,
} from "Actions/user";

let initialState = {
  is_empty: true,
  users: {},
};

// 記事にいいねした全ユーザ
export default (liked_users = initialState, action) => {
  switch (action.type) {
    case GET_LIKED_USERS_BY_ARTICLE_ID:
      return Object.assign({}, liked_users, {
        is_empty: action.response.data.is_empty,
        users: action.response.data.users,
      });
    case TOGGLE_LIKE_AT_ARTICLE_DETAIL:
      const userObj = action.userObj;
      if (action.isLiked) {
        // いいねしたとき

        // いいねしたユーザ一覧の先頭に自身を追加
        let newObj = {
          0: userObj,
        };
        for (let _i in liked_users.users) {
          let i = parseInt(_i);
          newObj[i + 1] = liked_users.users[i];
        }

        return Object.assign({}, liked_users, {
          is_empty: false,
          users: newObj,
        });
      } else {
        // いいねを外したとき

        // いいねしたユーザ一覧から自身を削除
        let deleteIndex;
        for (let _i in liked_users.users) {
          let i = parseInt(_i);
          if (liked_users.users[i].user_id === userObj.user_id) {
            deleteIndex = i;
          }
        }

        delete liked_users.users[deleteIndex];

        // ユーザ一覧オブジェクトのkeyを'0"スタートにする
        let newObj = {};
        for (let i = 0; i < Object.values(liked_users.users).length; i++) {
          newObj[i] = liked_users.users[i + 1];
        }

        return Object.assign({}, liked_users, {
          is_empty: Object.values(liked_users.users).length === 0,
          users: newObj,
        });
      }

    default:
      return liked_users;
  }
};
