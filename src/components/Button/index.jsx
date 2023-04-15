import { useEffect, useState } from "react";
import "./style.scss";

function Button({ text, backgroundColor, onClick, children, tag, size }) {
	const backgroundColorMap = {
		code: "#8a4af3",
		note: "#e3bd48",
	};

	let background = "#565D76";
	tag ? (tag = tag.toLowerCase()) : null;

	if (tag !== undefined && backgroundColorMap[tag] !== undefined) {
		background = backgroundColorMap[tag];
	} else if (backgroundColor !== undefined) {
		background = backgroundColor;
	}

	return (
		<span
			onClick={onClick && onClick}
			className={"button " + size}
			style={{
				background: background,
				cursor: onClick && "pointer",
			}}
		>
			{children ? children : text}
		</span>
	);
}

export default Button;
