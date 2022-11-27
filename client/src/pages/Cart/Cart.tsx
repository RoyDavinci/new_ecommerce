import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Footer, Header } from "../../components";
import "./cart.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Link } from "react-router-dom";
import {
	calculateTotal,
	increaseQuantity,
	decreaseQuantity,
	removeFromCart,
	calculateTotalQuantity,
} from "../../features/cart/cartSlice";
import { shippers } from "../../interfaces/order";
import { publicRequest } from "../../api/client";
import { createOrders } from "../../features/orders/orderSlice";
import { toast } from "react-toastify";

export const Cart = () => {
	const { data, total_amount, total_quantity } = useAppSelector(
		(state) => state.cart
	);
	const [shippers, setShippers] = useState<shippers[]>([]);
	const [filteredShippers, setFilteredShippers] = useState<shippers[]>([]);

	const [userData, setUserData] = useState({
		name: "",
		email: "",
		phone: "",
		delivery_type: "",
		address: "",
		payment_type: "",
		shipperId: "",
	});

	const [lagos, setLagos] = useState<string>("");

	const dispatch = useAppDispatch();

	const onHandleChange = (
		e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const handleShippingData = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		setLagos(value);
	};

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		const orderItems = {
			name: userData.name,
			email: userData.email,
			address: userData.address,
			phone: userData.phone,
			payment_type: userData.payment_type,
			shipperId: userData.shipperId,
			delivery_type: userData.delivery_type,
			product_details: data,
			total_amount: total_amount.toString(),
			quantity: total_quantity,
		};

		const item = await createOrders(orderItems);
		if (item.message.includes("created")) {
			toast.success("order successfully created");
			setUserData({
				name: "",
				email: "",
				address: "",
				delivery_type: "",
				payment_type: "",
				shipperId: "",
				phone: "",
			});
			localStorage.setItem("orderId", item.createNewOrder.id);
			// localStorage.setItem("payment_type", item.createNewOrder.payment_type);
		} else if (item.message.includes("error")) {
			toast.error("An Error Occured processing your request");
		}
	};
	useEffect(() => {
		if (lagos === "lagos") {
			const filteredData = filteredShippers.filter(
				(item) => item.lagos === true
			);
			setShippers(filteredData);
		}
		if (lagos === "outside") {
			const filteredData = filteredShippers.filter(
				(item) => item.lagos === false
			);
			setShippers(filteredData);
		}
		return () => {
			console.log("cleared on unmount");
		};
	}, [filteredShippers, lagos]);

	useEffect(() => {
		const getShippers = async () => {
			const { data } = await publicRequest.get(
				"http://localhost:8090/api/v1/shipper/get-shipping"
			);
			setShippers(data.shippers);
			setFilteredShippers(data.shippers);
		};
		getShippers();
		return () => {
			console.log("cleared on unmount");
		};
	}, []);

	useEffect(() => {
		dispatch(calculateTotal());
		dispatch(calculateTotalQuantity());
	}, [dispatch, data]);

	return (
		<div>
			<Header />
			{data.length <= 0 && (
				<div className='no__itemInCart'>
					<section>
						<h1>No Items on your shopping Cart</h1>
					</section>
					<Link to='/products'>Continue Shopping</Link>
				</div>
			)}

			{data.length > 0 && (
				<>
					<h1>Shopping Cart</h1>
					<p>You have {data.length} items in your cart</p>

					<main className='grid grid-cols-2 gap-10 main_Cart__container p-8'>
						<section className='main_Cart__container__section __firstSection'>
							<article className='item__container__cart'>
								{data.map((item) => {
									return (
										<div
											key={item.id}
											className='grid grid-cols-3 gap-10 items-center item__container__cart__div'
										>
											<div className='cart__itemsImg__container flex items-center'>
												<img src={item.images[0]} alt='' />
												<p>{item.name}</p>
											</div>
											<div className='cart__itemsBtn__container flex items-center justify-center'>
												<button
													onClick={() => dispatch(increaseQuantity(item))}
												>
													<i className='fa-solid fa-plus'></i>
												</button>
												<p>{item.quantity}</p>
												<button
													onClick={() => dispatch(decreaseQuantity(item))}
												>
													<i className='fa-solid fa-minus'></i>
												</button>
											</div>
											<div className='flex items-center justify-center'>
												<p className='mx-4 inline-flex items-center justify-center'>
													₦{item.price}
												</p>
												<i
													className='fa-solid fa-trash '
													onClick={() => dispatch(removeFromCart(item))}
												></i>
											</div>
										</div>
									);
								})}
							</article>
						</section>

						<section className='main_Cart__container__section __secondSection '>
							<article>
								<h1>Payment Details</h1>
								<form action='' onSubmit={handleSubmit}>
									<div className='form__divContainer__orders'>
										<label htmlFor='name'>Name</label>
										<input
											type='text'
											name='name'
											id='name'
											value={userData.name}
											required
											onChange={onHandleChange}
										/>
									</div>
									<div className='form__divContainer__orders'>
										<label htmlFor='email'>Email</label>
										<input
											type='email'
											name='email'
											id='email'
											value={userData.email}
											required
											onChange={onHandleChange}
										/>
									</div>
									<div className='form__divContainer__orders'>
										<label htmlFor='phone'>Phone</label>
										<input
											type='text'
											id='phone'
											value={userData.phone}
											name='phone'
											required
											onChange={onHandleChange}
										/>
									</div>
									<div className='form__divContainer__orders'>
										<label htmlFor='address'>Address</label>
										<input
											type='text'
											id='address'
											value={userData.address}
											name='address'
											required
											onChange={onHandleChange}
										/>
									</div>
									<div className='form__divContainer__orders'>
										<label htmlFor='destination'>Delivery Type</label>
										<select
											name='destination'
											id='destination'
											value={lagos}
											onChange={handleShippingData}
											required
										>
											<option value='Select A Destination'>
												Select A Destination
											</option>
											<option value='lagos'>Lagos</option>
											<option value='outside'>Outside Lagos</option>
										</select>
									</div>
									<div className='form__divContainer__orders'>
										<label htmlFor='shipperId'>Delivery Type</label>
										<select
											name='shipperId'
											id='shipperId'
											value={userData.shipperId}
											onChange={onHandleChange}
											required
										>
											<option value='Select A Destination'>
												Select A Shipper
											</option>
											{shippers.length > 0 &&
												shippers.map((item) => {
													return (
														<option value={item.id} key={item.id}>
															{item.name} {item.price}
														</option>
													);
												})}
										</select>
									</div>
									<div className='form__divContainer__orders'>
										<label htmlFor='delivery_type'>Delivery Type</label>
										<select
											name='delivery_type'
											id='delivery_type'
											value={userData.delivery_type}
											onChange={onHandleChange}
											required
										>
											<option value='Select A Payment Type'>
												Select A Delivery Method
											</option>
											<option value='pickup'>Pickup</option>
											<option value='home_Delivery'>Home Delivery</option>
										</select>
									</div>
									<div className='form__divContainer__ordersRadio'>
										<label htmlFor='payment_type'>Payment Type</label>
										<select
											name='payment_type'
											id='payment_type'
											value={userData.payment_type}
											onChange={onHandleChange}
											required
										>
											<option value='Select A Payment Type' selected>
												Select A Payment Type
											</option>
											<option value='flutterwave'>Flutterwave</option>
											<option value='paystack'>Paystack</option>
										</select>
									</div>
									<button className='bg-[#4285F4] text-white p-4 rounded my-4'>
										{" "}
										Submit
									</button>
								</form>
							</article>
						</section>
					</main>
				</>
			)}
			<Footer />
		</div>
	);
};
