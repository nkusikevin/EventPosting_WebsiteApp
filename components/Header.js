import Link from "next/link";
import Search from "./Search";
import styles from "@/styles/Header.module.css";
export default function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href='/'>
					<a>Dj Events</a>
				</Link>
			</div>
			<Search />
			<nav>
				<ul>
					<li>
						<Link href='/events'>
							<a>Events</a>
						</Link>
					</li>
					<li>
						<Link href='/events/add'>
							<a>Add Events</a>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
