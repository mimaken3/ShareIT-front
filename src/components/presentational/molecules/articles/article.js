import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reduxForm } from "redux-form";

class Article extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.article.article_id}{" "}
        <Link to={`/api/articles/${this.props.article.article_id}`}>
          {this.props.article.article_title}
        </Link>{" "}
        {this.props.article.article_content}
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
