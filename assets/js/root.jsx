import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

export default function root_init(node) {
  let tasks = window.tasks;
  ReactDOM.render(<Root tasks={tasks} />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
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
            <Header root={this} />
            <Route path="/" exact={true} render={() =>
              <TaskList tasks={this.props.tasks} />
            } />
            <Route path="/users" exact={true} render={() =>
              <UserList users={this.state.users} />
            } />
          </div>
        </Router>
      </div>;
  }
}

function Header(props) {
  let {root} = props;

  return <div>
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="col-5">
        <h2><Link to={"/"}>Task Tracker</Link></h2>
      </div>
      <div className="col-2">
        <p><Link to={"/users"} onClick={root.fetch_users.bind(root)}>Users</Link></p>
      </div>
      <div className="col-5">
        <div className="form-inline my-2">
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button className="btn btn-secondary">Login</button>
        </div>
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

