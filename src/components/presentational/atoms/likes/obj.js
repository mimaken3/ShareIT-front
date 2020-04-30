import React from "react";

// いいねのオブジェクト
const LikeObj = (props) => {
  if (props.obj) {
    return (
      <React.Fragment>
        <div>❤</div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div>♡</div>
      </React.Fragment>
    );
  }
};
export default LikeObj;
