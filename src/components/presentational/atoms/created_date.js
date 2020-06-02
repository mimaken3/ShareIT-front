import React from "react";

// 作成日時
const CreatedDate = (props) => {
  // 秒数のない日付
  const displayDate = props.createdDate.slice(0, -3);

  return <React.Fragment>{displayDate}</React.Fragment>;
};

export default CreatedDate;
