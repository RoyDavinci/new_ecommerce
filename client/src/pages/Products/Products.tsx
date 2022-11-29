import React, { useEffect, useState } from "react";
import { Footer, Header } from "../../components";
import "./product.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getProducts } from "../../features/products/productSlice";
import { ProductInterface } from "../../interfaces/product";
import { Link } from "react-router-dom";

export const Products = () => {
	const dispatch = useAppDispatch();
	const [products, setProducts] = useState<ProductInterface[]>([]);
	const [productsFilter, setProductsFilter] = useState<ProductInterface[]>([]);
	const [errorMessage, setErrorMessage] = useState({});
	const [values, setValues] = useState({
		name: "",
		price: 0,
		maxPrice: 0,
		minPrice: 0,
	});

	const { data, error, status } = useAppSelector((state) => state.allProducts);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = e.target;

		// console.log(value);
		setValues({ ...values, [name]: value });
		// dispatch(filterProduct(Number(values.price)));
	};

	useEffect(() => {
		const changeValue = () => {
			let tempProducts = [...products];
			tempProducts.filter((item) => item.price <= Number(values.price));
			setProductsFilter(tempProducts);
		};
		changeValue();
		return () => {
			console.log("cleaning change value");
		};
	}, []);

	useEffect(() => {
		if (status === "idle") {
			dispatch(getProducts());
		}
		if (status === "successful") {
			setProducts(data);
			setProductsFilter(data);
		}
		if (status === "failed") {
			setErrorMessage(error);
		}
		return () => {
			console.log("cleaned on unmount");
		};
	}, [data, dispatch, status, error]);
	// console.log(values);

	useEffect(() => {
		const getValues = () => {
			let maxPrice = Math.max(...products.map((item) => item.price));
			let minPrice = Math.min(...products.map((item) => item.price));
			setValues({
				...values,
				price: maxPrice,
				maxPrice: maxPrice,
				minPrice,
			});
		};
		getValues();

		return () => {
			console.log("cleaned on unmount");
		};
	}, [products]);

	return (
		<div>
			<Header />
			<main>
				{productsFilter.length > 0 && (
					<div className='p-6'>
						<section>
							<form action='' className='flex'>
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
							</form>
						</section>
						<section className='grid grid-cols-3 gap-6'>
							{products.map((item) => {
								return (
									<Link to={`/products/${item.id}`} key={item.id}>
										<article className='products__itemContainer'>
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
									</Link>
								);
							})}
						</section>
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
};
