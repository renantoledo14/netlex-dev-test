import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export default function AuthProvider(props) {

	const [auth, setAuth] = useState({ isAuthenticated: false, token: ''});

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{props.children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	const { auth, setAuth } = context;

	return { auth, setAuth };
}