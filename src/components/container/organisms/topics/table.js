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

const TopicTable = (props) => {
  const { topics } = props;

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
              <TableCell style={{ width: "50px" }}>ID</TableCell>
              <TableCell align="left" style={{ width: "150px" }}>
                トピック名
              </TableCell>
              <TableCell align="left" style={{ width: "200px" }}>
                作成日時
              </TableCell>
              <TableCell align="left" style={{ width: "200px" }}>
                最終更新日時
              </TableCell>
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
