import React from 'react';
import './App.scss';
import HomeView from "./HomeModule/HomeView";
import 'bootstrap/dist/css/bootstrap.min.css';
// @ts-ignore
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import InfoView from "./InfoModule/InfoView";
import Page404 from "./ErrorModule/Page404";
import LoginView from "./LoginModule/LoginView";
import {isLogged} from "./Serwis";
import UstawieniaView from "./UstawieniaModule/UstawieniaView";

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path={"/error"} component={Page404}/>
              <Route exact path={"/login"} component={isLogged()? () => <Redirect to={"/start"}/> : LoginView}/>
              <Route exact path={"/"} component={isLogged()? () => <Redirect to={"/kalendarz"}/> : LoginView}/>
              <Route exact path={"/kalendarz"} component={isLogged()? HomeView : LoginView}/>
              <Route exact path={"/ustawienia"} component={isLogged()? UstawieniaView : LoginView}/>
              <Route exact path={"/info"} component={isLogged()? InfoView : LoginView}/>
              {/*<Route exact path={"/login"} render={props => ((this.state.userLogged) ? <MainView {...props}/> : <LoginView {...props}/>)}/>*/}
              <Redirect to={"/error"}/>
          </Switch>
      </Router>
  );
}

export default App;
