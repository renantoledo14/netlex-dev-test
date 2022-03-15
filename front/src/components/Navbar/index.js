import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

function Navbar(props) {
	const [page, setPage] = useState(props.page);

	const link1 = useRef(null);
	const link2 = useRef(null);
	const link3 = useRef(null);

	useEffect(() => {
		switch (page) {
			case 1:
				console.log(link1.current.classList.add('active'));
			break;
			case 2:
				console.log(link2.current.classList.add('active'));
			break;
			case 3:
				console.log(link3.current.classList.add('active'));
			break;
		} 
	},[])

	return (
		<nav>
			<ul>
				<Link to="/metodo/1">
					<li ref={link1}>Método 1</li>
				</Link>
				<Link to="/metodo/2">
					<li ref={link2}>Método 2</li>
				</Link>
				<Link to="/metodo/3">
					<li ref={link3}>Método 3</li>
				</Link>
			</ul>
		</nav>
	)
}

export default Navbar;