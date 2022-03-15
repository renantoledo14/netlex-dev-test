import React, { useState, useRef } from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar';
import Button from '../components/Button';

import '../styles/metodos.css';
import '../styles/input.css';

import { useAuth } from '../context/Auth';
import Toast from '../components/Toast';

function Metodo2() {
	const [visible, setVisible] = useState(false);
	const [word, setWord] = useState('');
	const { auth } = useAuth();
	const responseDiv1 = useRef(null);
	const responseDiv2 = useRef(null);

	function handleSubmit(e) {
		e.preventDefault();
		if (word === '') {
			setVisible(true);
		}
		else {
			var options = {
				method: 'POST',
				url: 'http://localhost:3086/documents/word-sentences',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`
				},
				data: { word: word }
			};

			axios.request(options).then((response) => {
				if(response.data.sentences === false) {
					responseDiv1.current.innerHTML = `Palavra não encontrada.`;
				}
				else {
					responseDiv1.current.innerHTML = `A palavra <b>${word}</b> foi encontrada em ${response.data.length} ${response.data.length > 1 ? 'frases' : 'frase'} no texto.`;

					let text = '';

					for (let i = 0; i < response.data.length; i++) {
						const regex = new RegExp(`(${word})`, 'gim')
						response.data.sentences[i] = response.data.sentences[i].replace(regex, '<strong>$1</strong>')
						text += `<br><br>${i+1}. ${response.data.sentences[i]}`;
					}

					responseDiv2.current.innerHTML = text;
				}
			}).catch(function (error) {
				console.log(error);
			});
		}
	}
	return (
		<>
			<Navbar page={2} />
			<div className="content">
				<h1>Método 2</h1>
				<form onSubmit={handleSubmit}>
					<label>Digite uma palavra</label>
					<input type="text" className="input" onChange={(e) => setWord(e.target.value)} />

					<div className="button-container">
						<Button type="submit" text="Verificar" />
					</div>

					<div ref={responseDiv1} className="response"></div>
					<div ref={responseDiv2} className="response-gray"></div>
				</form>
			</div>
			<Toast visible={visible} setVisible={setVisible} text="Nenhuma palavra inserida" />
		</>
	);
}

export default Metodo2;