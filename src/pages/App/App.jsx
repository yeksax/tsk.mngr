import React, { useEffect, useState } from "react";
import "/src/assets/styles/home.scss";
import Task from "../../components/Task";
import NewTask from "../../components/NewTask";
import SearchBar from "../../components/Search";

export default function App() {
	let [tasks, setTasks] = useState(
		JSON.parse(localStorage.getItem("tasks")) || []
	);
	let [filteredTasks, setFilteredTasks] = useState(tasks);
	let [query, setQuery] = useState("");

	function saveMainChanges(id, data) {
		let allTasks = [...tasks];
		let index = tasks.indexOf(tasks.filter((task) => task.id === id)[0]);
		allTasks[index] = data;
		setTasks(allTasks);
	}

	function deleteTask(id) {
		let allTasks = [...tasks];
		let index = tasks.indexOf(tasks.filter((task) => task.id === id)[0]);
		allTasks.splice(index, 1);
		setTasks(allTasks);
	}

	function newTask(data) {
		setTasks([...tasks, data]);
	}

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	function filterTasks(mode = "base") {
		let results = [];

		if (mode === "base") {
			results = tasks
				.filter((task) => JSON.stringify(task).includes(query))
				.sort((x, y) => {
					if (x.isComplete > y.isComplete) {
						return 1;
					}
					if (x.isComplete < y.isComplete) {
						return -1;
					}
				});
		}

		return results;
	}

	useEffect(() => {
		setFilteredTasks(filterTasks());
	}, [query, tasks]);

	return (
		<div className='container'>
			<SearchBar query={query} setQuery={setQuery} />
			<div className='tasks'>
				<NewTask handleCreation={newTask} />

				{filteredTasks.map((task, i) => {
					return (
						<Task
							key={task.id}
							mainTask={task}
							saveMainChanges={saveMainChanges}
							deleteTask={deleteTask}
						/>
					);
				})}
			</div>
		</div>
	);
}