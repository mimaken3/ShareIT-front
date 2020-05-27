// import React from "react";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import PersonPinIcon from "@material-ui/icons/PersonPin";
// import Tab from "@material-ui/core/Tab";

// function a11yProps(index) {
//   return {
//     id: `scrollable-force-tab-${index}`,
//     "aria-controls": `scrollable-force-tabpanel-${index}`,
//   };
// }

// // タブ
// const TabLabel = (props) => {
//   let TabDisplay;
//   if (props.label === "記事") {
//     TabDisplay = (
//       <Tab label="記事" icon={<PersonPinIcon />} {...a11yProps(0)} />
//     );
//   } else if (props.label === "いいね") {
//     TabDisplay = (
//       <Tab label="いいね" icon={<FavoriteIcon />} {...a11yProps(1)} />
//     );
//   }

//   return <React.Fragment>{TabDisplay}</React.Fragment>;
// };

// export default TabLabel;
