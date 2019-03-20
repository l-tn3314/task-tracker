import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

import Register from './register';

export default function root_init(node) {
  let tasks = window.tasks;
  ReactDOM.render(<Root tasks={tasks} />, node);
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
            <Header session={this.state.session} root={this} />
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

function Header(props) {
  let {root, session} = props;
  let sessionInfo;

  if (session == null) {
    sessionInfo = 
        <div className="form-inline my-2">
          <input type="email" placeholder="email" 
                  onChange={(ev) => root.update_login_form({email: ev.target.value})} />
          <input type="password" placeholder="password" 
                  onChange={(ev) => root.update_login_form({password: ev.target.value})} />
          <button className="btn btn-secondary" onClick={() => root.login()}>Login</button>
        </div>;
  } else {
    sessionInfo = <div className="my-2">
        <p>Logged in as: {session.user_id}</p>
      </div>;
  }

  return <div>
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="col-5">
        <h2><Link to={"/"}>Task Tracker</Link></h2>
      </div>
      <div className="col-2">
        <p><Link to={"/register"} onClick={root.fetch_users.bind(root)}>Users</Link></p>
      </div>
      <div className="col-5">
        {sessionInfo}
      </div>
    </nav>
  </div>;
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

