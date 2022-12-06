import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../../api/client";
import { Footer, Header } from "../../components";
import "./transaction.css";

export interface response {
	status: boolean;
	message: string;
}

export const Transaction = () => {
	const id = localStorage.getItem("transactionId");

	const [transactionStatus, setTransactionStatus] = useState<boolean>(false);

	useEffect(() => {
		const getTransactionStatus = async () => {
			try {
				const { data } = await publicRequest.post(
					`http://localhost:8090/api/v1/transaction/verify-transaction/${id}`
				);
				const response = data as response;
				setTransactionStatus(response.status);
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		};
		getTransactionStatus();
		return () => {
			console.log("cleared on unmount");
		};
	}, [id]);
	return (
		<div>
			<Header />
			<section className='section__transaction__container flex flex-col justify-center items-center'>
				<article className='article__transaction__container p-6 leading-10 text-center'>
					{transactionStatus ? (
						<>
							<h1>Payment Successful</h1>
							<p>Contact Admin with Order_ID sent to your email</p>
							<i className='fa-solid fa-check'></i>
							<Link
								to='/products'
								className='bg-[#4285f4] text-white p-2 w-full  text-center justify-center flex items-center my-4'
							>
								Continue Shopping
							</Link>
						</>
					) : (
						<>
							<h1>Payment UnSuccessful</h1>
							<p>Contact Admin with Order_ID sent to your email</p>
							<i className='fa-solid fa-check'></i>
							<form action=''></form>
							<Link
								to='/products'
								className='bg-[#4285f4] text-white p-2 w-full  text-center justify-center flex items-center my-4'
							>
								Continue Shopping
							</Link>
						</>
					)}
				</article>
			</section>
			<Footer />
		</div>
	);
};
