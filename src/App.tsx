import { BrowserRouter as Router, Switch, Route, RouteProps, RouteComponentProps } from "react-router-dom"
import routes from "./config/routes"
import AuthRoute from "./components/AuthRoute"

function App() {

  return (
    <div>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <Route 
              key={index} 
              path={route.path}  
              exact={route.exact} 
              render={(routeProps: RouteComponentProps<any>) => {
                if (route.protected)
                return (
                  <AuthRoute>
                    <route.component {...routeProps} />
                  </AuthRoute>
                );

              return <route.component {...routeProps} />;
              }}
            />
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
