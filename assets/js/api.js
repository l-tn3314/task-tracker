import store from './store';

class TheServer {

  create_session(email, password) {
    $.ajax("/api/auth", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({email, password}),
      success: (resp) => {
        console.log("login success");
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data,
        });
      },
      error: (resp) => {
        console.log("login fail");
      }
    });
  }

  fetch_users() {
    $.ajax("/api/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        console.log("yes");
        this.setState(_.assign({}, this.state, { users: resp.data }));
      },
      error: (resp) => {
        console.log("oh no");
      },
    });
  }
}

export default new TheServer();
