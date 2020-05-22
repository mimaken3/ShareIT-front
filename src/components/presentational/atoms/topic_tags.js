import React from "react";
import Chip from "@material-ui/core/Chip";

// トピックタグ
const TopicTags = (props) => {
  const topicsArr = props.topics.split("/");
  const topicTagsRender = topicsArr.map((topic) => (
    <span key={topic} style={{ marginRight: "3px" }}>
      <Chip label={topic} variant="outlined" size="small" />
    </span>
  ));

  return <React.Fragment>{topicTagsRender}</React.Fragment>;
};

export default TopicTags;
