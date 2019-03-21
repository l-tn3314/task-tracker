import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';

import api from './api';

function TaskForm(props) {
  let {task_form, dispatch} = props;

  function updateTitle(ev) {
    let action = _.assign({}, task_form, {
        type: 'UPDATE_TASK_FORM',
        title: ev.target.value,
    });

    dispatch(action);
  }

  function updateDescription(ev) {
    let action = _.assign({}, task_form, {
        type: 'UPDATE_TASK_FORM',
        description: ev.target.value,
    });

    dispatch(action);
  }

  function toggleCompleted() {
    let action = _.assign({}, task_form, {
        type: 'UPDATE_TASK_FORM',
        completed: !task_form.completed,
    });
   
    dispatch(action) 
  }

  // TODO time validation
  function updateTimeSpent(ev) {
    let action = _.assign({}, task_form, {
        type: 'UPDATE_TASK_FORM',
        time_spent: ev.target.value,
    });

    dispatch(action);
  }

  function updateUserId(ev) {
    let action = _.assign({}, task_form, {
        type: 'UPDATE_TASK_FORM',
        user_id: ev.target.value,
    });

    dispatch(action);
  }
  

  function successfulRegister() {
    console.log("registered yay");
    api.create_session(register_form.email, register_form.password, () => { props.history.push("/") });
  }

  return <div>
    <div className="form-group my-2">
      <label for="inputTitle">Title: </label>
      <input type="text" className="ml-2" id="inputTitle" placeholder="title" onChange={updateTitle} />
    </div>
    <div className="form-group my-2">
      <label for="inputDescription">Password: </label>
      <input type="textarea" className="ml-2" id="inputDescription" placeholder="description" onChange={updateDescription} />
    </div>
    <div className="form-group my-2">
      <label for="checkCompleted">Completed </label>
      <input type="checkbox" id="checkCompleted" className="ml-2" />
    </div>
    <div className="form-group my-2">
      <label for="numberTimespent">Time spent </label>
      <input type="number" id="numberTimespent" className="ml-2" />
    </div>
    <div className="form-group my-2">
      <label for="numberUserid">User ID: </label>
      <input type="number" id="numberUserid" className="ml-2" />
    </div>
    <button className="btn btn-primary" onClick={() => api.register(register_form.email, register_form.password, successfulRegister)}>Register</button>
  </div>;
}

// TODO update from register to create new task
function state2props(state) {
  return {
    task_form: state.task_form,
  };
}

export default withRouter(connect(state2props)(TaskForm));
