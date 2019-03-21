import React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router';

import TaskForm from './taskForm';

import api from './api';

function TaskCreate(props) {
  let {task_form, dispatch} = props;

  function onSuccessfulCreate() {
    props.history.push("/");
    
    dispatch({type: 'CLEAR_TASK_FORM'});  
  } 

  let onButtonClick = () => {
    api.create_task(task_form.title, task_form.description, task_form.completed, task_form.time_spent, task_form.user_id, onSuccessfulCreate);
  };

  return <TaskForm dispatch={props.dispatch} onButtonClick={onButtonClick} buttonText={"Create Task"} />
  
} 

function state2props(state) {
  return {
    task_form: state.task_form,
  };
}

export default withRouter(connect(state2props)(TaskCreate))
