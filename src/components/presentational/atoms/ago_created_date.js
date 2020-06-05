import React from "react";

// x分前、x日前の作成日時
const AgoCreatedDate = (props) => {
  const createdDate = new Date(props.date);

  createdDate.setHours(createdDate.getHours() - 9);
  const nowDate = new Date();

  // ミリ秒
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = month * 365;

  let display;
  if ((nowDate - createdDate) / year > 1) {
    display = Math.floor((nowDate - createdDate) / year) + "年前";
  } else if ((nowDate - createdDate) / month > 1) {
    display = Math.floor((nowDate - createdDate) / month) + "ヶ月前";
  } else if ((nowDate - createdDate) / day > 1) {
    display = Math.floor((nowDate - createdDate) / day) + "日前";
  } else if ((nowDate - createdDate) / hour > 1) {
    display = Math.floor((nowDate - createdDate) / hour) + "時間前";
  } else if ((nowDate - createdDate) / minute > 1) {
    display = Math.floor((nowDate - createdDate) / minute) + "分前";
  } else if ((nowDate - createdDate) / second > 1) {
    display = Math.floor((nowDate - createdDate) / second) + "秒前";
  }

  return <React.Fragment>{display}</React.Fragment>;
};

export default AgoCreatedDate;
