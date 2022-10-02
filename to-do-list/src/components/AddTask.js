import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

export default function AddTask(props) {
    return (
        <div className="input-group shadow">
            <div className="form-floating">
                <input 
                  name="newText" 
                  placeholder="Task description" 
                  className="form-control" 
                  type="text" 
                  value={props.newTask} 
                  onChange={(event) => props.setNewTask(event.target.value)} 
                  onKeyPress={(event) => props.handleKeyPress(event)}
                />
                <label htmlFor="newText">Task description</label>
            </div>
            <button 
              className="btn btn-primary" 
              onClick={() => props.handleAddTask()}
              disabled={!props.newTask.length && true }
              title="Add"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    )
}