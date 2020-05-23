import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import thunk from "redux-thunk";
import { BrowserRouter, Switch } from "react-router-dom";
import { Route } from "react-router";
import UsersIndex from "Templates/users/index";
import UserShow from "Templates/users/detail_show";
import UserUpdateShow from "Templates/users/update_show";

import ArticlesIndex from "Templates/articles/index";
import ArticleShow from "Templates/articles/detail_show";
import ArticleUpdate from "Templates/articles/update_show";
import ArticleNew from "Templates/articles/create";
import SignUp from "Templates/users/sign_up";
import Login from "Templates/users/login";
import { composeWithDevTools } from "redux-devtools-extension";
import Auth from "./auth";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Header from "Organisms/header";
// import Footer from "Organisms/footer";
import NotFoundPage from "Templates/not_found_page";

import * as serviceWorker from "./serviceWorker";

const enhancer =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk);

const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: "none", // ボタンのラベルが大文字になるのを防ぐ
    },
  },
});

// // アプリケーション内のstateはここに集約されている
// const store = createStore(reducer, enhancer);
// thunkを導入するとactionの代わりに関数を返すことが出来るようになす
const store = createStore(reducer, enhancer);
class App extends Component {
  render() {
    const body = {
      display: "block",
      width: "100%",
      height: "100%",
      margin: "0px",
    };

    const content = {
      width: "100%",
      maxWidth: "850px",
      marginRight: "auto",
      marginLeft: "auto",
    };

    const header = {
      position: "fixed" /* ヘッダーの固定 */,
      top: "0px" /* 位置(上0px) */,
      left: "0px" /* 位置(右0px) */,
    };

    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div style={body}>
            <BrowserRouter>
              <Header className={header} />
              <div style={content}>
                <main>
                  <Switch>
                    <Route exact path="/signUp" component={SignUp} />
                    <Route exact path="/login" component={Login} />
                    <Auth>
                      <Switch>
                        <Route exact path="/" component={ArticlesIndex} />
                        <Route
                          exact
                          path="/api/users/:userId"
                          component={UserShow}
                        />
                        <Route exact path="/api/users" component={UsersIndex} />
                        <Route
                          exact
                          path="/api/users/:userId/article"
                          component={ArticleNew}
                        />
                        <Route
                          exact
                          path="/api/articles"
                          component={ArticlesIndex}
                        />
                        <Route
                          exact
                          path="/api/articles/:articleId"
                          component={ArticleShow}
                        />
                        <Route
                          exact
                          path="/api/articles/:articleId/edit"
                          component={ArticleUpdate}
                        />
                        <Route
                          exact
                          path="/api/users/:userId/edit"
                          component={UserUpdateShow}
                        />
                        <Route path="*" component={NotFoundPage} />
                      </Switch>
                    </Auth>
                  </Switch>
                </main>
              </div>
            </BrowserRouter>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
