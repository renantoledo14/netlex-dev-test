import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EmailValidator from 'email-validator';

import Button from '../components/Button';
import Toast from '../components/Toast';

import '../styles/login.css';
import '../styles/input.css'

import { useAuth } from '../context/Auth';

function Login() {
	const navigate = useNavigate();
	const { setAuth } = useAuth();

	const [visible, setVisible] = useState(false);
	const [data, setData] = useState({
		email: '',
		password: ''
	});

	function handleLogin(e) {
		e.preventDefault();

		if(!EmailValidator.validate(data.email)) {
			alert('O e-mail não é valido!');
			return;
		}

		var options = {
			method: 'POST',
			url: 'http://localhost:3086/users/login',
			headers: { 'Content-Type': 'application/json' },
			data: data
		};

		axios.request(options)
			.then((response) => {
				setAuth({ isAuthenticated: true, token: response.data.token });
				navigate('/metodo/1');
			}).catch((error) => {
				setVisible(true);
			});
	}

	return (
		<>
			<div className="login-content">
				<div className="login-container">
					<div className="title">Login</div>
					<form onSubmit={handleLogin}>
						<div className="group">
							<label>E-mail</label>
							<input type="email" placeholder="Digite seu e-mail" className="input"
								onChange={(e) => setData({ ...data, email: e.target.value })} />
						</div>
						<div className="group">
							<label>Senha</label>
							<input type="password" placeholder="Digite sua senha" className="input"
								onChange={(e) => setData({ ...data, password: e.target.value })} />
						</div>

						<Button text="Entrar" type="submit" />
					</form>
				</div>
			</div>
			<Toast visible={visible} setVisible={setVisible} text="Erro ao efetuar login" />
		</>
	);
}

export default Login;