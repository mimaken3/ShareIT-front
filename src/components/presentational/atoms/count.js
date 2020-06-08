import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    float: "right",
  },
  errCount: {
    color: "red",
  },
}));

// 入力された文字数表示
const Count = (props) => {
  const classes = useStyles();

  let Count;
  if (props.param === "profile") {
    // ユーザのプロフィール
    if (props.text.length > 999) {
      Count = (
        <div className={classes.box}>
          <span className={classes.errCount}>{props.text.length}</span>
          /999 文字
        </div>
      );
    } else {
      Count = <div className={classes.box}>{props.text.length}/999 文字</div>;
    }
  } else if (props.param === "articleTitle") {
    // 記事のタイトル
    if (props.text.length > 255) {
      Count = (
        <div className={classes.box}>
          <span className={classes.errCount}>{props.text.length}</span>
          /255 文字
        </div>
      );
    } else {
      Count = <div className={classes.box}>{props.text.length}/255 文字</div>;
    }
  } else if (props.param === "articleContent") {
    // 記事の内容
    if (props.text.length > 9999) {
      Count = (
        <div className={classes.box}>
          <span className={classes.errCount}>{props.text.length}</span>
          /9999 文字
        </div>
      );
    } else {
      Count = <div className={classes.box}>{props.text.length}/9999 文字</div>;
    }
  } else if (props.param === "comment") {
    // コメント
    if (props.text.length > 999) {
      Count = (
        <div className={classes.box}>
          <span className={classes.errCount}>{props.text.length}</span>
          /999 文字
        </div>
      );
    } else {
      Count = Count = (
        <div className={classes.box}>{props.text.length}/999 文字</div>
      );
    }
  } else if (props.param === "topic") {
    // トピック名
    if (props.text.length > 30) {
      Count = (
        <div className={classes.box}>
          <span className={classes.errCount}>{props.text.length}</span>
          /30 文字
        </div>
      );
    } else {
      Count = Count = (
        <div className={classes.box}>{props.text.length}/30 文字</div>
      );
    }
  }

  return <React.Fragment>{Count}</React.Fragment>;
};

export default Count;
