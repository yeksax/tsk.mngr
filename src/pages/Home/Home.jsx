import React, { useEffect, useState } from "react";
import "/src/assets/styles/home.scss";
import NewTask from "../../components/NewTask";
import SearchBar from "../../components/Search";
import Task from "../../components/Task";
import Backblur from "../../components/Modal/backblur";

function Home() {
	let [tasks, setTasks] = useState(
		JSON.parse(localStorage.getItem("tasks")) || []
	);
	let [filteredTasks, setFilteredTasks] = useState(tasks);
	let [query, setQuery] = useState("");
	let [deletedTask, setDeletedTask] = useState(0);

	function saveMainChanges(id, data) {
		let allTasks = [...tasks];
		let index = tasks.indexOf(tasks.filter((task) => task.id === id)[0]);
		allTasks[index] = data;
		setTasks(allTasks);
	}

	function promptDeleteTask(id) {
		setDeletedTask(id);
	}

	function deleteTask(id) {
		let allTasks = [...tasks];
		let index = tasks.indexOf(tasks.filter((task) => task.id === id)[0]);
		allTasks.splice(index, 1);
		setTasks(allTasks);
		setDeletedTask(0);
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
			{deletedTask != 0 && (
				<Backblur
					promptDeleteTask={promptDeleteTask}
					deleteTask={deleteTask}
					taskId={deletedTask}
					title={
						tasks.filter((task) => {
							return task.id === deletedTask;
						})[0].title
					}
				>
					<Task
						mainTask={
							tasks.filter((task) => {
								return task.id === deletedTask;
							})[0]
						}
						noFooter
						noInteraction
					/>
				</Backblur>
			)}
			<SearchBar query={query} setQuery={setQuery} />
			<div className='tasks'>
				<NewTask handleCreation={newTask} />

				{filteredTasks.map((task, i) => {
					return (
						<Task
							key={task.id}
							mainTask={task}
							saveMainChanges={saveMainChanges}
							promptDeleteTask={promptDeleteTask}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Home;
