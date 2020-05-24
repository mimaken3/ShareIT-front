import React from "react";

// スクロールタブ
const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <React.Fragment>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
      >
        {value === index && children}
      </div>
    </React.Fragment>
  );
};

export default TabPanel;
