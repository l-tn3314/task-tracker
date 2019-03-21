import store from './store';

class TheServer {

  create_session(email, password, successCallback = () => {}, errorCallback = (resp) => {}) {
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
        successCallback();
      },
      error: (resp) => {
        console.log("login fail");
        console.log(resp);
        errorCallback(resp);
      }
    });
  }

  register(email, password, successCallback = () => {}, errorCallback = (resp) => {}) {
    $.ajax("/api/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({user: {email: email, password: password}}),
      success: (resp) => {
        console.log("register success");
        successCallback();
      },
      error: (resp) => {
        console.log("register fail");
        console.log(resp);
        errorCallback(resp);
      }
    });
  }

  create_task(authToken, title, description, completed, time_spent, user_id = null, successCallback = () => {}, errorCallback = (resp) => {}) {
    $.ajax("/api/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset-UTF-8",
      data: JSON.stringify({
        task: {
          title: title,
          description: description,
          completed: completed,
          time_spent: time_spent,
          user_id: user_id,
        }
      }),
      headers: {"X-AUTH": authToken},
      success: (resp) => {
        console.log("created task");
        successCallback();
      }, 
      error: (resp) => {
        console.log("failed to create task");
        console.log(resp);
        errorCallback(resp);
      }
    });
  }
  
  update_task(authToken, task_id, title, description, completed, time_spent, user_id = null, successCallback = () => {}, errorCallback = (resp) => {}) {
    $.ajax("/api/tasks/" + task_id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset-UTF-8",
      data: JSON.stringify({
        task: {
          title: title,
          description: description,
          completed: completed,
          time_spent: time_spent,
          user_id: user_id,
        }
      }),
      headers: {"X-AUTH": authToken},
      success: (resp) => {
        console.log("updated task");
        successCallback();
      }, 
      error: (resp) => {
        console.log("failed to update task");
        console.log(resp);
        errorCallback(resp);
      }
    });
  }

  fetch_tasks() {
    $.ajax("/api/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        console.log(resp);
        store.dispatch({
          type: "TASK_LIST",
          data: resp.data,
        });
      },
      error: (resp) => {
        console.log("failed to fetch tasks");
        console.log(resp);
      },
    });
  }

  fetch_users() {
    $.ajax("/api/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        console.log(resp);
        store.dispatch({
          type: "USER_LIST",
          data: resp.data,
        });
      },
      error: (resp) => {
        console.log("failed to fetch users");
      },
    });
  }
}

export default new TheServer();
