import React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router';
import _ from 'lodash';

import TaskForm from './taskForm';

import api from './api';

// this component is a class instead of a function because 'UPDATE_TASK_FORM' needs
// to be dispatched once, when this component is first mounted. 
// (putting it in a function causes it to be repeatedly called)
class TaskEdit extends React.Component {
  constructor(props) {
    super(props);
    this.tasks = props.tasks;
    this.task_id = props.match.params.id;
    this.task = this.tasks.find((t) => {return t.id == this.task_id});

    api.fetch_users(); // update cache

    props.dispatch(_.assign({}, this.task, {type: 'UPDATE_TASK_FORM'}));
  }

  onSuccessfulUpdate() {
    api.fetch_tasks(); // update cache 

    this.props.history.push("/tasks");
    
    this.props.dispatch({type: 'CLEAR_TASK_FORM'});  
  } 

  onButtonClick() {
    api.update_task(this.props.session.token, this.task_id, this.props.task_form.title, this.props.task_form.description, this.props.task_form.completed, this.props.task_form.time_spent, this.props.task_form.user_id, this.onSuccessfulUpdate.bind(this));
  };
  
  render() {
    return <TaskForm dispatch={this.props.dispatch} onButtonClick={this.onButtonClick.bind(this)} buttonText={"Save"} />
  }
} 

function state2props(state) {
  return {
    session: state.session,
    task_form: state.task_form,
    tasks: state.tasks,
  };
}

export default withRouter(connect(state2props)(TaskEdit))
