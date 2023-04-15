import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import Divisor from "../Divisor";

import "./style.scss";

function NewTask({ handleCreation }) {
	function handleKeyboardInput(e) {
		let key = e.key;
		let target = e.target;

		let targetIsTag = target.classList.contains("in-creation-tag");
		let completionNotEmpty = completion != "";

		console.log(targetIsTag, completionNotEmpty);

		if (key == "Tab" && targetIsTag && completionNotEmpty) {
			e.preventDefault();
			e.value = completion;
		}
	}

	const titleRef = useRef();
	const descriptionRef = useRef();

	const [tags, setTags] = useState([]);
	const [completion, setCompletion] = useState("");
	const specialTags = ["code", "note"].sort();

	const styles = {
		inputContainer: {
			backgroundColor: "#FCFCFD",
			borderRadius: "4px",
			padding: "4px 8px",
			boxSizing: "border-box",
			fontSize: "16px",
			cursor: "text !important",
		},
	};

	function clearIfPlaceholder(event) {
		let element = event.target;

		if (element.defaultValue == element.value) {
			element.value = "";
		}
	}

	function cancelTask() {
		titleRef.current.value = "Nova Task";
		descriptionRef.current.value = "Descrição";
		setTags([]);
	}

	function createTask() {
		let filteredTags = tags.filter((tag) => {
			return tag != null;
		});

		handleCreation({
			title: titleRef.current.value,
			description: descriptionRef.current.value,
			isComplete: false,
			tags: filteredTags,
			id: new Date().getTime(),
		});

		titleRef.current.value = "Nova Task";
		descriptionRef.current.value = "Descrição";
		setTags([]);
	}

	const inputRef = useRef();

	function createTag() {
		setCompletion("");
		setTags([...tags, ""]);
	}

	function clearCompletion() {
		setCompletion("");
	}

	function handleTagInput(e) {
		let element = e.target;
		element.style.width = `${element.value.length}ch`;
		let newTags = [...tags];
		newTags[element.dataset.key] = element.value;
		element.parentNode.setAttribute("tag", element.value);
		let completionArray = specialTags.filter((tag) => {
			return tag.toLowerCase().startsWith(element.value.toLowerCase());
		});
		if (completionArray.length > 0) {
			setCompletion(completionArray[0].slice(element.value.length));
		} else {
			setCompletion("");
		}

		setTags(newTags);
	}

	function removeEmptyElements(e) {
		let element = e.target;

		if (element.value == "") {
			setTags(
				tags.map((tag) => {
					return tag == "" ? null : tag;
				})
			);
		}
	}

	useEffect(() => {
		if (
			inputRef.current != undefined &&
			document.activeElement.tagName != "INPUT"
		) {
			inputRef.current.focus();
		}
	}, [tags]);

	return (
		<div className={"card new-task " + tags.join(" ")}>
			<div className='card-head'>
				<input
					className={"card-head-title"}
					defaultValue='Nova Task'
					onKeyDown={handleKeyboardInput}
					onFocus={clearIfPlaceholder}
					ref={titleRef}
					style={styles.inputContainer}
					aria-label='Nome da nova tarefa'
				/>
				<span className='card-head-status'>
					<Button backgroundColor='#565D76' text='Criando' />
				</span>
			</div>

			<Divisor />

			<div className='card-body'>
				<textarea
					className={"card-body-description"}
					defaultValue='Descrição'
					onFocus={clearIfPlaceholder}
					onKeyDown={handleKeyboardInput}
					ref={descriptionRef}
					style={{ ...styles.inputContainer, fontSize: "13px" }}
					aria-label='Descrição da nova tarefa'
				/>
			</div>

			<div className='card-footer'>
				<div className='card-footer-tags'>
					<Button
						text='+'
						backgroundColor='#565D76'
						onClick={createTag}
					/>
					{tags.map(
						(tag, index) =>
							tag != null && (
								<Button
									key={index}
									type='input-tag'
									tag={tag}
									completion={completion}
								>
									<input
										className='in-creation-tag'
										type='text'
										defaultValue={tag}
										data-key={index}
										ref={inputRef}
										onBlur={removeEmptyElements}
										onInput={handleTagInput}
										onKeyDown={handleKeyboardInput}
										aria-label={`Nova ${tag} da nova tarefa`}
										onFocus={clearCompletion}
									/>
								</Button>
							)
					)}
				</div>

				<div className='card-footer-actions'>
					<Button text='Cancelar' onClick={cancelTask} />

					<Button
						text='Confirmar'
						backgroundColor='#3D81E6'
						onClick={createTask}
					/>
				</div>
			</div>
		</div>
	);
}

export default NewTask;
