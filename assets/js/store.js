import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
  Application state layout
  {
    // Session
    session: null, // { token, user_id }

    // Forms
    login_form: { email: "", password: "" },
    register_form: { email: "", password: ""},
    task_form: { title: "", description: "", completed: false, time_spent: 0, user_id: null, isValid: false }
  }
*/

function users(state = [], action) {
  return state;
}

function tasks(state = [], action) {
  switch (action.type) {
    case 'TASK_LIST':
      return action.data;
    default:
      return state;
  }
}

function session(state = null, action) {
  switch (action.type) {
    case 'NEW_SESSION':
      return action.data;
    case 'END_SESSION':     
      return null; // clear session
    default:
      return state;
  }
}

function login_form(state = {email: "", password: "", isValid: false}, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      let valid = action.email.length > 0 && action.password.length > 0;
      return {email: action.email, password: action.password, isValid: valid};
    case 'NEW_SESSION':
      return {email: action.data.user_email, password: "", isValid: false};
    default:
      return state;
  }
}

function register_form(state = {email: "", password: "", isValid: false}, action) {
  switch (action.type) {
    case 'UPDATE_REGISTER_FORM':
      let valid = action.email.length > 0 && action.password.length > 0;
      return {email: action.email, password: action.password, isValid: valid};
    case 'NEW_SESSION': 
      return {email: "", password: "", isValid: false};
    default:
      return state;
  }
}

function task_form(state = {title: "", description: "", completed: false, time_spent: 0, user_id: null, isValid: false}, action) {
  function checkValidity(title, description, completed, time_spent, user_id) {
    return title.length > 0 
      && description.length > 0
      // completed is a boolean, no need to check for validity
      && (time_spent % 15) == 0
      && (user_id == null || user_id > 0); // TODO maybe more user_id validation
  }

  switch (action.type) {
    case 'UPDATE_TASK_FORM':
      let isValid = checkValidity(action.title, action.description, action.completed, action.time_spent, action.user_id);
      return {title: action.title, description: action.description, completed: action.completed, time_spent: action.time_spent, user_id: action.user_id, isValid: isValid};
    case 'CLEAR_TASK_FORM':
      return {title: "", description: "", completed: false, time_spent: 0, user_id: null, isValid: false};
    default:
      return state; 
  }
} 

function root_reducer(state0, action) {
  console.log("reducer", state0, action);

  let reducer = combineReducers({tasks, users, session, login_form, register_form, task_form});
  let state1 = reducer(state0, action)
  
  console.log("reducer1", state1);

  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
