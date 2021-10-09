import {createContext,useState,useEffect} from 'react'
import { useRouter } from 'next/dist/client/router'
import {API_URL} from '../config/index '

const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
const [user,setUser] = useState(null)
const [error,setError] = useState(null)

const register = async (user)=>{
console.log(user);
}

const logIn = async (user) => {
	console.log(user);
};

const logOut = async (user) => {
	console.log(user);
};

const userLogin = async (user) => {
	console.log(user);
};

}