import React from "react";

// 合計いいね数
const LikeNum = (props) => {
  return (
    <React.Fragment>
      <div style={{ fontSize: "17px" }}>{props.likeNum}</div>
    </React.Fragment>
  );
};

export default LikeNum;
