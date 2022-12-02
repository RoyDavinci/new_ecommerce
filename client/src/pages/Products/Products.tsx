import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Footer, Header } from "../../components";
import "./product.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getProducts } from "../../features/products/productSlice";
import { ProductInterface } from "../../interfaces/product";
import { Link } from "react-router-dom";
import { addToCart } from "../../features/cart/cartSlice";
import { payloadErrorResponse } from "../../interfaces/userinterfaces";

export const Products = () => {
	const dispatch = useAppDispatch();
	const [products, setProducts] = useState<ProductInterface[]>([]);
	const [productsFilter, setProductsFilter] = useState<ProductInterface[]>([]);
	const [errorMessage, setErrorMessage] = useState<payloadErrorResponse>({});
	// const [values, setValues] = useState({
	// 	name: "",
	// 	price: 0,
	// 	maxPrice: 0,
	// 	minPrice: 0,
	// });

	const { data, error, status } = useAppSelector((state) => state.allProducts);

	// const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const { name, value } = e.target;

	// 	// console.log(value);
	// 	setValues({ ...values, [name]: value });
	// 	// dispatch(filterProduct(Number(values.price)));
	// };

	// useEffect(() => {
	// 	const changeValue = () => {
	// 		let tempProducts = [...products];
	// 		tempProducts.filter((item) => item.price <= Number(values.price));
	// 		setProductsFilter(tempProducts);
	// 	};
	// 	changeValue();
	// 	return () => {
	// 		console.log("cleaning change value");
	// 	};
	// }, []);

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
			setProductsFilter(data);
		}
		if (status === "failed") {
			const err = error as unknown as payloadErrorResponse;
			setErrorMessage(err);
		}
		return () => {
			console.log("cleaned on unmount");
		};
	}, [data, dispatch, status, error]);
	// console.log(values);
	// const getValues = useCallback(() => {
	// 	let maxPrice = Math.max(...products.map((item) => item.price));
	// 	let minPrice = Math.min(...products.map((item) => item.price));
	// 	setValues({
	// 		...values,
	// 		price: maxPrice,
	// 		maxPrice: maxPrice,
	// 		minPrice,
	// 	});
	// }, [products]);

	// useEffect(() => {
	// 	getValues();

	// 	return () => {
	// 		console.log("cleaned on unmount");
	// 	};
	// }, [getValues]);

	return (
		<div>
			<Header />
			{errorMessage && <h1>{errorMessage.message}</h1>}
			<main>
				{productsFilter.length > 0 && (
					<div className='p-6'>
						<section>
							{/* <form action='' className='lg:flex justify-center items-center'>
								<div className='products__form__inputContainer mx-6'>
									<label htmlFor='name'>Name :</label>
									<input
										type='text'
										name='name'
										id='name'
										value={values.name}
										className=''
										onChange={onChange}
									/>
								</div>
								<div className='products__form__inputContainer mx-6 flex items-center'>
									<label htmlFor='price'>
										₦ {""}
										{values.price}
									</label>
									<input
										type='range'
										name='price'
										onChange={onChange}
										value={values.price}
										max={values.maxPrice}
										min={values.minPrice}
										id=''
										className='mx-6'
									/>
								</div>
							</form> */}
						</section>
						<section className='text-gray-600 body-font'>
							<div className='container px-2 py-5 mx-auto'>
								<div className='flex flex-wrap -m-2'>
									{products.map((item) => {
										return (
											<div
												className='lg:w-1/4 md:w-1/2 p-4 w-full  gap-4 product__Section__grid__container'
												key={item.id}
											>
												<Link to={`/products/${item.id}`} className='block '>
													<div
														style={{
															height: "300px",
															width: "auto",
															margin: "10px auto",
														}}
													>
														<img
															alt='ecommerce'
															className=''
															src={item.images[0]}
															style={{
																width: "100%",
																height: "100%",
																objectFit: "contain",
															}}
														/>
													</div>
												</Link>
												<div className='mt-4'>
													<h3 className='text-gray-500 text-xs tracking-widest title-font mb-1'>
														<span>{item.make}</span> <span>{item.year}</span>
													</h3>
													<h2 className='text-gray-900 title-font  font-medium my-2'>
														<span>{item.name}</span>
													</h2>
													<p className='mt-1'>₦ {item.price}</p>
												</div>
												<button
													className='bg-[#4285f4] text-white p-2 w-full  text-center justify-center flex items-center my-4'
													onClick={(e) => addItemToCart(e, item.id)}
												>
													Add To Cart
												</button>
											</div>
										);
									})}
								</div>
							</div>
						</section>
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
};
