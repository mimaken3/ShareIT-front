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
import { composeWithDevTools } from "redux-devtools-extension";

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
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/users" component={UsersIndex} />
        <Route exact path="/user/:userId" component={UserShow} />
        <Route exact path="/user/:userId/article" component={ArticleNew} />
        <Route exact path="/articles" component={ArticlesIndex} />
        <Route exact path="/article/:articleId" component={ArticleShow} />
        <Route
          exact
          path="/article/:articleId/edit"
          component={ArticleUpdate}
        />
        <Route exact path="/user/:userId/edit" component={UserUpdateShow} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
