import React from "react";

// ユーザ一のアイコン
const UserIcon = (props) => {
  return (
    <React.Fragment>
      <img src={props.iconData} alt="img" width="100" height="100" />
    </React.Fragment>
  );
};

export default UserIcon;
