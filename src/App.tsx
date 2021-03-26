import React from 'react';
import './App.scss';
import HomeView from "./HomeModule/HomeView";
import 'bootstrap/dist/css/bootstrap.min.css';
// @ts-ignore
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import InfoView from "./InfoModule/InfoView";
import Page404 from "./ErrorModule/Page404";
import LoginView from "./LoginModule/LoginView";

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path={"/error"} component={Page404}/>
              <Route exact path={"/login"} component={LoginView}/>
              <Route exact path={"/"} component={HomeView}/>
              <Route exact path={"/start"} component={HomeView}/>
              <Route exact path={"/info"} component={InfoView}/>
              {/*<Route exact path={"/login"} render={props => ((this.state.userLogged) ? <MainView {...props}/> : <LoginView {...props}/>)}/>*/}
              <Redirect to={"/error"}/>
          </Switch>
      </Router>
  );
}

export default App;
