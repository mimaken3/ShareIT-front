import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import ButtonBase from "@material-ui/core/ButtonBase";
import TopicTags from "Atoms/topic_tags";
import UserIcon from "Atoms/user_icon";
import { createMuiTheme } from "@material-ui/core/styles";
import { ScrollTo } from "react-scroll-to";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 700,
    marginTop: "20px",
  },
  memuUserIcon: {
    width: "50px",
    height: "50px",
    marginRight: "10px",
  },
  cardBox: {
    display: "block",
    textAlign: "initial",
    width: "100%",
  },
  cardContent: {
    fontSize: "18px",
  },
  // プロフィールの内容の文字列を...で省略
  content: {
    marginBottom: "10px",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
  },
}));

const theme = createMuiTheme({
  overrides: {
    MuiCardContent: {
      root: {
        // TODO: 要改修
        // ↓のように記述しないと高さが一瞬ずれて表示される
        // 記事の中身が「display: block」が勝手についたり外れたりする
        padding: "0px 20px 24px",
      },
    },
  },
});

const User = withRouter((props) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.root}>
        <ScrollTo>
          {({ scroll }) => (
            <ButtonBase
              className={classes.cardBox}
              onClick={() => {
                scroll({ x: 0, y: 0 });
                handleEvent();
              }}
            >
              <CardHeader
                avatar={
                  <div className={classes.memuUserIcon}>
                    <UserIcon iconData={props.user.icon_name} />
                  </div>
                }
                titleTypographyProps={{ variant: "h6" }}
                title={props.user.user_name}
              />
              <CardContent className={classes.cardContent}>
                <div className={classes.content}>{props.user.profile}</div>
                <TopicTags topics={props.user.interested_topics} />
              </CardContent>
            </ButtonBase>
          )}
        </ScrollTo>
      </Card>
    </ThemeProvider>
  );

  function handleEvent() {
    props.history.push("/users/" + props.user.user_id);
  }
});

export default User;
