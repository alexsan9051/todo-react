import React, { Component } from 'react';

const API_TASKS = '/api/tasks';

export class App extends Component {
    constructor() {
        super();
        this.state = {
          title: '',
          description: '',
          _id: '',
          tasks: []
        };
      }

      componentDidMount() {
        this.fetchTasks();
      }

      fetchTasks() {
        fetch(API_TASKS)
        .then(res => res.json())
        .then(data => {
            this.setState({tasks: data})
        });
      }

      handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
      }

      handleAddTask = (e) => {
        e.preventDefault();
        const { title, description, _id } = this.state;

        if(_id) {
          fetch(API_TASKS+'/'+_id, {
            method: 'PUT',
            body: JSON.stringify({title, description}),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              window.M.toast({html: data.Status});
              this.setState({_id: '', title: '', description: ''});
              this.fetchTasks();
            });
        } else {
          fetch(API_TASKS, {
            method: 'POST',
            body: JSON.stringify({title, description}),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
            //   console.log(data);
              window.M.toast({html: data.Status});
              this.setState({title: '', description: ''});
              this.fetchTasks();
            })
            .catch(err => console.error(err));
        }
    }

    deleteTask (id)  {
        if(confirm('Are you sure you want to delete it?')) {
          fetch(API_TASKS+'/'+id, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
            //   console.log(data);
              M.toast({html: data.Status});
              this.fetchTasks();
            });
        }
      }
    
    
      handleEditTask (task) {
        this.setState({title: task.title, description: task.description, _id: task._id});
      }

  render() {
    return (
    <div>
        <nav className="light-blue darken-4">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">MERN Stack</a>
            </div>
          </div>
        </nav>
        <div className='container'>
                <div className='row'>
                    <div className="col s5">
                        <div className="card">
                            <div className="card-content">
                                <form onSubmit={this.handleAddTask}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                        <input name="title" onChange={this.handleChange} value={this.state.title} type="text" placeholder="Task Title" autoFocus/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                        <textarea name="description" onChange={this.handleChange} value={this.state.description} cols="30" rows="10" placeholder="Task Description" className="materialize-textarea"></textarea>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn light-blue darken-4">
                                        Send 
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col s7">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                        { 
                            this.state.tasks.map(task => {
                            return (
                                <tr key={task._id}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>
                                        <button onClick={() => this.deleteTask(task._id)} className="btn light-blue darken-4">
                                        <i className="material-icons">delete</i> 
                                        </button>
                                        <button onClick={() => this.handleEditTask(task)} className="btn light-blue darken-4" style={{margin: '4px'}}>
                                        <i className="material-icons">edit</i>
                                        </button>
                                    </td>
                                </tr>
                            )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

export default App