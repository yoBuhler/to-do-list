import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTrash, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons"

export default function Task(props) {
    return (
        <li 
            className={
              "list-group-item d-flex align-items-center shadow " + 
              (props.task.done && "bg-secondary")
            }
            key={props.task.id}
        >
            <input
                type="text"
                className="form-control me-1"
                disabled={props.task.done}
                title={props.task.name}
                value={props.task.name}
                onChange={(event) => props.handleChangeTask(props.task.id, event.target.value)}
            />
            <button 
                className={
                    "btn ms-auto me-1 " + 
                    (props.task.done ? "btn-primary" : "btn-success")
                }
                onClick={() => props.handleChangeCloseTask(props.task.id)}
                title={
                    (props.task.done ? "Return" : "Close")
                }
            >
                {
                    props.task.done ? <FontAwesomeIcon icon={faArrowRotateRight} /> : <FontAwesomeIcon icon={faCheck} />
                }
            </button>
            <button
                className="btn btn-danger"
                onClick={() => props.handleRemoveTask(props.task.id)}
                title="Exclude"
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </li>
    )
}