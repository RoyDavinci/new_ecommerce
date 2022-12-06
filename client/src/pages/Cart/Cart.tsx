import React, { useEffect } from "react";
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

export const Cart = () => {
	const { data, total_amount, total_quantity } = useAppSelector(
		(state) => state.cart
	);
	const dispatch = useAppDispatch();

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
					<main className='grid-container-cart  gap-10 main_Cart__container p-4'>
						<section className='main_Cart__container__section __firstSection'>
							<div className=''>
								<h1>Shopping Cart</h1>
								<p>
									You have {data.length} {data.length > 1 ? "items" : "item"} in
									your cart
								</p>
							</div>
							<article className='item__container__cart'>
								{data.map((item) => {
									return (
										<div
											key={item.id}
											className='grid grid-cols-3 lg:gap-10  items-center item__container__cart__div'
										>
											<div className='cart__itemsImg__container lg:flex justify-center'>
												<div
													style={{
														height: "50px",
														width: "100px",
														margin: "0px auto",
														display: "flex",
														alignItems: "center",
													}}
												>
													<img
														src={item.images[0]}
														alt=''
														style={{
															height: "100%",
															objectFit: "contain",
														}}
													/>
												</div>
												<p className='text-xs'>{item.name}</p>
											</div>
											<div className='cart__itemsBtn__container flex items-center justify-center text-sm'>
												<button
													onClick={() => dispatch(increaseQuantity(item))}
												>
													<i className='fa-solid fa-plus text-sm'></i>
												</button>
												<p className='text-sm'>{item.quantity}</p>
												<button
													onClick={() => dispatch(decreaseQuantity(item))}
													disabled={item.quantity === 1 && true}
												>
													<i className='fa-solid fa-minus text-sm'></i>
												</button>
											</div>
											<div className='flex items-center justify-center text-xs'>
												<p className=' mx-2 lg:mx-4 inline-flex items-center justify-center'>
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
						<section className='main_Cart__container__section __secondSection dark:bg-gray-800 bg-white flex flex-col justify-center items-center'>
							<article className='w-full'>
								<div className='flex justify-between border-b-[1px] my-2 py-2	border-[#ccc]'>
									<h2>SubTotal</h2>
									<p>₦{total_amount}</p>
								</div>
								<h2>Shipping and Tax</h2>
								<div className='subtotal flex justify-between my-2 py-2z'>
									<h2>Total Quantity:</h2>
									<p>{total_quantity}</p>
								</div>
								<div className='subtotal flex justify-between my-2 py-2'>
									<h2>Tax:</h2>
									<p>0</p>
								</div>
								<div className='subtotal border-b-[1px] border-t-[1px] border-[#ccc] flex justify-between my-2 py-2'>
									<h2>Total Amount:</h2>
									<p>₦{total_amount}</p>
								</div>
							</article>
							<Link
								to='/checkout'
								className='bg-[#4285F4] text-white p-4 rounded my-4'
							>
								Proceed To Checkout
							</Link>
						</section>
					</main>
				</>
			)}

			<Footer />
		</div>
	);
};
