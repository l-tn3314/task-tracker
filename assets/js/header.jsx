import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import api from './api';

function Header(props) {
  let {session, login_form, dispatch} = props;
  let sessionInfo;

  function updateEmail(ev) {
    let action = {
      type: 'UPDATE_LOGIN_FORM',
      email: ev.target.value,
      password: login_form.password,
    }

    dispatch(action);
  }

  function updatePassword(ev) {
    let action = {
      type: 'UPDATE_LOGIN_FORM',
      email: login_form.email,
      password: ev.target.value,
    }

    dispatch(action);
  }
  
  function logout(ev) {
    let action = {
      type: 'END_SESSION',
    }

    dispatch(action);
  } 

  // go to index after successul login/logout
  function navToIndex() {
    props.history.push("/");
  }

  function onLogoutClick() {
    logout();
    navToIndex();
  };


  if (session == null) {
    sessionInfo = <div> 
        <div className="form-inline my-2">
          <input type="email" placeholder="email" value={login_form.email} onChange={updateEmail} />
          <input type="password" placeholder="password" onChange={updatePassword} /> 
          <button className="btn btn-primary" onClick={() => api.create_session(login_form.email, login_form.password, navToIndex)}>Login</button>
        </div>
        <p>No account? <Link to={"/register"}>Click here to register!</Link></p>
      </div>;
  } else {
    sessionInfo = <div className="my-2">
        <p>Logged in as: {session.user_email}  
          <button className="btn btn-secondary ml-2" onClick={onLogoutClick}>Logout</button>
        </p>
      </div>;
  }

  return <div>
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="col-7">
        <h2><Link to={"/"}>Task Tracker</Link></h2>
      </div>
      <div className="col-5">
        {sessionInfo}
      </div>
    </nav>
  </div>;
}

function state2props(state) {
  return { 
    session: state.session,
    login_form: state.login_form,
  };
}

export default withRouter(connect(state2props)(Header));
