import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function TaskList(props) {
  let { tasks, dispatch } = props;
  let allTasks = _.map(tasks, (t) => <Task key={t.id} task={t} dispatch={dispatch} />);
  return <div className="row">
      <div className="col-12">
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
  let {task, dispatch} = props;
  console.log(task.completed);
  return <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{"" + task.completed}</td>
      <td>{task.time_spent} min.</td>
      <td>{task.user_id}</td>
      <td><Link to={"/tasks/" + task.id}>Edit</Link></td>
    </tr>
}

function state2props(state) {
  return {
    tasks: state.tasks,
  };
}

export default connect(state2props)(TaskList);
