import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import { useRouter } from "next/router";
export default function SingleEvent({ evt }) {
	const router  = useRouter()
	const deleteHandler = async() => {
		if(confirm("Are you sure")){
		 const res =  await fetch(`${API_URL}/events/${evt.id}`,{
			 method:'DELETE'

		 })
		 const data = await res.json()
		 if(!res.ok){
			 toast.error(data.message)
		 }else{
			 router.push('/events')
		 }
		}
	};
	return (
		<Layout>
			<div className={styles.event}>
				<div className={styles.control}>
					<Link href={`/event/edit/${evt.id}`}>
						<a>
							<FaPencilAlt />
							Edit Event
						</a>
					</Link>
					<a href='#' className={styles.delete} onClick={deleteHandler}>
						<FaTimes /> Delete Event
					</a>
				</div>
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
