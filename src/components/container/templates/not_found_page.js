import React from "react";
import ToAllArticlesButton from "Atoms/to_all_articles_button";

class NotFoundPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>404 Not Found</div>
        <ToAllArticlesButton />
      </React.Fragment>
    );
  }
}

export default NotFoundPage;
