import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { publicRequest } from "../../api/client";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Footer, Header } from "../../components";
import {
	calculateTotal,
	calculateTotalQuantity,
} from "../../features/cart/cartSlice";
import { createOrders } from "../../features/orders/orderSlice";
import { shippers } from "../../interfaces/order";
import paymentImage from "../../images/jpg/pexels-anna-shvets-4482900.jpg";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
	const [shippers, setShippers] = useState<shippers[]>([]);
	const [shippingPrice, setShippingPrice] = useState<number>(0);
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
	const navigate = useNavigate();

	const { data, total_amount, total_quantity } = useAppSelector(
		(state) => state.cart
	);

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
			total_amount: (total_amount + shippingPrice).toString(),
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
			navigate("/payment");
			// localStorage.setItem("payment_type", item.createNewOrder.payment_type);
		} else if (item.message.includes("error")) {
			toast.error("An Error Occured processing your request");
		}
	};

	useEffect(() => {
		if (userData.shipperId) {
			let price = filteredShippers.find(
				(item) => item.id === Number(userData.shipperId)
			);
			price && setShippingPrice((prev) => prev + Number(price?.price));
		}
	}, [filteredShippers, userData.shipperId]);

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
		<>
			<Header />
			<section className='main_Cart__container__section __secondSection lg:grid lg:grid-cols-2 gap-6 p-6'>
				<article>
					<h1 className='text-black'>Payment Details</h1>
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
								<option value='Select A Destination'>Select A Shipper</option>
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
								<option value='Select A Payment Type'>
									Select A Payment Type
								</option>
								<option value='flutterwave'>Flutterwave</option>
								<option value='paystack'>Paystack</option>
							</select>
						</div>
						<button className='bg-[#4285F4] text-white p-4 rounded my-4'>
							Create Order
						</button>
					</form>
				</article>
				<article
					className='well'
					style={{
						backgroundImage: `url(${paymentImage})`,
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
					}}
				></article>
			</section>
			<Footer />
		</>
	);
};
