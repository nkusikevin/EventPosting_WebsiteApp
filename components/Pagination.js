import Link from "next/link";
import { Per_Page } from "../config/index";
export default function Pagination({ total, page }) {
	const lastPage = Math.ceil(total / Per_Page);
	return (
		<>
			{page > 1 && (
				<Link href={`/events?page=${page - 1}`}>
					<a className='btn-secondary'>Prev</a>
				</Link>
			)}
			{page < lastPage && (
				<Link href={`/events?page=${page + 1}`}>
					<a className='btn-secondary'>next</a>
				</Link>
			)}
		</>
	);
}
