import React, { useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTrash, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons"

function App() {
  const [tasks, setTasks] = useState([]);

  const [filterTask, setFilterTask] = useState('All')
  const [newTask, setNewTask] = useState('');

  function handleAddTask() {
    if (newTask.length) {
      setTasks([
        ...tasks,
        {
          id: uuidv4(),
          name: newTask,
          created: new Date()
        }
      ])
      setNewTask('')
    }
  }

  console.log('Renderizou')

  function handleChangeCloseTask(id) {
    const closeTasks = tasks.map(task => {
      return task.id === id ? { ...task, done: !task.done } : task
    })

    setTasks(closeTasks)
  }

  function handleRemoveTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  function filterTasks(task) {
    if (filterTask === 'All') {
      return true
    } else if (filterTask === 'Pending') {
      return !task.done
    } else if (filterTask === 'Done') {
      return task.done
    }
  }

  function sortTasks(a, b) {
    if (a.done !== b.done) {
      if (a.done) {
        return 1
      } else if (b.done) {
        return -1
      }
    }
    if (a.created.getTime() > b.created.getTime()) {
      return -1
    } else if (b.created.getTime() > a.created.getTime()) {
      return 1
    } else {
      return 0
    }
  }

  return (
    <div className="mt-3 mb-3 min-vh-75 align-items-center">
      <div className="row mb-3">
        <h1>
          Johan's to do list
        </h1>
      </div>
      <div className="row mb-5">
        <div className="col-9">
          <div className="input-group">
            <div className="form-floating">
              <input name="newText" placeholder="Task description" className="form-control" type="text" value={newTask} onChange={(event) => setNewTask(event.target.value)} />
              <label for="newText">Task description</label>
            </div>
            <button className="btn btn-primary" onClick={() => handleAddTask()}>
              Add Task
            </button>
          </div>
        </div>
        <div className="col-3">
          <div className="form-floating">
            <select name="filterTask" className="form-select" value={filterTask} onChange={(event) => setFilterTask(event.target.value)}>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
            <label for="filterTask">Filter tasks</label>
          </div>
        </div>
      </div>
      <ul className="w-75 ms-auto me-auto list-group">
        {
          tasks.filter(filterTasks).sort(sortTasks).map(task => (
            <li className="list-group-item d-flex align-items-center" key={task.id}>
              <span>
                {task.name}
                {task.done && <span> (Done)</span>}
              </span>
              <button 
                className={
                  "btn ms-auto me-1 " + 
                  (task.done ? "btn-primary" : "btn-success")
                }
                onClick={() => handleChangeCloseTask(task.id)}
              >
                {
                  task.done ? <FontAwesomeIcon icon={faArrowRotateRight} /> : <FontAwesomeIcon icon={faCheck} />
                }
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
