import React, { useState, useRef } from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar';
import Button from '../components/Button';

import '../styles/metodos.css';
import '../styles/input.css';

import { useAuth } from '../context/Auth';
import Toast from '../components/Toast';

function Metodo1() {
	const [visible, setVisible] = useState(false);
	const [word, setWord] = useState('');
	const { auth } = useAuth();
	const responseDiv = useRef(null);

	function handleSubmit(e) {
		e.preventDefault();
		
		if (word === '') {
			setVisible(true);
		}
		else {
			var options = {
				method: 'POST',
				url: 'http://localhost:3086/documents/word-frequency',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`
				},
				data: { word: word }
			};

			axios.request(options).then((response) => {
				if(response.data.frequency === 0) {
					responseDiv.current.innerHTML = `Palavra não encontrada.`;
				}
				else {
					responseDiv.current.innerHTML = `A palavra <b>${word}</b> foi encontrada em ${response.data.frequency} frases no texto.`;
				}
			}).catch(function (error) {
				console.log(error);
			});
		}
	}

	return (
		<>
			<Navbar page={1} />
			<div className="content">
				<h1>Método 1</h1>
				<form onSubmit={handleSubmit}>
					<label>Digite uma palavra</label>
					<input type="text" className="input" onChange={(e) => setWord(e.target.value)}/>

					<div className="button-container">
						<Button type="submit" text="Verificar" />
					</div>

					<div ref={responseDiv} className="response"></div>
				</form>
			</div>
			<Toast visible={visible} setVisible={setVisible} text="Nenhuma palavra inserida" />
		</>
	);
}

export default Metodo1;