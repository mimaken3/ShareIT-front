import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

class Like extends Component {
  render() {
    console.log(this.props.loginUserID);
    var isLiked;
    if (this.props.isLiked) {
      isLiked = <div>いいね済み！</div>;
    } else {
      isLiked = <div>未いいね</div>;
    }
    return (
      <React.Fragment>
        <div>いいね数 {this.props.likeNum}</div>
        <div>{isLiked}</div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = "";

const mapStateToProps = "";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "likeForm" })(Like));
