import React, { useState, useRef, useEffect } from "react";
import "./styles/TextEditor.css";

import Prism from "prismjs";

function TextEditor() {
	const highlight_div = useRef(null);
	const [value, setValue] = useState("* { color: 'red'; }");

	const handleChange = e => {
		if (e.target.value === value) return;
		setValue(e.target.value);
		console.log(highlight_div.current);
	};

	useEffect(() => {
		if (!highlight_div.current) return;
		Prism.highlightElement(highlight_div.current);
	}, [value]);
	return (
		<div className="texteditor__parent">
			<textarea
				className="texteditor__textarea"
				onChange={handleChange}
				value={value}></textarea>
			<div
				ref={highlight_div}
				className="texteditor__highlighted-div language-css">
				{value}
			</div>
		</div>
	);
}

export default TextEditor;
