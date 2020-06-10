import { GET_LIKED_USERS_BY_ARTICLE_ID } from "Actions/user";

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
    default:
      return liked_users;
  }
};
