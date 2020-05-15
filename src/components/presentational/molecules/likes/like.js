import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import { toggleLike } from "Actions/like";
import LikeNum from "Atoms/likes/sum_num";
import LikeObj from "Atoms/likes/obj";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";

class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: this.props.isLiked,
      likeNum: this.props.likeNum,
    };
  }

  // いいね済みに
  onLike() {
    const likeArticle = {
      userID: this.props.loginUserID,
      articleID: this.props.articleID,
      isLiked: !this.state.isLiked,
    };
    this.setState({
      isLiked: this.state.isLiked + 1,
      likeNum: this.state.likeNum + 1,
    });
    this.props.toggleLike(likeArticle);
  }

  // 未いいねに
  offLike() {
    const likeArticle = {
      userID: this.props.loginUserID,
      articleID: this.props.articleID,
      isLiked: !this.state.isLiked,
    };
    this.setState({
      isLiked: this.state.isLiked - 1,
      likeNum: this.state.likeNum - 1,
    });
    this.props.toggleLike(likeArticle);
  }

  render() {
    var isLiked;
    if (this.state.isLiked) {
      isLiked = (
        <React.Fragment>
          <Button
            onClick={() => this.offLike()}
            className={this.props.classes.button}
          >
            <LikeObj obj={true} />
          </Button>
        </React.Fragment>
      );
    } else {
      isLiked = (
        <React.Fragment>
          <Button
            onClick={() => this.onLike()}
            className={this.props.classes.button}
          >
            <LikeObj obj={false} />
          </Button>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div>{isLiked}</div>
        <div className={this.props.classes.likeNum}>
          <LikeNum likeNum={this.state.likeNum} />
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = { toggleLike };

const mapStateToProps = "";

const styles = {
  button: {
    padding: 5,
    minHeight: 0,
    minWidth: 0,
    maxHeight: 30,
    maxWidth: 30,
  },
  likeNum: {
    marginLeft: "5px",
  },
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: "likeForm" }),
  withStyles(styles)
)(Like);
