import React from "react";
import { CylinderSpinLoader } from "react-css-loaders";

// 読込中
export default function Loading() {
  return (
    <React.Fragment>
      <div>
        <CylinderSpinLoader size={18} color="#00CCFF" />
      </div>
    </React.Fragment>
  );
}
