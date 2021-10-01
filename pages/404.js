import Layout from "@/components/Layout";
import style from "@/styles/404.module.css";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function error() {
	return (
		<Layout title='Page Not Found'>
			<div className={style.error}>
				<h1>
					<FaExclamationTriangle /> 404
				</h1>
				<h4>Sorry, there is nothing here</h4>
				<Link href='/'>Go Back Home</Link>
			</div>
		</Layout>
	);
}
