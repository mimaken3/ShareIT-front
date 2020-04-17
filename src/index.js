import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import thunk from "redux-thunk";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UsersIndex from "./components/users/users_index";
import UserShow from "./components/users/user_show";
import UserUpdateShow from "./components/users/user_update_show";

import ArticlesIndex from "./components/articles/articles_index";
import ArticleShow from "./components/articles/article_show";
import ArticleUpdate from "./components/articles/article_update";
import ArticleNew from "./components/articles/article_new";
import SignUp from "./components/users/sign_up";
import Login from "./components/users/login";
import { composeWithDevTools } from "redux-devtools-extension";
import Auth from "./auth";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "./components/container/organisms/header";
import Footer from "./components/container/organisms/footer";

import * as serviceWorker from "./serviceWorker";

const enhancer =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk);

// // アプリケーション内のstateはここに集約されている
// const store = createStore(reducer, enhancer);
// thunkを導入するとactionの代わりに関数を返すことが出来るようになす
const store = createStore(reducer, enhancer);
ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Auth>
            <Header />
            <main>
              <Route exact path="/api/users" component={UsersIndex} />
              <Route exact path="/api/users/:userId" component={UserShow} />
              <Route
                exact
                path="/api/users/:userId/article"
                component={ArticleNew}
              />
              <Route exact path="/api/articles" component={ArticlesIndex} />
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
            </main>
            <Footer />
          </Auth>
        </Switch>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
