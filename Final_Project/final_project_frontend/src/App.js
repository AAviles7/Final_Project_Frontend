import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Login from './containers/Login'
import Logout from './components/Logout'
import WorkspaceMenu from './containers/WorkspaceMenu'
import { Provider } from 'react-redux'

class App extends Component {

  constructor(props) {
    super(props);

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    this.state = {
      user
    };
  }

  login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({ user });
  };

  logout = () => {
    localStorage.removeItem("user");
    this.setState({ user: null });
  };

  render(){
    return(
      <Container>
        <Router>
          <Switch>
            <Route
              exact path="/login"
              render={(routeProps) => (
                <Login login={this.login} {...routeProps} />
              )}
            />
            {!this.state.user && (
                <Route path="/">
                  <Redirect to="/login" />
                </Route>
              )}
            <Route
              exact
              path="/select_workspace"
              render={(routeProps) => (
                <WorkspaceMenu {...routeProps} />
              )}
            />
            <Route
              exact path="/login"
              render={(routeProps) => (
                <Login login={this.login} {...routeProps} />
              )}
            />
            <Route
              exact
              path="/logout"
              render={(routeProps) => (
                <Logout logout={this.logout} {...routeProps} />
              )}
            />
          </Switch>
        </Router>
      </Container>
    )
  }
}

export default App;
