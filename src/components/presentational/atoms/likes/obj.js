import React from "react";
import like from "./like.png";
import unlike from "./unlike.png";

// いいねのオブジェクト
const LikeObj = (props) => {
  if (props.obj) {
    return (
      <React.Fragment>
        <img src={like} alt="like" width="20px" height="20px" />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <img src={unlike} alt="unlike" width="20px" height="20px" />
      </React.Fragment>
    );
  }
};
export default LikeObj;
