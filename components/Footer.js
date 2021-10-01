import Link from "next/link"
import style from "../styles/Footer.module.css"
export default function Footer() {
    return (
			<footer className={style.footer}>
				<p>Copyright &copy; DJ Events {new Date().getFullYear()}</p>
				<p>
					<Link href='/about'>Made With Love By N.Kevin</Link>
				</p>
			</footer>
		);
}
