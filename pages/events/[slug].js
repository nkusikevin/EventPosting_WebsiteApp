import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Map from "@/components/Map"
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import { useRouter } from "next/router";
export default function SingleEvent({ evt }) {
	const router  = useRouter()
	return (
		<Layout>
			<div className={styles.event}>
				<span>
					{new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
				</span>
				<h1>{evt.name}</h1>
				<ToastContainer />
				{evt.image && (
					<div className={styles.image}>
						<Image
							src={evt.image.formats.medium.url}
							width={960}
							height={600}
						/>
					</div>
				)}

				<h3>Performers:</h3>
				<p>{evt.performers}</p>
				<h3>Description:</h3>
				<p>{evt.description}</p>
				<h3>Venue: {evt.venue}</h3>
				<p>{evt.address}</p>

				<Map evt={evt}/>
				<Link href='/events'>
					<a className={styles.back}>{"<"} Go Back</a>
				</Link>
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ query: { slug } }) {
	const res = await fetch(`${API_URL}/events?slug=${slug}`);
	const event = await res.json();

	return {
		props: {
			evt: event[0],
		},
	};
}
