import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import api from './api';

import Header from './header';
import Register from './register';
import TaskCreate from './taskCreate';
import TaskEdit from './taskEdit';
import TaskList from './taskList';

export default function root_init(node, store) {
  let tasks = window.tasks;
  
  api.fetch_tasks();

  ReactDOM.render(
    <Provider store={store}>
      <Root tasks={tasks} />
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
  } 
 
  render() {
    return <div className="container">
        <Router>
          <div>
            <Header />
            <Route path="/" exact={true} component={TaskList} />
            <Route path="/register" exact={true} component={Register} />
            <Route path="/tasks" exact={true} component={TaskList} />
            <Route path="/tasks/:id" component={TaskEdit} />
            <Route path="/taskCreate" component={TaskCreate} />
            <Route path="/users" exact={true} render={() =>
              <UserList />
            } />
          </div>
        </Router>
      </div>;
  }
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

