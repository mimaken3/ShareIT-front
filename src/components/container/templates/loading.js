import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { Roller } from "react-awesome-spinners";

const useStyles = makeStyles((theme) => ({
  loadingFailed: {
    marginTop: "0px",
    height: "500px",
  },
  loading: {
    height: "327px",
    textAlign: "center",
    marginTop: "40px",
  },
}));

// 読込中
const Loading = () => {
  const classes = useStyles();
  const [timeOut, setTimeOut] = useState(false);

  useEffect(() => {
    // １０秒間 読込中の場合、リロードを促す
    const timer = setTimeout(() => {
      setTimeOut(true);
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (timeOut) {
    return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.loadingFailed}>
          <Alert severity="warning">
            <AlertTitle>読み込みに失敗</AlertTitle>
            再読み込みをして下さい
          </Alert>
        </div>
      </Container>
    );
  } else {
    return (
      <React.Fragment>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <div className={classes.loading}>
            <Roller />
          </div>
        </Container>
      </React.Fragment>
    );
  }
};

export default Loading;
