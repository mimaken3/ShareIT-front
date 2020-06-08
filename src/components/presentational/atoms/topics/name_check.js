import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

// トピック名の重複チェックの結果
const ResultTopicNameDuplicationCheck = (props) => {
  const { isDuplicated, message, checkLoading } = props;
  //   if (props.result !== 2) {
  //     if (props.result === 1) {
  //       // 重複していた場合
  //       return (
  //         <div style={{ color: "red" }}>このユーザ名は既に使われています...</div>
  //       );
  //     } else if (props.result === 0) {
  //       // 重複していなかった場合
  //       return (
  //         <div style={{ color: "#00EE00" }}>
  //           <CheckCircleOutlineIcon />
  //         </div>
  //       );
  //     }
  //   } else {
  if (checkLoading) {
    return (
      <React.Fragment>
        <CircularProgress
          variant="indeterminate"
          disableShrink
          size={18}
          thickness={4}
          style={{ color: "grey" }}
        />
      </React.Fragment>
    );
  } else {
    if (isDuplicated) {
      return (
        <>
          <span style={{ color: "red" }}>次の名前で重複してます</span>
          <span style={{ marginLeft: "4px" }}>{message}</span>
        </>
      );
    } else {
      // 重複していなかった場合
      return (
        <div style={{ color: "#00EE00" }}>
          <CheckCircleOutlineIcon />
        </div>
      );
    }
  }
};
// };

export default ResultTopicNameDuplicationCheck;
