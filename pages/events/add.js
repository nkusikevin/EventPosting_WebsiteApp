import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/dist/client/link";
import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";
export default function add() {
	const router = useRouter();
	const [values, setValues] = useState({
		name: "",
		performers: "",
		address: "",
		date: "",
		time: "",
		description: "",
	});
	const handleSubmit = (e) => {
		e.preventDefault();
        console.log(values);
	};
	const handleInputChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};
	return (
		<Layout title='Add New Event'>
			<Link href='/events'>Go Back</Link>
			<h1>ADD EVENTS</h1>
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
							value={values.date}
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

				<input type='submit' value='Add Event' className='btn' />
			</form>
		</Layout>
	);
}
