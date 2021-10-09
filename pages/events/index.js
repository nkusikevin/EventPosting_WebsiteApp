import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";
import { Per_Page } from "@/config/index";
export default function EventsPage({ events,total,page }) {

	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 && <h3>No events available now</h3>}
			{events.map((evt) => (
				<EventItem evt={evt} key={evt.id} />
			))}
			<Pagination total={total} page={page}/>
		</Layout>
	);
}

export async function getServerSideProps({query:{page= 1}}) {

	// calculate pagination
	const start = +page === 1 ? 0 :(+page-1)*Per_Page;
	//find total events
	const totalEvents = await fetch(`${API_URL}/events/count`)
	const total = await totalEvents.json()

	const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${Per_Page}&_start=${start}`);
	const events = await res.json();
	return {
	 	props: {
			events,
			page:+page,
			total
		},
	};
}
