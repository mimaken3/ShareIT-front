import React from "react";
import _ from "lodash";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Topic from "Molecules/topics/topic";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  id: {
    width: "50px",
  },
  topicNameCell: {
    width: "150px",
  },
  date: {
    width: "200px",
  },
}));

const TopicTable = (props) => {
  const { topics } = props;
  const classes = useStyles();

  // 管理するトピックがある場合
  let renderTopics = _.map(topics, (topic) => (
    <TableRow key={topic.topic_id}>
      <Topic
        topicID={topic.topic_id}
        topicName={topic.topic_name}
        createdDate={topic.created_date}
        updatedDate={topic.updated_date}
      />
    </TableRow>
  ));

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.id}>ID</TableCell>
              <TableCell className={classes.topicNameCell}>
                トピック名
              </TableCell>
              <TableCell className={classes.date}>作成日時</TableCell>
              <TableCell className={classes.date}>最終更新日時</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>{renderTopics}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TopicTable;
