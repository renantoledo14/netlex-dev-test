import React, { useState, useRef } from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar';
import Button from '../components/Button';

import '../styles/metodos.css';
import '../styles/input.css';

import { useAuth } from '../context/Auth';

function Metodo3() {
	const [data, setData] = useState({ count: 0, minWordLength: 0 });
	const { auth } = useAuth();
	const responseDiv = useRef(null);

	function handleSubmit(e) {
		e.preventDefault();
		
		var options = {
			method: 'POST',
			url: 'http://localhost:3086/documents/top-words',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${auth.token}`
			},
			data: data
		};

		axios.request(options).then((response) => {
			if(response?.data?.length ===  0){
				responseDiv.current.innerHTML = 'Nenhuma ocorrência encontrada';
			}
			else {
				let text = '';

				for (let i = 0; i < response.data.length; i++) {
					text += `<br><br>${response.data[i].word} - <b>${response.data[i].count}</b> ocorrência(s) no texto.`;
				}

				responseDiv.current.innerHTML = text;
			}
		}).catch(function (error) {
			console.data(error);
		});
	}
	return (
		<>
			<Navbar page={3} />
			<div className="content">
				<h1>Método 3</h1>
				<form onSubmit={handleSubmit}>
					<div className="row">
						<div className="input-group">
							<label>Count</label>
							<input onChange={(e) => setData({ ...data, count: parseInt(e.target.value) })}
								type="number" className="input" />
						</div>
						<div className="input-group">
							<label>Minimum Word Length</label>
							<input onChange={(e) => setData({ ...data, minWordLength: parseInt(e.target.value) })}
								type="number" className="input" />
						</div>
					</div>
					<div className="button-container">
						<Button type="submit" text="Verificar" />
					</div>

					<div ref={responseDiv} className="response"></div>
				</form>
			</div>
		</>
	);
}

export default Metodo3;