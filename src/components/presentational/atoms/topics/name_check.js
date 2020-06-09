import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  duplicationMessage: {
    color: "red",
  },
  duplicatedTopicName: {
    marginLeft: "4px",
  },
  duplicationOkayCircle: {
    color: "#00EE00",
  },
}));

// トピック名の重複チェックの結果
const ResultTopicNameDuplicationCheck = (props) => {
  const { isDuplicated, message, checkLoading, styles } = props;
  const classes = useStyles();

  if (checkLoading) {
    return (
      <React.Fragment>
        <CircularProgress
          variant="indeterminate"
          disableShrink
          size={18}
          thickness={4}
          style={{ color: "grey", marginTop: "2px" }}
        />
      </React.Fragment>
    );
  } else {
    if (isDuplicated) {
      return (
        <>
          <span className={classes.duplicationMessage} style={{ ...styles }}>
            既に次の名前で登録されてます
          </span>
          <span className={classes.duplicatedTopicName}>「{message}」</span>
        </>
      );
    } else {
      // 重複していなかった場合
      return (
        <div className={classes.duplicationOkayCircle}>
          <CheckCircleOutlineIcon />
        </div>
      );
    }
  }
};

export default ResultTopicNameDuplicationCheck;
