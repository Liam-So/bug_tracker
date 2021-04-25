import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import routes from "./config/routes"
import AuthRoute from "./components/AuthRoute"
import { auth } from "./config/firebase";
import { useState } from "react";

function App() {

  return (
    <div>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} exact={route.exact} component={route.component}/>
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
