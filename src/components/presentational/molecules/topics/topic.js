import React from "react";
import TableCell from "@material-ui/core/TableCell";
import DeleteButton from "Atoms/buttons/delete_button";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    float: "right",
    marginLeft: "5px",
  },
  editButton: {
    float: "right",
  },
}));

// トピック管理のトピック
const Topic = (props) => {
  const { topicID, topicName, createdDate, updatedDate } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableCell align="right">{topicID}</TableCell>
      <TableCell align="left">{topicName}</TableCell>
      <TableCell align="left">{createdDate}</TableCell>
      <TableCell align="left">{updatedDate}</TableCell>
      <TableCell align="right">
        <div className={classes.deleteButton}>
          <DeleteButton param="topic" />
        </div>
        <div className={classes.editButton}>
          <Button variant="outlined" startIcon={<EditIcon />}>
            編集
          </Button>
        </div>
      </TableCell>
    </React.Fragment>
  );
};

export default Topic;
