import { BrowserRouter as Router, Switch, Route, RouteComponentProps } from "react-router-dom"
import routes from "./config/routes"
import AuthRoute from "./components/AuthRoute"
import { useEffect, useState } from 'react'
import { auth } from "./config/firebase";

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('User detected')
      } else {
        console.log('No user detected')
      }

      setLoading(false);
    })
  }, [])

  if (loading) 
    return (
      <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )

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
