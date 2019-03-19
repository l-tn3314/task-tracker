import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function root_init(node) {
  let tasks = window.tasks;
  ReactDOM.render(<Root tasks={tasks} />, node);
}

class Root extends React.Component {
  
  render() {
    return <div className="container">
        <Header />
        <TaskList tasks={this.props.tasks} />
      </div>;
  }
}

function Header(_props) {
  return <div>
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="col-7">
        <a className="navbar-brand" href="/">Task Tracker</a>
      </div>
      <div className="col-5">
        <div className="form-inline my-2">
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button className="btn btn-secondary">Login</button>
        </div>
      </div>
    </nav>
  </div>;
}

function TaskList(props) {
  let tasks = _.map(props.tasks, (t) => <Task key={t.id} task={t} />);
  return <div className="row">
      {tasks}
    </div>; 
}

function Task(props) {
  let {task} = props;
  return <div className="card col-4">
      <div className="card-body">
        <h3 className="card-title">{task.title}</h3>
        <p className="card-text">{task.description}</p>
      </div>
    </div>;
}

