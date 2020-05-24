import React from "react";
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "Organisms/tab_panel";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AllArticlesWithPaging from "Organisms/all_articles_with_paging";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  tab: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginTop: "30px",
  },
}));

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const TabsIndex = withRouter((props) => {
  const classes = useStyles();

  // タブ名の幅を半分に
  const theme = createMuiTheme({
    overrides: {
      MuiTab: {
        root: {
          minWidth: "150px",
          width: "50%",
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.tab}>
        <Tabs
          value={props.refTab}
          onChange={props.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="記事" icon={<PersonPinIcon />} {...a11yProps(0)} />
          <Tab label="いいね" icon={<FavoriteIcon />} {...a11yProps(1)} />
          {/* <TabLabel label="記事" />
          <TabLabel label="いいね" /> */}
        </Tabs>
        <TabPanel value={props.refTab} index={0}>
          <AllArticlesWithPaging
            param="userDetailShow"
            userID={props.userID}
            historyAction={props.history.action}
          />
        </TabPanel>
        <TabPanel value={props.refTab} index={1}>
          <AllArticlesWithPaging
            param="userLikedArticles"
            userID={props.userID}
            historyAction={props.history.action}
          />
        </TabPanel>
      </div>
    </ThemeProvider>
  );
});

export default TabsIndex;
