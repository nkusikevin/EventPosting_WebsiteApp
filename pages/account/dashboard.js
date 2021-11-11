import { parseCookies } from "@/helper/index";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import DashboardEvent from "@/components/DashboardEvent";
import { API_URL } from "@/config/index";
import styles from "@/styles/Dashboard.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardPage({ events ,token}) {
	const router = useRouter();
	 const deleteEvent = async(id) => {
			if (confirm("Are you sure")) {
				console.log(token);
				const res = await fetch(`${API_URL}/events/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				const data = await res.json();
				if (!res.ok) {
					toast.error(data.message);
				} else {
					router.push("/events");
				}
			}
		};
	return (
		<Layout title='User Dashboard'>
			<ToastContainer />
			<div className={styles.dash}>
				<h1>Welcome Back :)</h1>
				<h3>My Event</h3>

				{events.map((evt) => (
					<DashboardEvent
						key={evt.id}
						evt={evt}
						handleDelete={() => deleteEvent(evt.id)}
					/>
				))}
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ req }) {
	const { token } = parseCookies(req);

	const res = await fetch(`${API_URL}/events/me`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const events = await res.json();
	return {
		props: {
			events,
			token
		},
	};
}
