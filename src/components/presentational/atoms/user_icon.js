import React from "react";

// ユーザ一のアイコン
const UserIcon = (props) => {
  const style = { borderRadius: "50%" };
  return (
    <React.Fragment>
      <img
        style={style}
        src={props.iconData}
        alt="img"
        width="100"
        height="100"
      />
    </React.Fragment>
  );
};

export default UserIcon;
