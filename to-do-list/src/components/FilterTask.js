import React from "react";

export default function FilterTask(props) {
    return (
        <div className="form-floating shadow">
            <select name="filterTask" className="form-select" value={props.filterTask} onChange={(event) => props.setFilterTask(event.target.value)}>
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
            </select>
            <label htmlFor="filterTask">Filter tasks</label>
        </div>
    )
}