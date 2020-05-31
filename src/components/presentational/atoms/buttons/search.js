import React from "react";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

// 検索ボタン
const SearchButton = (props) => {
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={props.handleSubmit}
        startIcon={<SearchIcon />}
      >
        検索
      </Button>
    </React.Fragment>
  );
};

export default SearchButton;
