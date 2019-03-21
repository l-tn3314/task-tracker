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
  }
*/

function users(state = [], action) {
  return state;
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

function login_form(state = {email: "", password: ""}, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return {email: action.email, password: action.password};
    case 'NEW_SESSION':
      return {email: action.data.user_email, password: ""};
    default:
      return state;
  }
}

function register_form(state = {email: "", password: ""}, action) {
  switch (action.type) {
    case 'UPDATE_REGISTER_FORM':
      return {email: action.email, password: action.password};
    case 'NEW_SESSION': 
      return {email: "", password: ""};
    default:
      return state;
  }
}

function task_form(state = {title: "", description: "", completed: false, time_spent: 0, user_id: null}, action) {
  switch (action.type) {
    case 'UPDATE_TASK_FORM':
      return {title: action.title, description: action.description, completed: action.completed, time_spent: action.time_spent, user_id: action.user_id};
    default:
      return state; 
  }
} 

function root_reducer(state0, action) {
  console.log("reducer", state0, action);

  let reducer = combineReducers({users, session, login_form, register_form, task_form});
  let state1 = reducer(state0, action)
  
  console.log("reducer1", state1);

  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
