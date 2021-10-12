import React from "react";
import { API_URL } from "@/config/index";
import {parseCookies} from "@/helper/index"
import Layout from "@/components/Layout";

export default function dashboard({events}) {
	console.log(events);
	return (
		<Layout title='Dashboard'>
			<h1>Welcome</h1>
		</Layout>
	);
}


export  async function getServerSideProps({req}){
const {token} = parseCookies(req)
const res = await fetch(`${API_URL}/events/me`,{
	method:'GET',
	Authorization:`Bearer ${token}`
})

const events = await res.json()
return {
	props:{
		events
	}
}
}