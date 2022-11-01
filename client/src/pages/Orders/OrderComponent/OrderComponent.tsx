import React, { useEffect, useState } from "react";
import "./orderComponent.css";
import orderItems from "../../../defaultData/orders";
import { orderItemInterface } from "../../../interfaces/order";

export const OrderComponent = () => {
	const [orderState, setOrderState] = useState("All");
	const [orders, setOrders] = useState<orderItemInterface[]>(orderItems);
	// const [filteredData, setFilteredData] = useState([]);

	const setFilteredPaid = () => {
		const filtered = orderItems.filter((item) => item.status === "paid");
		setOrders(filtered);
		setOrderState("completed");
		console.log(filtered);
	};

	const setFilteredAll = () => {
		setOrders(orderItems);
		setOrderState("All");
	};

	const setFilteredPending = () => {
		const filtered = orderItems.filter((item) => item.status === "pending");
		setOrders(filtered);
		setOrderState("pending");
		console.log(filtered);
	};

	return (
		<main className='order__componentContainer p-4'>
			<h1>Orders</h1>
			<section className='order__SectionCenter my-4'>
				<article className='order__sectionArticle newOrders'>
					<h3>New Orders</h3>
					<div className='newOrders__content flex items-center'>
						<h2>245</h2>
						<p className='mx-4'>|</p>
						<p>Impression - 20%</p>
					</div>
				</article>
				<article className='order__sectionArticle deliveredOrders'>
					<h3>Delivered Orders</h3>
					<div className='deliveredOrders__content flex items-center'>
						<h2>245</h2>
						<p className='mx-4'>|</p>
						<p>Impression - 20%</p>
					</div>
				</article>
				<article className='order__sectionArticle cancelledOrders'>
					<h3>Cancelled Orders</h3>
					<div className='cancelledOrders__content flex items-center'>
						<h2>245</h2>
						<p className='mx-4'>|</p>
						<p>Impression - 20%</p>
					</div>
				</article>
			</section>
			<section className='orderFilter bg-[#F9F9F9]'>
				<div className='orderFilter__content__contianer  flex justify-between items-center'>
					<div className='order__filtersContainer flex'>
						<h4
							className={
								orderState === "All" ? "state cursor-pointer" : "cursor-pointer"
							}
							onClick={setFilteredAll}
						>
							All Orders
						</h4>
						<h4
							className={
								orderState === "completed"
									? "state cursor-pointer"
									: "cursor-pointer"
							}
							onClick={setFilteredPaid}
						>
							Completed
						</h4>
						<h4
							className={
								orderState === "pending"
									? "state cursor-pointer"
									: "cursor-pointer"
							}
							onClick={setFilteredPending}
						>
							Pending
						</h4>
					</div>
					<div className='orderFilter__container flex justify-between items-center '>
						<p className='px-2'>
							<i className='fa-solid fa-filter'></i> Filters
						</p>
						<form action='' className='px-2'>
							<i className='fa-solid fa-magnifying-glass'></i>
							<input type='text' placeholder='Search' />
						</form>
						<p className='px-2 export'>
							<i className='fa-solid fa-download'></i> Export Table
						</p>
					</div>
				</div>
				<table>
					<thead>
						<tr>
							<th>
								<input type='checkbox' name='' id='' />
							</th>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Address</th>
							<th>Reference</th>
							<th>New Client?</th>
							<th>Price</th>
							<th>Payment</th>
							<th>Status</th>
							<th>More</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((item) => {
							return (
								<tr key={item.id}>
									<td>
										<input type='checkbox' name='' id='' />
									</td>
									<td>{item.id}</td>
									<td>{item.name}</td>
									<td>{item.email}</td>
									<td>{item.Address}</td>
									<td>{item.reference}</td>
									<td>{item.new ? "Yes" : "No"}</td>
									<td>{item.price}</td>
									<td>{item.payment}</td>
									<td className={item.status}>{item.status}</td>
									<td>
										<i className='fa-solid fa-eye cursor-pointer'></i>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</section>
		</main>
	);
};
