import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import thunk from "redux-thunk";
import { BrowserRouter, Switch } from "react-router-dom";
import { Route } from "react-router";
import UsersIndex from "./components/container/templates/users/index";
import UserShow from "./components/container/templates/users/detail_show";
import UserUpdateShow from "./components/container/templates/users/update_show";

import ArticlesIndex from "./components/container/templates/articles/index";
import ArticleShow from "./components/container/templates/articles/detail_show";
import ArticleUpdate from "./components/container/templates/articles/update_show";
import ArticleNew from "./components/container/templates/articles/create";
import SignUp from "./components/container/templates/users/sign_up";
import Login from "./components/container/templates/users/login";
import { composeWithDevTools } from "redux-devtools-extension";
import Auth from "./auth";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "./components/container/organisms/header";
import Footer from "./components/container/organisms/footer";
import NotFoundPage from "./components/container/templates/NotFoundPage";

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
        <Header />
        <main>
          <Switch>
            <Route exact path="/signUp" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Auth>
              <Switch>
                <Route exact path="/api/users/:userId" component={UserShow} />
                <Route exact path="/api/users" component={UsersIndex} />
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
                <Route path="*" component={NotFoundPage} />
              </Switch>
            </Auth>
          </Switch>
        </main>
        <Footer />
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
