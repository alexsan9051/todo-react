import React from 'react';
import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';

const API_TASKS = '/api/tasks';

const AppFunct = () => {

    const [state, setState] = useState ({
        title: '',
        description: '',
        _id: '',
    });

    const [tasks, setTasks] = useState([]);

    // not available outside of class methods?
    // componentDidMount() {
    //     this.fetchTasks();
    // }
    // use useEffect
    // ask about this
    useEffect(() => {
        fetchTasks();
    }, []);

    function fetchTasks() {
        fetch(API_TASKS)
        .then(res => res.json())
        .then(data => {
            // setState({...state, tasks: data});
            setTasks(data);
        });
    }

    const updatedNewTask = (task) => {
        const { title, description, _id} = task;
        let newTasks = tasks;
        let foundItem = newTasks.find(item => item._id == _id);
        if (foundItem) {
            foundItem.title = title;
            foundItem.description = description;         
        } else {
            newTasks.push(task);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setState({...state, [name]: value });
    }

    function handleAddTask(e) {
        e.preventDefault();
        const { title, description, _id } = state;

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
                    // functional form of setState
                    setState((prevState) => ({
                        ...prevState,
                        _id,
                        title,
                        description
                    }));
                    // fetchTasks();
                    updatedNewTask(data.task);
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
                    window.M.toast({html: data.Status});
                    // functional form of setState
                    setState((prevState) => ({
                        ...prevState,
                        title,
                        description
                    }));
                    // fetchTasks();
                    updatedNewTask(data.task);
            })
            .catch(err => console.error(err));
        }
    }

    function deleteTask(id) {
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
                M.toast({html: data.Status});
                fetchTasks();
            });
        }
    }

    const handleEditTask = (task) => {
        setState((prevState) => ({
            ...prevState,
            title: task.title,
            description: task.description,
            _id: task._id,
        }));
    };

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
                <TaskForm
                    state={state}
                    handleChange={handleChange}
                    handleAddTask={handleAddTask}
                />
                <TaskTable
                    tasks={tasks}
                    deleteTask={deleteTask}
                    handleEditTask={handleEditTask}
                />
            </div>
        </div>
    </div>
  )
}

export default AppFunct