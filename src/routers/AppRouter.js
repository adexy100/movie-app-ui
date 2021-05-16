import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ToastContainer, Slide } from "react-toastify";
import * as route from "constants/routes";

import Navigation from "components/common/Navigation";
import Footer from "components/common/Footer";
import ScrollTop from "components/common/ScrollTop";
import ThemeToggler from "components/common/ThemeToggler";
import ProgressTrigger from "components/hoc/Progress";

import Error from "views/error/Error";
import PageNotFound from "views/error/PageNotFound";

export const history = createBrowserHistory();

/* eslint-disable react/jsx-boolean-value */
const AppRouter = () => (
  <Router history={history}>
    <>
      <ToastContainer
        autoClose={3000}
        bodyClassName="toast-body"
        limit={1}
        newestOnTop={true}
        pauseOnHover={false}
        position={window.screen.width <= 480 ? "bottom-right" : "top-right"}
        progressStyle={{ backgroundColor: "yellow" }}
        toastClassName="toast"
        transition={Slide}
      />
      <Navigation />
      <ScrollTop />
      <div className="theme__toggler-desktop">
        <ThemeToggler />
      </div>
      <main id="main">
        <Switch>
          <Route component={Error} exact={true} path={route.ERROR} />
          <Route component={PageNotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  </Router>
);

export default AppRouter;
