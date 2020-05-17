import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

// メアドの重複チェックの結果
const ResultEmailDuplicationCheck = (props) => {
  if (props.result !== 2) {
    if (props.result === 1) {
      // 重複していた場合
      return (
        <div style={{ color: "red" }}>
          このメールアドレスは既に使われています...
        </div>
      );
    } else if (props.result === 0) {
      // 重複していなかった場合
      return (
        <div style={{ color: "#00EE00" }}>
          <CheckCircleOutlineIcon size={5} />
        </div>
      );
    }
  } else {
    return (
      <React.Fragment>
        <CircularProgress
          variant="indeterminate"
          disableShrink
          size={18}
          thickness={4}
          {...props}
          style={{ color: "grey" }}
        />
      </React.Fragment>
    );
  }
};

export default ResultEmailDuplicationCheck;
