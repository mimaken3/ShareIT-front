import React from "react";
import { CylinderSpinLoader } from "react-css-loaders";

// 読込中
export default function Loading() {
  return (
    <React.Fragment>
      <div>
        {/* 青にしたい場合は color="#00CCFF" */}
        <CylinderSpinLoader size={18} />
      </div>
    </React.Fragment>
  );
}
