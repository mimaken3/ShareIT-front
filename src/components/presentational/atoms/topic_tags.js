import React from "react";
import Chip from "@material-ui/core/Chip";
import getNonDuplicationArr from "Modules/get_non_duplication_arr";

// トピックタグ
const TopicTags = (props) => {
  const topicsArr = props.topics.split("/");

  // 重複を削除
  var nonDuplicationTopicsArr = getNonDuplicationArr(topicsArr);

  const topicTagsRender = nonDuplicationTopicsArr.map((topic) => (
    <span key={topic} style={{ marginRight: "3px" }}>
      <Chip label={topic} variant="outlined" size="small" />
    </span>
  ));

  return <React.Fragment>{topicTagsRender}</React.Fragment>;
};

export default TopicTags;
