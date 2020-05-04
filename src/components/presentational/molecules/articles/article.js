import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reduxForm } from "redux-form";
import Like from "Molecules/likes/like";

class Article extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.article.article_id}{" "}
        <Link to={`/api/articles/${this.props.article.article_id}`}>
          {this.props.article.article_title}
        </Link>{" "}
        {this.props.article.article_content}
        <Like
          articleID={this.props.article.article_id}
          isLiked={this.props.article.is_liked}
          likeNum={this.props.article.like_num}
          loginUserID={this.props.loginUserID}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = "";

const mapStateToProps = "";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "articleForm" })(Article));
