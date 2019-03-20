import React from 'react'
import _ from 'lodash'

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "", 
      password: "" 
    }
  }

  register() {
    $.ajax("/api/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({user: this.state}),
      success: (resp) => {
        console.log("register success");
      },
      error: (resp) => {
        console.log("register fail");
        console.log(resp);
      }
    });
  }


  render() {
    let updateEmail = (ev) => { this.setState(_.assign({}, this.state, {email: ev.target.value})) };
    let updatePassword = (ev) => { this.setState(_.assign({}, this.state, {password: ev.target.value})) };

    return <div>
      <div className="form-group my-2">
        <label for="inputEmail">Email: </label>
        <input type="email" id="inputEmail" placeholder="email"
                onChange={updateEmail.bind(this)} />
      </div>
      <div className="form-group my-2">
        <label for="inputPassword">Password: </label>
        <input type="password" id="inputPassword" placeholder="password"
                onChange={updatePassword.bind(this)} />
      </div>
      <button className="btn btn-primary" onClick={this.register.bind(this)}>Register</button>
    </div>;
  } 
}

export default Register;
