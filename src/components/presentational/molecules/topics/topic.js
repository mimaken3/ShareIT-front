import React, { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import DeleteButton from "Atoms/buttons/delete_button";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import TopicNameEdit from "./edit";
import SendIcon from "@material-ui/icons/Send";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { updateTopicName } from "Actions/topic";

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    float: "right",
    marginLeft: "5px",
  },
  editButton: {
    float: "right",
  },
  topicName: {
    wordBreak: "break-word",
    fontSize: "16px",
  },
}));

// トピック管理のトピック
const Topic = (props) => {
  const {
    topicID,
    topicName,
    createdDate,
    updatedDate,
    updateTopicName,
  } = props;
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const [isTopicNameError, setIsTopicNameError] = useState(true);
  const [updatedTopicName, setUpdatedTopicName] = useState(topicName);

  const editTopicName = () => {
    setIsEdit(true);
  };

  const cancelEditTopicName = () => {
    setIsEdit(false);
  };

  const changeTopicName = (topicName) => {
    setUpdatedTopicName(topicName);
  };

  // 更新ボタン: 非活性化
  const topicNameError = () => {
    setIsTopicNameError(true);
  };

  // 更新ボタン: 活性化
  const nonTopicNameError = () => {
    setIsTopicNameError(false);
  };

  // 更新
  const onSubmit = () => {
    // 更新ボタン: 非活性化
    setIsTopicNameError(true);

    const loginUserInfo = getLoginUserInfo();
    const topicObj = {
      proposed_user_id: loginUserInfo.userID,
      topic_id: topicID,
      topic_name: updatedTopicName,
    };

    // 更新 実行
    updateTopicName(topicObj).then(() => {
      cancelEditTopicName();
    });
  };

  let updatedDateRender;
  if (createdDate !== updatedDate) {
    updatedDateRender = <span>{updatedDate}</span>;
  }

  let TopicDisplay;
  let editBox;
  if (isEdit) {
    TopicDisplay = (
      <>
        <div>
          <TopicNameEdit
            topicName={topicName}
            topicID={topicID}
            topicNameError={topicNameError}
            nonTopicNameError={nonTopicNameError}
            changeTopicName={changeTopicName}
          />
        </div>
      </>
    );
    editBox = (
      <>
        <Button onClick={() => cancelEditTopicName()} variant="outlined">
          キャンセル
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ color: "white", float: "right", marginLeft: "5px" }}
          disabled={isTopicNameError}
          onClick={onSubmit}
          startIcon={<SendIcon />}
        >
          更新
        </Button>
      </>
    );
  } else {
    TopicDisplay = (
      <>
        <span className={classes.topicName}>{topicName}</span>
      </>
    );
    editBox = (
      <>
        <div className={classes.deleteButton}>
          <DeleteButton param="topic" />
        </div>
        <div className={classes.editButton}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => editTopicName()}
          >
            編集
          </Button>
        </div>
      </>
    );
  }

  return (
    <React.Fragment>
      <TableCell align="right">{topicID}</TableCell>
      <TableCell align="left">
        <span className={classes.topicName}>{TopicDisplay}</span>
      </TableCell>
      <TableCell align="left">{createdDate}</TableCell>
      <TableCell align="left">{updatedDateRender}</TableCell>
      <TableCell align="right">{editBox}</TableCell>
    </React.Fragment>
  );
};

const mapDispatchToProps = { updateTopicName };

const mapStateToProps = "";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "TopicForm" })(Topic));
