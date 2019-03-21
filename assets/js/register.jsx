import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import api from './api';

function Register(props) {
  let {register_form, dispatch} = props;

  function updateEmail(ev) {
    let action = {
      type: 'UPDATE_REGISTER_FORM',
      email: ev.target.value,
      password: register_form.password,
    }

    dispatch(action);
  }

  function updatePassword(ev) {
    let action = {
      type: 'UPDATE_REGISTER_FORM',
      email: register_form.email,
      password: ev.target.value,
    }

    dispatch(action);
  }

  function failedRegister(resp) {
    $('#register-error-text').html('<p>' + JSON.stringify(resp.responseJSON.errors) + '</p>')
  }

  function successfulRegister() {
    console.log("registered yay");
    api.create_session(register_form.email, register_form.password, () => { props.history.push("/") });
  }

  return <div>
    <div className="form-group my-2">
      <label for="inputEmail">Email: </label>
      <input type="email" id="inputEmail" placeholder="email" onChange={updateEmail} />
    </div>
    <div className="form-group my-2">
      <label for="inputPassword">Password: </label>
      <input type="password" id="inputPassword" placeholder="password" onChange={updatePassword} />
    </div>
    <button className="btn btn-primary" disabled={!register_form.isValid} onClick={() => api.register(register_form.email, register_form.password, successfulRegister, failedRegister)}>Register</button>
    <div id="register-error-text" className="mt-2"></div>
  </div>;
}

function state2props(state) {
  return {
    register_form: state.register_form,
  };
}

export default withRouter(connect(state2props)(Register));
