import { useRef, useState } from "react";
import Button from "../Button";
import Divisor from "../Divisor";

import "./style.scss";

function NewTask({ handleCreation }) {
	function handleKeyboardInput() {}

	const titleRef = useRef();
	const descriptionRef = useRef();

	const [tags, setTags] = useState([]);

	const styles = {
		inputContainer: {
			backgroundColor: "#FCFCFD",
			borderRadius: "4px",
			padding: "4px 8px",
			// fontFamily: "Source Code Pro",
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

	function multipleSearch(keywords, array) {
		let includes = false;

		keywords.forEach((keyword) => {
			keyword = keyword.toLowerCase();

			if (array.includes(keyword)) {
				includes = true;
			}
		});

		return includes;
	}

	function createTask() {
		let filteredTags = tags.filter((tag) => {
			return tag != "";
		});

		let metaTags = filteredTags.map((tag) => tag.toLowerCase());

		let isNote = multipleSearch(
			["note", "notes", "nota", "notas"],
			metaTags
		);

		handleCreation({
			title: titleRef.current.value,
			description: descriptionRef.current.value,
			isComplete: false,
			tags: filteredTags,
			id: new Date().getTime(),
			isNote: isNote,
		});

		titleRef.current.value = "Nova Task";
		descriptionRef.current.value = "Descrição";
		setTags([]);
	}

	function createTag() {
		setTags([...tags, "Tag"]);
	}

	function handleTagInput(e) {
		let element = e.target;
		element.style.width = `${element.value.length}ch`;
		let newTags = tags;
		newTags[element.dataset.key] = element.value;
		element.setAttribute("tag", element.value);
		setTags(newTags);
	}

	return (
		<div className='card'>
			<div className='card-head'>
				<input
					className={"card-head-title"}
					defaultValue='Nova Task'
					onKeyDown={handleKeyboardInput}
					onClick={clearIfPlaceholder}
					ref={titleRef}
					style={styles.inputContainer}
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
					onClick={clearIfPlaceholder}
					onKeyDown={handleKeyboardInput}
					ref={descriptionRef}
					style={{ ...styles.inputContainer, fontSize: "13px" }}
				/>
			</div>

			<div className='card-footer'>
				<div className='card-footer-tags'>
					<Button
						text='+'
						backgroundColor='#565D76'
						onClick={createTag}
					/>
					{tags.map((tag, index) => (
						<Button key={index} type='input-tag' tag={tag}>
							<input
								className='in-creation-tag'
								type='text'
								defaultValue={tag}
								data-key={index}
								onChange={handleTagInput}
							/>
						</Button>
					))}
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
