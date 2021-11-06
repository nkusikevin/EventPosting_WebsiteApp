import React, { useState } from "react";
import moment from "moment";
import { parseCookies } from "@/helper/index";
import {FaImage} from 'react-icons/fa'
import { useRouter } from "next/router";
import Link from "next/dist/client/link";
import Layout from "@/components/Layout";
import Modal from '@/components/Modal'
import ImageUpload from "@/components/ImageUpload";
import Image from "next/image";
import styles from "@/styles/Form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@/config/index";

export default function EditEventsPage({ evt ,token}) {
	const router = useRouter();
	const [showModal , setShowModal] = useState(false)
	const [values, setValues] = useState({
		name: evt.name,
		performers: evt.performers,
		address: evt.address,
		date: evt.date,
		venue: evt.venue,
		time: evt.time,
		description: evt.description,
	});
	const [imagePreview, setImagePreview] = useState(
		evt.image ? evt.image.formats.thumbnail.url : null
	);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const hasEmptyFields = Object.values(values).some(
			(element) => element === ""
		);
		if (hasEmptyFields) {
			toast.error("are you kinding mee");
		}
		const res = await fetch(`${API_URL}/events/${evt.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(values),
		});
		if (!res.ok) {
			if (res.status === 403 || res.status === 401) {
				toast.error("No Token included");
				return;
			}
			toast.error("Somethig went Wrong");
		} else {
			const evt = await res.json();
			router.push(`/events/${evt.slug}`);
		}
	};
	const handleInputChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};
  const imageUploaded = async (e) => {
		const res = await fetch(`${API_URL}/events/${evt.id}`);
		const data = await res.json();
		setImagePreview(data.image.formats.thumbnail.url);
		setShowModal(false);
	};

	return (
		<Layout title='Add New Event'>
			<Link href='/events'>Go Back</Link>
			<h1>Edit Event</h1>
			<ToastContainer />
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.grid}>
					<div>
						<label htmlFor='name'>Event Name</label>
						<input
							type='text'
							id='name'
							name='name'
							value={values.name}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='performers'>Performers</label>
						<input
							type='text'
							name='performers'
							id='performers'
							value={values.performers}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='venue'>Venue</label>
						<input
							type='text'
							name='venue'
							id='venue'
							value={values.venue}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='address'>Address</label>
						<input
							type='text'
							name='address'
							id='address'
							value={values.address}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='date'>Date</label>
						<input
							type='date'
							name='date'
							id='date'
							value={moment(values.date).format("yyyy-MM-DD")}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='time'>Time</label>
						<input
							type='text'
							name='time'
							id='time'
							value={values.time}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div>
					<label htmlFor='description'>Event Description</label>
					<textarea
						type='text'
						name='description'
						id='description'
						value={values.description}
						onChange={handleInputChange}></textarea>
				</div>

				<input type='submit' value='Update Event' className='btn' />
			</form>
			<h1>Event Image</h1>
			{imagePreview ? (
				<Image src={imagePreview} height={100} width={170} />
			) : (
				<div>
					<p>No Image Uploaded</p>
				</div>
			)}
			<div>
				<button className='btn-secondary' onClick={() => setShowModal(true)}>
					<FaImage /> Set Image
				</button>
			</div>
			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<ImageUpload
					evtId={evt.id}
					imageUploaded={imageUploaded}
					token={token}
				/>
			</Modal>
		</Layout>
	);
}

export async function getServerSideProps({ params: { id } ,req}) {
	const { token } = parseCookies(req);

	const res = await fetch(`${API_URL}/events/${id}`);
	const evt = await res.json();
	return {
		props: {
			evt,
			token
		},
	};
}
