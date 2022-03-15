import React from 'react';

import './style.css';

function Button(props) {
	return (
		<button onClick={props.onClick || function(e) {}} type={props.type} className="button">
			{props.text}
		</button>
	);
}

export default Button;