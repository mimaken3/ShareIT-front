import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

// 許可されていないページ
const UnauthorizedPage = (props) => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h2>許可されていないページです</h2>
      </div>
    </Container>
  );
};

export default UnauthorizedPage;
