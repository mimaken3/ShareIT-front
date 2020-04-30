import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import { toggleLike } from "../../../../actions/like";

class Like extends Component {
  toggleLikeInfo() {
    const likeArticle = {
      userID: this.props.loginUserID,
      articleID: this.props.articleID,
      isLiked: !this.props.isLiked,
    };
    this.props.toggleLike(likeArticle);
  }

  render() {
    var isLiked;
    if (this.props.isLiked) {
      isLiked = (
        <div>
          <Button onClick={() => this.toggleLikeInfo()}>いいね済み！</Button>
        </div>
      );
    } else {
      isLiked = (
        <div>
          <Button onClick={() => this.toggleLikeInfo()}>未いいね</Button>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div>いいね数 {this.props.likeNum}</div>
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
