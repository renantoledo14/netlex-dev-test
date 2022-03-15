import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Metodo1 from './pages/Metodo1';
import Metodo2 from './pages/Metodo2';
import Metodo3 from './pages/Metodo3';

import { useAuth } from './context/Auth';

function PrivateRoute(props) {
	const { auth } = useAuth();
	const Route = props.component;

	if (auth.isAuthenticated) {
		return <Route />
	}

	return <Navigate to="/" />
}

function AppRoutes() {
	return (
		<BrowserRouter>
			<div id="background">
				<Routes>
					<Route path="/" element={<Login />} />

					<Route path="/metodo/1" element={<PrivateRoute component={Metodo1} />} />
					<Route path="/metodo/2" element={<PrivateRoute component={Metodo2} />} />
					<Route path="/metodo/3" element={<PrivateRoute component={Metodo3} />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default AppRoutes;