import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import Divisor from "../Divisor";
import Button from "../Button";

export default function Backblur({
	title,
	children,
	promptDeleteTask,
	deleteTask,
	taskId,
}) {
	const backblurRef = useRef();

	function closeModal() {
		backblurRef.current.classList.add("close");
		setTimeout(() => {
			promptDeleteTask(0);
		}, 200);
	}

	function handleOutClick(e) {
		let element = e.target;
		if (element == backblurRef.current) {
			closeModal();
		}
	}

	function confirmDeletion() {
		closeModal();
		setTimeout(() => {
			deleteTask(taskId);
		}, 250);
	}

	return (
		<div className='backblur' onClick={handleOutClick} ref={backblurRef}>
			<div className='modal'>
				<div className='modal-header'>
					<div className='modal-header-title'>
						Deseja mesmo apagar a tarefa <strong>{title}</strong>?
					</div>
					<div className='close-modal'>
						<FontAwesomeIcon
							className='close-modal-icon'
							icon={faXmark}
							onClick={closeModal}
						/>
					</div>
				</div>
				<Divisor />
				<div className='modal-content'>{children}</div>
				<div className='modal-footer'>
					<Button text='Cancelar' size='big' onClick={closeModal} />
					<Button
						onClick={confirmDeletion}
						text='Confirmar'
						backgroundColor='#fd0a2a'
						size='big'
					/>
				</div>
			</div>
		</div>
	);
}
