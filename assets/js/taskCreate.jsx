import React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router';

import TaskForm from './taskForm';

import api from './api';

// this component is a class instead of a function because 'UPDATE_TASK_FORM' needs
// to be dispatched once, when this component is first mounted. 
// (putting it in a function causes it to be repeatedly called)
class TaskCreate extends React.Component {
  constructor(props) {
    super(props);

    props.dispatch({type: 'CLEAR_TASK_FORM'});
  }

  onSuccessfulCreate() {
    this.props.history.push("/");
    
    this.props.dispatch({type: 'CLEAR_TASK_FORM'});  
  } 

  onButtonClick() {
    api.create_task(this.props.session.token, this.props.task_form.title, this.props.task_form.description, this.props.task_form.completed, this.props.task_form.time_spent, this.props.task_form.user_id, this.onSuccessfulCreate.bind(this));
  };

  render() {
    return <TaskForm dispatch={this.props.dispatch} onButtonClick={this.onButtonClick.bind(this)} buttonText={"Create Task"} />
  }
} 

function state2props(state) {
  return {
    session: state.session,
    task_form: state.task_form,
  };
}

export default withRouter(connect(state2props)(TaskCreate))
