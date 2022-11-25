import React, { useEffect } from "react";
import { Footer, Header } from "../../components";
import "./cart.css";
import images from "../../images";
import { linksData } from "../../utils/data";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Link } from "react-router-dom";
import { calculateTotal } from "../../features/cart/cartSlice";

export const Cart = () => {
	const { data, total_amount } = useAppSelector((state) => state.cart);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(calculateTotal());
	}, [dispatch]);

	console.log(total_amount);

	console.log(data.length);
	return (
		<div>
			<Header />
			{data.length <= 0 && (
				<div>
					<section>
						<h1>No Items on your shopping Cart</h1>
					</section>
					<Link to='/'>Go To SHop</Link>
				</div>
			)}
			{data.length > 0 && (
				<section>
					<h1>Shopping Cart</h1>
					<p>You have {data.length} items in your cart</p>
					<article className='item__container__cart'>
						{data.map((item) => {
							return (
								<div key={item.id}>
									<div className='cart__itemsImg__container'>
										<img src={item.images[0]} alt='' />
										<p>{item.name}</p>
									</div>
									<div className='cart__itemsBtn__container'>
										<button>
											<i className='fa-solid fa-plus'></i>
										</button>
										<p>{item.quantity}</p>
										<button>
											<i className='fa-solid fa-minus'></i>
										</button>
									</div>
									<div>
										<p>₦{item.price}</p>
										<i className='fa-solid fa-trash'></i>
									</div>
								</div>
							);
						})}
					</article>
				</section>
			)}
			<Footer />
		</div>
	);
};
