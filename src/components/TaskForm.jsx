
import React from "react";



const TaskForm = ({ state, handleChange, handleAddTask }) => {
  return (
    <div className="col s5">
      <div className="card">
          <div className="card-content">
              <form onSubmit={handleAddTask}>
                  <div className="row">
                      <div className="input-field col s12">
                      <input name="title" onChange={handleChange} value={state.title} type="text" placeholder="Task Title" autoFocus/>
                      </div>
                  </div>
                  <div className="row">
                      <div className="input-field col s12">
                      <textarea name="description" onChange={handleChange} value={state.description} cols="30" rows="10" placeholder="Task Description" className="materialize-textarea"></textarea>
                      </div>
                  </div>

                  <button type="submit" className="btn light-blue darken-4">
                      Send 
                  </button>
              </form>
          </div>
      </div>
    </div>
  )
}

export default TaskForm