import Link from "next/link";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Search from "./Search";
import styles from "@/styles/Header.module.css";
export default function Header() {
	const { user, logOut } = useContext(AuthContext);
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
					{user ? (
						<>
							{/* if user is loged in */}
							<li>
								<Link href='/events/add'>
									<a>Add Events</a>
								</Link>
							</li>
							<li>
								<Link href='/account/dashboard'>
									<a>Dashboard</a>
								</Link>
							</li>
							<li>
								<button
									className='btn-secondary btn-icon'
									onClick={() => logOut()}>
									{" "}
									<FaSignOutAlt />
									LoginOut
								</button>
							</li>
						</>
					) : (
						<>
							{/* if not loged in */}
							<li>
								<Link href='/account/login'>
									<a className='btn-secondary btn-icon'>
										{" "}
										<FaSignInAlt />
										Login
									</a>
								</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
}
