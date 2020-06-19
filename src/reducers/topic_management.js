import {
  GET_TOPICS_BY_USER_ID,
  CREATE_TOPIC_EVENT,
  UPDATE_TOPIC_NAME,
  DELETE_TOPIC_EVENT,
} from "Actions/topic";
import _ from "lodash";
import getJSTCreatedDateArr from "Modules/getJST_created_date_arr";
import getJSTUpdatedDateArr from "Modules/get_jst_updated_date";
import getIteratoredObjArr from "Modules/getIteratoredObjArr";

let initialState = {
  is_empty: true,
  topics: {},
};
export default (topicManagement = initialState, action) => {
  switch (action.type) {
    case GET_TOPICS_BY_USER_ID:
      // 作成日を年月日時分に変換
      const _topics = action.response.data.topics;
      const topicsCreate = getJSTCreatedDateArr(_topics);

      // 更新日を年月日時分に変換
      const topics = getJSTUpdatedDateArr(topicsCreate);

      return {
        is_empty: action.response.data.is_empty,
        topics: _.mapKeys(topics, "topic_id"),
      };

    case CREATE_TOPIC_EVENT:
    case UPDATE_TOPIC_NAME:
      // 作成日を年月日時分に変換
      const _createdTopic = action.response.data;
      const _createdTopic2 = getJSTCreatedDateArr(_createdTopic);

      // 更新日を年月日時分に変換
      const createdTopic = getJSTUpdatedDateArr(_createdTopic2);

      // イテレータ付きのオブジェクト配列を返す
      // const iteratoredCreateTopicsObj = getIteratoredObjArr(
      //   topicManagement.topics
      // );

      return {
        is_empty: false,
        topics: {
          ...topicManagement.topics,
          [createdTopic.topic_id]: createdTopic,
        },
      };

    case DELETE_TOPIC_EVENT:
      const res = action.response;

      if (res.status === 200) {
        // サーバ側でトピックの削除に成功したら
        delete topicManagement.topics[action.topicID];
      }

      // イテレータ付きのオブジェクト配列を返す
      const iteratoredTopicsObj = getIteratoredObjArr(topicManagement.topics);

      return {
        is_empty:
          Object.values(topicManagement.topics).length > 0 ? false : true,
        topics: _.mapKeys(iteratoredTopicsObj, "topic_id"),
      };

    default:
      return topicManagement;
  }
};
