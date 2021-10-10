import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { API_URL } from "@/config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	const register = async (user) => {
		console.log(user);
	};

	const logIn = async ({ email: identifier, password }) => {
		console.log(identifier, password);
	};

	const logOut = async () => {
		console.log("loged out msza");
	};

	const checkUserLoggedIn = async (user) => {
		console.log("checked");
	};

	return (
		<AuthContext.Provider value={{ user, error, register, logIn, logOut }}>
			{children}
		</AuthContext.Provider>
	);
};


export default AuthContext;