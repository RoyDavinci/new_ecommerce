import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { publicRequest } from "../../api/client";
import { Footer, Header } from "../../components";
import { orders } from "../../interfaces/order";
import "./payment.css";

export interface data {
	message: string;
	searchForOrder: orders;
}

export type gateWayResponse = {
	link: string;
	transactionId: number;
};

export const Payment = () => {
	const id = localStorage.getItem("orderId");

	const [allOrders, setAllOrders] = useState<orders>();

	const proceedToPayment = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		try {
			const { data } = await publicRequest.post(
				`http://localhost:8090/api/v1/transaction/start-transaction/${id}`
			);
			const response = data as gateWayResponse;
			if (response.link) {
				window.location.replace(response.link);
				localStorage.setItem(
					"transactionId",
					response.transactionId.toString()
				);
			}
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const getOrders = async () => {
			try {
				const { data } = await publicRequest.get(
					`http://localhost:8090/api/v1/order/${id}`
				);
				console.log(data);
				const items = data as data;
				setAllOrders(items.searchForOrder);
			} catch (error) {
				console.log(error);
			}
		};
		getOrders();
		return () => {
			console.log("cleared on mount");
		};
	}, [id]);

	return (
		<div>
			<Header />
			<main>
				<section>{!allOrders && <h1>Orders does not exist</h1>}</section>
				<section className='p-6'>
					{allOrders && (
						<article className=' article__order__container p-4'>
							<h1 className='text-center underline'>Order</h1>
							<div className='flex justify-between items-center leading-10'>
								<p>Name</p> <p>{allOrders.name}</p>
							</div>
							<div className='flex justify-between items-center leading-10'>
								<p>Address</p> <p>{allOrders.address}</p>
							</div>
							<div className='flex justify-between items-center leading-10'>
								<p>Email</p> <p>{allOrders.email}</p>
							</div>
							<div className='flex justify-between items-center leading-10'>
								<p>Status</p> <p>{allOrders.status}</p>
							</div>
							<div className='flex justify-between items-center leading-10'>
								<p>Total Amount</p> <p>{allOrders.total_amount}</p>
							</div>
							<div className='mx-auto my-0 text-center'>
								<button
									onClick={proceedToPayment}
									className='bg-[#4285F4]  mx-auto text-white p-4 rounded my-4'
								>
									Proceed To Payment
								</button>
							</div>
						</article>
					)}
				</section>
			</main>
			<Footer />
		</div>
	);
};
