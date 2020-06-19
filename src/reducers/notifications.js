import {
  GET_ALL_NOTIFICATIONS,
  CHANGE_NON_READ_TO_READ,
} from "Actions/notification";
//   import getJSTCreatedDateArr from "Modules/getJST_created_date_arr";
import _ from "lodash";

let initialState = {
  is_empty: true,
  notifications: {},
};
export default (notifications = initialState, action) => {
  switch (action.type) {
    case GET_ALL_NOTIFICATIONS:
      const responseNotifications = action.response.data.notifications;
      // 作成日を年月日時分に変換
      // const _users = action.response.data.users;
      // const _users2 = getJSTCreatedDateArr(_users);

      return Object.assign({}, notifications, {
        is_empty: action.response.data.is_empty,
        notifications: _.mapKeys(responseNotifications, "notification_id"),
      });

    case CHANGE_NON_READ_TO_READ:
      const notificationID = action.response.data.notification_id;

      const notification = action.response.data;

      return Object.assign({}, notifications, {
        is_empty: false,
        notifications: {
          ...notifications.notifications,
          [notificationID]: notification,
        },
      });

    default:
      return notifications;
  }
};
