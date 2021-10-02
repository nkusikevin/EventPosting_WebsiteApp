import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
export default function EventsPage({ events }) {
	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 && <h3>No events available now</h3>}
			{events.map((evt) => (
				<EventItem evt={evt} key={evt.id} />
			))}
		</Layout>
	);
}

export async function getServerSideProps() {
	const res = await fetch(`${API_URL}/api/events`);
	const events = await res.json();
	return {
		props: {
			events,
		},
	};
}
