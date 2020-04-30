import React from "react";

// いいねのオブジェクト
const LikeObj = (props) => {
  if (props.obj) {
    return (
      <React.Fragment>
        <div>いいね済み！</div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div>未いいね！</div>
      </React.Fragment>
    );
  }
};
export default LikeObj;
