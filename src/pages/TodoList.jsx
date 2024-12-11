import React from "react";
import { useState } from "react";
import "./TodoList.css";

const TodoList = () => {
  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem("jobs"));

    return storageJobs;
  });
  const [job, setJob] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setJobs((prev) => {
      const newJobs = [...prev, job];

      const jsonJobs = JSON.stringify(newJobs);

      localStorage.setItem("jobs", jsonJobs);

      return newJobs;
    });
    setJob("");
  };
  const deleteJob = (i) => {
    const updateJobs = jobs.filter((_, index) => index !== i);
    setJobs(updateJobs);
  };
  const moveJobUp = (i) => {
    if (i > 0) {
      const updateJobs = [...jobs];
      [updateJobs[i], updateJobs[i - 1]] = [updateJobs[i - 1], updateJobs[i]];
      setJobs(updateJobs);
    }
  };
  const moveJobDown = (i) => {
    if (i < jobs.length - 1) {
      const updateJobs = [...jobs];
      [updateJobs[i], updateJobs[i - 1]] = [updateJobs[i - 1], updateJobs[i]];
      setJobs(updateJobs);
    }
  };
  return (
    <div>
      <div>
        <h2>Todo List</h2>
        <form>
          <input value={job} onChange={(e) => setJob(e.target.value)} />
          <button onClick={handleSubmit}>Add Todo</button>
        </form>
        <ol>
          {jobs.map((job, i) => (
            <div key={`todolist ${i}`} className="todo-list">
              <input type="checkbox" />
              <li>{job}</li>
              <button onClick={() => deleteJob(i)}>Delete</button>
              <button onClick={() => moveJobUp(i)}>^</button>
              <button onClick={() => moveJobDown(i)}>Down</button>
            </div>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TodoList;
