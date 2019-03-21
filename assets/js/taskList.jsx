import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import api from './api';

function TaskList(props) {
  let { session, tasks, users, dispatch } = props;
  let allTasks = _.map(tasks, (t) => <Task key={t.id} task={t} dispatch={dispatch} allowEdit={session} users={users} />);
    
  let createTaskButton = session 
      ? <Link to='/taskCreate'><button className="btn btn-primary">New Task</button></Link> 
      : null
  
  return <div className="row">
      <div className="col-12">
        <h2>All Tasks {createTaskButton}</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>title</th>
              <th>description</th>
              <th>completed</th>
              <th>time spent</th>
              <th>assigned user</th>
            </tr>
          </thead>
          <tbody>
            {allTasks}
          </tbody>
        </table>
      </div>
    </div>;
}

function Task(props) {
  let {allowEdit, task, users, dispatch} = props;
  let editLink = allowEdit 
      ? <td><Link to={"/tasks/" + task.id}>Edit</Link></td>
      : null
  let taskUser = task.user_id && users.find((u) => {return u.id == task.user_id});
  
  return <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{"" + task.completed}</td>
      <td>{task.time_spent} min.</td>
      <td>{taskUser && taskUser.email}</td>
      {editLink}
    </tr>
}

function state2props(state) {
  return {
    session: state.session,
    tasks: state.tasks,
    users: state.users,
  };
}

export default connect(state2props)(TaskList);
