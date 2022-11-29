import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Footer, Header } from "../../components";
import { getSingleProduct } from "../../features/products/productSlice";
import { ProductInterface } from "../../interfaces/product";
import { useAppDispatch } from "../../app/hooks";
import { addToCart } from "../../features/cart/cartSlice";
import "./singleProduct.css";

export const SingleProduct = () => {
	const [singleItem, setSingleItem] = useState<ProductInterface>();
	const [singleItems, setSingleItems] = useState<ProductInterface[]>();
	const { id } = useParams();
	console.log(id);

	const dispatch = useAppDispatch();

	useEffect(() => {
		const getData = async () => {
			const item = await getSingleProduct(Number(id));
			// console.log(item);
			setSingleItem(item.message);
			setSingleItems(item.findProducts);
		};
		getData();
		return () => {
			console.log("cleared on mount");
		};
	}, [id]);

	console.log(singleItem, singleItems);

	return (
		<div>
			<Header />
			<section>
				{singleItem && (
					<article className='singleProduct__Container grid  gap-6'>
						<div className='singleProduct__imgContainer'>
							<img src={singleItem.images[0]} alt='' />
						</div>
						<div className='singleProduct__contentContainer flex flex-col justify-center  sm:p-6'>
							<h1>{singleItem.name}</h1>
							<p>{singleItem.description}</p>
							<h1>
								₦ {""}
								{singleItem.price}
							</h1>
							<button
								className='bg-[#4285f4] text-white p-4 w-80 text-center justify-center flex items-center'
								onClick={() => dispatch(addToCart(singleItem))}
							>
								<i className='fa-solid fa-cart-shopping mx-2'></i>
								<span>Add To Cart</span>
							</button>
						</div>
					</article>
				)}
			</section>
			<section>
				{singleItems && (
					<>
						<h1 className='text-center'>Users also Viewed</h1>
						<article className='all__products__user__viewed'>
							{singleItems.map((item) => {
								return (
									<Link key={item.id} to={`/products/${item.id}`}>
										<div className='text-center flex justify-center items-center'>
											<img src={item.images[0]} alt='' />
										</div>
										<p>{item.name}</p>
										<p>
											₦ {""}
											{item.price}
										</p>
									</Link>
								);
							})}
						</article>
					</>
				)}
			</section>
			<Footer />
		</div>
	);
};
