import React from 'react';

import '../styles/input.css';

function TextInput(props) {
	return(
		<input type={props.type} placeholder={props.placeholder || ''} className="input" />
	);
}

export default TextInput;