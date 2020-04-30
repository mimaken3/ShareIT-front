import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import { toggleLike } from "../../../../actions/like";
import LikeNum from "../../atoms/likes/sum_num";

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
        <div>
          <Button onClick={() => this.offLike()}>いいね済み！</Button>
        </div>
      );
    } else {
      isLiked = (
        <div>
          <Button onClick={() => this.onLike()}>未いいね</Button>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div>
          <LikeNum likeNum={this.state.likeNum} />
        </div>
        <div>{isLiked}</div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = { toggleLike };

const mapStateToProps = "";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "likeForm" })(Like));
