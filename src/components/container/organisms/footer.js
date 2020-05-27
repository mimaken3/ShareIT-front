import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    clear: "both",
    height: "200px",
    backgroundColor: "gray",
    marginTop: "100px",
    display: "block",
    position: "absolute",
    bottom: "0",
    width: "100%",
  },
  title: {
    color: "white",
    fontSize: "40px",
    paddingTop: "20px",
    paddingLeft: "20px",
  },
}));

// フッター
const Footer = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.footer}>
        <div className={classes.title}>ShareIT</div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
