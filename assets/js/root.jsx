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
  
  // cache tasks and users  
  api.fetch_tasks();
  api.fetch_users();

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
          </div>
        </Router>
      </div>;
  }
}


