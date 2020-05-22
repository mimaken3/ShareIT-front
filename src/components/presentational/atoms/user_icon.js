import React from "react";

// ユーザ一のアイコン
const UserIcon = (props) => {
  const style = {
    borderRadius: "50%",
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
  };
  return (
    <React.Fragment>
      <img style={style} src={props.iconData} alt="img" />
    </React.Fragment>
  );
};

export default UserIcon;
