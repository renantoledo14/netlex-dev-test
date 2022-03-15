import React, { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';

import './style.css';

function Toast(props) {
	const toastDiv = useRef(null);

	useEffect(() => {
		if (props.visible) {
			toastDiv.current.classList.add('show');
		} else {
			toastDiv.current.classList.remove('show');
		}
	},[props.visible]);

	function hide() {
		props.setVisible(false);
	}

	return (
		<div ref={toastDiv} className="toast">
			{props.text}
			<button onClick={hide}>
				<FiX size={25} />
			</button>
		</div>
	);
}

export default Toast;