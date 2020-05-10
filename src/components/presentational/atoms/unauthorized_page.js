import React from "react";
import ToAllArticlesButton from "Atoms/buttons/to_all_articles_button";
import ToAllUsersButton from "Atoms/buttons/to_all_users_button";

// 許可されていないページ
const UnauthorizedPage = (props) => {
  var ToSomething;
  if (props.page === "articles") {
    ToSomething = (
      <div>
        <ToAllArticlesButton />
      </div>
    );
  } else if (props.page === "users") {
    ToSomething = (
      <div>
        <ToAllUsersButton />
      </div>
    );
  }

  return (
    <React.Fragment>
      <div>許可されていません</div>
      {ToSomething}
    </React.Fragment>
  );
};

export default UnauthorizedPage;
