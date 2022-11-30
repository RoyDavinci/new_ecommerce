import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import "./hero.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getProducts } from "../../features/products/productSlice";
import { ProductInterface } from "../../interfaces/product";
import { addToCart } from "../../features/cart/cartSlice";
export interface HeroProps {}

const getUnique = (
	items: ProductInterface[],
	value: keyof ProductInterface
) => {
	return [...new Set(items.map((item) => item[value]))];
};

export const Hero: React.FunctionComponent<HeroProps> = () => {
	const dispatch = useAppDispatch();
	const [products, setProducts] = useState<ProductInterface[]>([]);
	const [errors, setErrors] = useState<{}>();
	const [year, setYear] =
		useState<(string | number | Date | null | undefined | string[])[]>();
	const [selectNames, setSelectNames] =
		useState<(string | number | Date | null | undefined | string[])[]>();

	const { data, status, error } = useAppSelector((state) => state.allProducts);

	const addItemToCart = (e: BaseSyntheticEvent, id: number) => {
		e.preventDefault();
		const item = products.find((item) => item.id === id);
		dispatch(addToCart(item));
	};

	useEffect(() => {
		if (status === "idle") {
			dispatch(getProducts());
		}
		if (status === "successful") {
			setProducts(data);
			const items = getUnique(data, "make");
			const years = getUnique(data, "year");
			setYear(years);
			setSelectNames(items);
		}
		if (status === "failed") {
			setErrors(error);
		}
	}, [dispatch, status, data, error]);

	return (
		<>
			<div className='heroContainer'>
				<div className='heroImgContainer'>
					<div className='heroImg__content'>
						<h1>Find The Parts for your Vehicle</h1>
						<h2 className='text-2xl'>Best Deals Across Board</h2>
						<form action=''>
							<select name='' id=''>
								<option value=''>Select Your Make</option>
								{selectNames &&
									selectNames.map((item, index) => {
										return (
											typeof item === "string" && (
												<option key={index}>{item}</option>
											)
										);
									})}
							</select>
							<select name='' id=''>
								<option value=''>Choose Year</option>
								{year &&
									year.map((item, index) => {
										return (
											typeof item === "string" && (
												<option key={index}>{item}</option>
											)
										);
									})}
							</select>
							<button>Filter</button>
						</form>
					</div>
				</div>
			</div>
			<main>
				<section>
					{errors && (
						<article className='flex justify-center items-center bg-white text-black h-96	'>
							<div className='flex justify-center items-center flex-col'>
								<h1>An Error Occured</h1>
								<p>Try Again Later</p>
							</div>
						</article>
					)}
				</section>
				<section className='grid__Section__hero'>
					{products.length > 1 &&
						products.slice(0, 12).map((item) => {
							return (
								<div key={item.id} className='hero__img__container__products'>
									<div
										style={{
											height: "300px",
											width: "300px",
											margin: "10px auto",
										}}
									>
										<img
											src={item.images[0]}
											alt=''
											style={{
												width: "100%",
												height: "100%",
												objectFit: "contain",
											}}
										/>
									</div>
									<div className='hero__img__container_content grid grid-cols-2 items-center gap-10'>
										<div>
											<p>{item.name}</p>
											<p>{item.price}</p>
										</div>
										<button
											className='bg-[#4285f4] text-white px-6 py-4 rounded'
											onClick={(e) => addItemToCart(e, item.id)}
										>
											Add To Cart
										</button>
									</div>
								</div>
							);
						})}
				</section>
			</main>
		</>
	);
};
