import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import api from './api';

import Header from './header';
import Register from './register';

export default function root_init(node, store) {
  let tasks = window.tasks;
  ReactDOM.render(
    <Provider store={store}>
      <Root tasks={tasks} />
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login_form: {email: "", password: ""},
      session: null,
      users: [],
    };
  } 
 
  login() {
    $.ajax("/api/auth", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(this.state.login_form),
      success: (resp) => {
        console.log("login success");
        this.setState(_.assign({}, this.state, { session: resp.data }));
      },
      error: (resp) => {
        console.log("login fail");
      }
    });
  }

  update_login_form(data) {
    let form = _.assign({}, this.state.login_form, data);
    let state = _.assign({}, this.state, { login_form: form })
    this.setState(state);
  } 

  fetch_users() {
    $.ajax("/api/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        console.log("yes");
        this.setState(_.assign({}, this.state, { users: resp.data }));
      },
      error: (resp) => {
        console.log("oh no");
      },
    });
  }

  render() {
    return <div className="container">
        <Router>
          <div>
            <Header session={this.state.session} />
            <Route path="/" exact={true} render={() =>
              <TaskList tasks={this.props.tasks} />
            } />
            <Route path="/register" exact={true} component={Register} />
            <Route path="/users" exact={true} render={() =>
              <UserList users={this.state.users} />
            } />
          </div>
        </Router>
      </div>;
  }
}

function TaskList(props) {
  let tasks = _.map(props.tasks, (t) => <Task key={t.id} task={t} />);
  return <div className="row">
      {tasks}
    </div>; 
}

function Task(props) {
  let {task} = props;
  return <div className="card col-4">
      <div className="card-body">
        <h3 className="card-title">{task.title}</h3>
        <p className="card-text">{task.description}</p>
      </div>
    </div>;
}

function UserList(props) {
  let users = _.map(props.users, (user) => <User key={user.id} user={user} />);

  return <div className="row">
      <div className="col-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </table>
      </div>
    </div>;
}

function User(props) {
  let {user} = props;

  return <tr>
      <td>{user.email}</td>
    </tr>;  
}

