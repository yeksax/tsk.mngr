import React, { useEffect, useState } from "react";
import "/src/assets/styles/home.scss";
import Card from "../../components/Card";
import NewTask from "../../components/NewTask";
import SearchBar from "../../components/Search";

function Home() {
	let [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")));
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
			results = tasks.filter((task) =>
				JSON.stringify(task).includes(query)
			);
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
						<Card
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

export default Home;
