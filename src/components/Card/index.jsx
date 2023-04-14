import { useEffect, useRef, useState } from "react";
import "./style.scss";
import Divisor from "../Divisor";
import Button from "../Button";

function Card({ mainTask, saveMainChanges, deleteTask }) {
	const [task, setTask] = useState(mainTask);

	const [editing, setEditing] = useState(false);

	const titleRef = useRef();
	const descriptionRef = useRef();

	function handleKeyboardInput(event) {
		let target = event.target;

		if (event.ctrlKey && event.key == "Enter") {
			saveChanges();
		}

		if (event.key == "Escape") {
			setEditing(false);
			cancelChanges;
			target.blur();
		}
	}

	function handleDeleteTask() {
		deleteTask(task.id);
	}

	function handleCompletionUpdate() {
		setTask({ ...task, isComplete: !task.isComplete });
	}

	function toggleEditMode() {
		setEditing(true);
		descriptionRef.current.focus();
	}

	async function saveChanges() {
		setEditing(false);
		setTask({
			...task,
			title: titleRef.current.value,
			description: descriptionRef.current.value,
		});
	}

	function cancelChanges() {
		setEditing(false);
		titleRef.current.value = task.title;
		descriptionRef.current.value = task.description;
	}

	function handleTagInput(e) {
		let element = e.target;
		element.style.width = `${element.value.length}ch`;
		let newTags = [...task.tags];
		console.log(element);
		console.log(newTags, task.tags);
		newTags[element.dataset.key] = element.value;
		element.parentNode.setAttribute("tag", element.value);
		console.log(newTags);
		setTask({ ...task, tags: [...newTags] });
	}

	useEffect(() => {
		saveMainChanges(task.id, task);
	}, [task]);

	return (
		<div className={"card " + task.tags.join(" ")}>
			<div className='card-head'>
				<input
					className={"card-head-title" + (editing ? " editing" : "")}
					defaultValue={task.title}
					onKeyDown={handleKeyboardInput}
					ref={titleRef}
					readOnly={!editing}
				/>

				<span className='card-head-status'>
					<Button
						text={task.isComplete ? "Completo" : "Incompleto"}
						backgroundColor={
							task.isComplete ? "#4FE567" : "#fd0a2a"
						}
						onClick={handleCompletionUpdate}
					/>
				</span>
			</div>

			<Divisor />

			<div className='card-body'>
				<textarea
					className={
						"card-body-description " + (editing ? " editing" : "")
					}
					defaultValue={task.description}
					readOnly={!editing}
					onKeyDown={handleKeyboardInput}
					ref={descriptionRef}
				/>
			</div>

			<div className='card-footer'>
				<div className='card-footer-tags'>
					{task.tags &&
						task.tags.map((tag, index) => (
							<Button key={index} tag={tag}>
								<input
									type='text'
									className='in-creation-tag'
									defaultValue={tag}
									readOnly={!editing}
									data-key={index}
									style={{
										width: `${tag.length}ch`,
									}}
									onInput={handleTagInput}
								/>
							</Button>
						))}
				</div>

				<div className='card-footer-actions'>
					<Button
						text='Excluir'
						backgroundColor='#F25151'
						onClick={handleDeleteTask}
					/>
					{editing && (
						<Button
							text='Cancelar'
							backgroundColor='#565D76'
							onClick={cancelChanges}
						/>
					)}
					<Button
						text={editing ? "Confirmar" : "Editar"}
						backgroundColor='#3D81E6'
						onClick={!editing ? toggleEditMode : saveChanges}
					/>
				</div>
			</div>
		</div>
	);
}

export default Card;
