import React, { useEffect, useState } from "react";
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
											<div className='cart__itemsImg__container lg:flex items-center'>
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
													disabled={item.quantity === 1 && true}
												>
													<i className='fa-solid fa-minus'></i>
												</button>
											</div>
											<div className='flex items-center justify-center'>
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
						<section className='main_Cart__container__section __secondSection'>
							<article>
								<h1>Shipping and Tax</h1>
								<div className='subtotal'>
									<h2>Total</h2>
								</div>
							</article>
						</section>
					</main>
				</>
			)}
			<Footer />
		</div>
	);
};
