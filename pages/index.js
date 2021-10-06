import Layout from "@/components/Layout";
import Link from "next/dist/client/link";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
export default function Home({ events }) {
	return (
		<Layout>
			<h1>Upcoming Events</h1>
			{events.length === 0 && <h3>No events available now</h3>}
			{events.map((evt) => (
				<EventItem evt={evt} key={evt.id}/>
			))}
      {events.length>0 &&
      <Link href='/events'>
      <a className="btn-secondary">
        View More
      </a>
      </Link>
      }
		</Layout>
	);
}

export async function getServerSideProps() {
	const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
	const events = await res.json();
	return {
		props: {
			events,
		},
	};
}
