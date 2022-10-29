import React from "react";
import "./orderComponent.css";

export const OrderComponent = () => {
	const orderItems = [
		{
			id: 1,
			reference: "buybubudbu",
			new: true,
			price: 3000,
			payment: "Paypal",
			status: "pending",
			name: "Mathias Roy",
			email: "emsthias33@gmail.com",
			Address: "Ikeja Lagos",
		},
		{
			id: 2,
			reference: "buybubudbu",
			new: true,
			price: 3000,
			payment: "Check",
			status: "pending",
			name: "Mathias Roy",
			email: "emsthias33@gmail.com",
			Address: "Ikeja Lagos",
		},
		{
			id: 3,
			reference: "buybubudbu",
			new: false,
			price: 3000,
			payment: "Paystack",
			status: "paid",
			name: "Mathias Roy",
			email: "emsthias33@gmail.com",
			Address: "Ikeja Lagos",
		},
		{
			id: 4,
			reference: "buybubudbu",
			new: false,
			price: 3000,
			payment: "Check",
			status: "paid",
			name: "Mathias Roy",
			email: "emsthias33@gmail.com",
			Address: "Ikeja Lagos",
		},
		{
			id: 5,
			reference: "buybubudbu",
			new: true,
			price: 3000,
			payment: "Check",
			status: "pending",
			name: "Mathias Roy",
			email: "emsthias33@gmail.com",
			Address: "Ikeja Lagos",
		},
		{
			id: 6,
			reference: "buybubudbu",
			new: false,
			price: 3000,
			payment: "Flutterwave",
			status: "failed",
			name: "Mathias Roy",
			email: "emsthias33@gmail.com",
			Address: "Ikeja Lagos",
		},
		{
			id: 7,
			reference: "buybubudbu",
			new: true,
			price: 3000,
			payment: "Paypal",
			status: "failed",
			name: "Mathias Roy",
			email: "emsthias33@gmail.com",
			Address: "Ikeja Lagos",
		},
		{
			id: 8,
			reference: "buybubudbu",
			new: true,
			price: 3000,
			payment: "Paystack",
			status: "paid",
			name: "Mathias Roy",
			email: "emsthias33@gmail.com",
			Address: "Ikeja Lagos",
		},
	];

	return (
		<main className='order__componentContainer p-4'>
			<section className='orderComponent__headers flex justify-between'>
				<h1>Orders</h1>
				<article className='order__help flex'>
					<span className='cursor-pointer'>Help</span>
					<span className='statistics-paragraph cursor-pointer'>
						Order Statistics
					</span>
				</article>
			</section>
			<section className='orderFilter'>
				<div className='orderFilter__content__contianer  flex justify-between items-center'>
					<h4>Orders</h4>
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
						{orderItems.map((item) => {
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
