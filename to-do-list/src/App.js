import React, { useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid';
import FilterTask from "./components/FilterTask"
import AddTask from "./components/AddTask";
import Task from "./components/Task";

function App() {
  const [tasks, setTasks] = useState([]);

  const [filterTask, setFilterTask] = useState('All')
  const [newTask, setNewTask] = useState('');

  function handleAddTask() {
    // Function to add a task in tasks array.
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

  function handleChangeTask(id, name) {
    // Function to change name of task.
    const changeTasks = tasks.map(task => {
      return task.id === id ? { ...task, name: name } : task
    })

    setTasks(changeTasks)
  }

  function handleChangeCloseTask(id) {
    // Function to inverse done of task.
    const closeTasks = tasks.map(task => {
      return task.id === id ? { ...task, done: !task.done } : task
    })

    setTasks(closeTasks)
  }

  function handleRemoveTask(id) {
    // Function to remove the task of array.
    setTasks(tasks.filter(task => task.id !== id))
  }


  function filterTasks(task) {
    // Function to filter the tasks based in the select value.
    switch (filterTask) {
      case 'All':
        return true
      case 'Pending':
        return !task.done
      case 'Done':
        return task.done;
      default:
        break;
    }
  }

  function sortTasks(a, b) {
    // Function to sort the tasks based in done attribute and created date.
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

  useEffect(() => {
    // Function to change title of the page if have any task pending.
    let title = "Johan's to do list";
    let tasksPending = tasks.filter(task => !task.done);
    if (tasksPending.length) {
      title = `${tasksPending.length} pending tasks - ${title}`
    }
    document.title = title;
  }, [tasks]);

  return (
    <div className="mt-3 mb-3 min-vh-75 align-items-center">
      <div className="row mb-3">
        <h1 className="text-center text-black text-shadow">
          Johan's to do list
        </h1>
      </div>
      <div className="row mb-5">
        <div className="col-9">
          <AddTask
            newTask={newTask}
            setNewTask={setNewTask}
            handleAddTask={handleAddTask}
          />
        </div>
        <div className="col-3">
          <FilterTask
            filterTask={filterTask}
            setFilterTask={setFilterTask}
          />
        </div>
      </div>
      <ul className="w-75 ms-auto me-auto list-group">
        {
          (
            !tasks.length && <li className="list-group-item d-flex align-items-center justify-content-center shadow">
              Don't have items yet!
            </li>
          )
        }
        {
          tasks.filter(filterTasks).sort(sortTasks).map(task => (
            <Task 
              task={task}
              handleChangeTask={handleChangeTask}
              handleChangeCloseTask={handleChangeCloseTask}
              handleRemoveTask={handleRemoveTask}
            />
          ))
        }
      </ul>
    </div>
  );
}

export default App;
