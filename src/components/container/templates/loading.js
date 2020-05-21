import React from "react";
import { CylinderSpinLoader } from "react-css-loaders";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

// 読込中
export default function Loading() {
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      {/* 青にしたい場合は color="#00CCFF" */}
      <CylinderSpinLoader size={18} />
    </Container>
  );
}
