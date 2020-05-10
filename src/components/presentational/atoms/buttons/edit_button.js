import React from "react";
import { Link } from "react-router-dom";

// 編集ボタン
const EditButton = (props) => {
  return (
    <React.Fragment>
      <Link to={`/api/${props.path}/${props.id}/edit`}>編集</Link>
    </React.Fragment>
  );
};

export default EditButton;
