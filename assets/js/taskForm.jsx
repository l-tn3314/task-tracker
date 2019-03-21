import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';

import api from './api';

function TaskForm(props) {
  let {buttonText, onButtonClick, task_form, users, dispatch} = props;

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

  let userOptions = _.map(users, (u) => {
    if (u.id == task_form.user_id) {
      return <option value={u.id} selected>{u.email}</option>;
    } else {
      return <option value={u.id}>{u.email}</option>;
    }
  });

  return <div>
    <div className="form-group my-2">
      <label for="inputTitle">Title: </label>
      <input type="text" className="ml-2" id="inputTitle" placeholder="title" value={task_form.title} onChange={updateTitle} />
    </div>
    <div className="form-group my-2">
      <label for="inputDescription">Description: </label>
      <textarea className="ml-2" id="inputDescription" placeholder="description" value={task_form.description} onChange={updateDescription} />
    </div>
    <div className="form-group my-2">
      <label for="checkCompleted">Completed </label>
      <input type="checkbox" id="checkCompleted" className="ml-2" value={task_form.completed} onChange={toggleCompleted} />
    </div>
    <div className="form-group my-2">
      <label for="numberTimespent">Time spent (15 min. increments)</label>
      <input type="number" id="numberTimespent" value="0" className="ml-2" min="0" step="1" value={task_form.time_spent} onChange={updateTimeSpent} />
    </div>
    <div className="form-group my-2">
      <label for="selectUserid">Assigned User: </label>
      <select id="selectUserid" onChange={updateUserId}>
        <option value={null}></option>
        {userOptions}
      </select>
    </div>
    <button className="btn btn-primary" disabled={!task_form.isValid} onClick={onButtonClick}>{buttonText}</button>
  </div>;
}

function state2props(state) {
  return {
    task_form: state.task_form,
    users: state.users,
  };
}

export default withRouter(connect(state2props)(TaskForm));
