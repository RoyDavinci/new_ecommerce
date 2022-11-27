import React, { useEffect, useState } from "react";
import { Footer, Header } from "../../components";
import "./product.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getProducts } from "../../features/products/productSlice";
import { ProductInterface } from "../../interfaces/product";

export const Products = () => {
	const dispatch = useAppDispatch();
	const [products, setProducts] = useState<ProductInterface[]>([]);
	const [errorMessage, setErrorMessage] = useState({});

	const { data, error, status } = useAppSelector((state) => state.allProducts);

	useEffect(() => {
		if (status === "idle") {
			dispatch(getProducts());
		}
		if (status === "successful") {
			setProducts(data);
		}
		if (status === "failed") {
			setErrorMessage(error);
		}
		return () => {
			console.log("cleaned on unmount");
		};
	}, [data, dispatch, status, error]);

	console.log(products);

	return (
		<div>
			<Header />
			<main>
				{products.length > 0 && (
					<section className='grid grid-cols-3 gap-6'>
						{products.map((item) => {
							return (
								<article key={item.id} className='products__itemContainer'>
									<img src={item.images[0]} alt='' />
									<div className='products__itemContainer__content p-6'>
										<p className='flex justify-between font-semibold'>
											<span>{item.name}</span> <span>{item.model}</span>
										</p>
										<p>{item.description}</p>
										<p>
											<span>{item.make}</span> <span>{item.year}</span>
										</p>
										<p className='font-semibold	'>
											₦ {""} {item.price}
										</p>
									</div>
								</article>
							);
						})}
					</section>
				)}
			</main>
			<Footer />
		</div>
	);
};
