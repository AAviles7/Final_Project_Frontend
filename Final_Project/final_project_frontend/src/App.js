import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Login from './containers/Login'
import Logout from './components/Logout'
import WorkspaceMenu from './containers/WorkspaceMenu'
import WorkspaceJoin from './containers/WorkspaceJoin'
import Workspace from './containers/Workspace'
import { connect } from 'react-redux'

let WORKSPACE_URL = 'http://127.0.0.1:4000/workspaces'

class App extends Component {

  componentDidMount = async () => {
    const res = await fetch(WORKSPACE_URL)
    const workspaces = await res.json()
    this.props.get_workspaces(workspaces)
  }

  login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    this.props.login_user(user)
  };

  logout = () => {
    localStorage.removeItem("user");
    this.props.logout_user()
  };

  render(){
    return(
        <Router>
          <Switch>
            <Route
              exact path="/login"
              render={(routeProps) => (
                <Login login={this.login} {...routeProps} />
              )}
            />
            {!this.props.user && (
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
              exact
              path={this.props.selected ? `/join_workspace/${this.props.selected.name}` : null}
              render={(routeProps) => (
                <WorkspaceJoin workspace={this.props.selected} {...routeProps} />
              )}
            />
            <Route
              exact
              path={this.props.selected ? `/workspace/${this.props.selected.name}` : null}
              render={(routeProps) => (
                <Workspace workspace={this.props.selected} {...routeProps} />
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.user.user,
      selected: state.workspace.selected_workspace
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      get_workspaces: (workspaces) => dispatch({ type: 'GET_WORKSPACES', workspaces: workspaces }),
      login_user: (user) => dispatch({ type: 'GET_USER', user }),
      logout_user: () => dispatch({ type: 'LOGOUT_USER' })
  }
}

export default connect(mapStateToProps ,mapDispatchToProps)(App);
