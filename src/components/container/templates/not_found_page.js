import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

class NotFoundPage extends React.Component {
  render() {
    return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <h2>404 Not Found</h2>
        </div>
      </Container>
    );
  }
}

export default NotFoundPage;
