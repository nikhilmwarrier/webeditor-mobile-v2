import React, { useState, useRef, useEffect } from "react";
import "./styles/TextEditor.css";

import Prism from "prismjs";

function TextEditor(props) {
	const [config, setConfig] = useState(null);
	const [value, setValue] = useState("* { color: 'red'; }");

	const defaultConfig = {
		tabsEnabled: true,
		autocompleteBraces: true,
		autocompleteBrackets: true,
		autocompleteQuotes: true,
	};

	const highlight_div = useRef(null);

	const handleChange = e => {
		if (e.target.value === value) return;
		setValue(e.target.value);
		console.log(highlight_div.current);
	};

	const handleKeydown = e => {
		const el = e.target;
		const start = el.selectionStart;
		const end = el.selectionEnd;
		const tabChar = "\t";

		const autocomplete = (char, charToAdd) => {
			if (e.key !== char) return el.value;
			e.preventDefault();
			el.value =
				el.value.substring(0, start) +
				char +
				charToAdd +
				el.value.substring(end);
			el.selectionStart = el.selectionEnd = start + char.length;
			return el.value;
		};

		if (config.tabsEnabled === true && e.key === "Tab") {
			e.preventDefault();
			el.value =
				el.value.substring(0, start) + tabChar + el.value.substring(end);
			setValue(el.value);
			el.selectionStart = el.selectionEnd = start + 1;
		}
		if (config.autocompleteBraces === true) setValue(autocomplete("{", "}"));
		if (config.autocompleteBrackets === true) setValue(autocomplete("(", ")"));
		if (config.autocompleteQuotes === true) {
			setValue(autocomplete("'", "'"));
			setValue(autocomplete('"', '"'));
		}
	};

	useEffect(() => {
		if (!props.config) setConfig(defaultConfig);
		else setConfig(props.config);
		return () => setConfig(null);
	}, []);

	useEffect(() => {
		if (!highlight_div.current) return;
		Prism.highlightElement(highlight_div.current);
	}, [value]);

	return (
		<div className="texteditor__parent">
			<textarea
				className="texteditor__textarea"
				onChange={handleChange}
				onKeyDown={handleKeydown}
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
