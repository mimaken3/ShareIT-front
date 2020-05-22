import { ALL_USERS_FOR_SELECT_BOX } from "Actions/user";

let initialState = {
  users: {},
};
export default (selectUsers = initialState, action) => {
  switch (action.type) {
    case ALL_USERS_FOR_SELECT_BOX:
      return Object.assign({}, selectUsers, {
        users: action.response.data.users,
      });
    default:
      return selectUsers;
  }
};
