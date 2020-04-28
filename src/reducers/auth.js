import { LOGIN_USER_EVENT } from "../actions/user";

let initialState = {
  message: null,
  token: null,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_EVENT:
      initialState = {
        message: action.response.data.message,
        token: action.response.data.token,
        user: action.response.data.user,
      };

      // If login was successful, set the token in local storage
      if (action.response.data.message === "success") {
        // TODO: deprecated
        // Local Storageにtokenとアイコン名をセット
        localStorage.setItem("shareIT_token", action.response.data.token);
        localStorage.setItem(
          "login_user_icon_URL",
          action.response.data.user.icon_name
        );
        localStorage.setItem("currentPage", 1);
      } else {
        // TODO: 失敗時のユーザ情報をstateに格納
        console.log("失敗...");
        console.log(action.response.data);
        return initialState;
      }
      return initialState;

    default:
      return state;
  }
};
