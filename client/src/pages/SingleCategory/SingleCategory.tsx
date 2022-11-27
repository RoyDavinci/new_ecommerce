import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Footer, Header } from "../../components";
import LoadingComponent from "../../components/Loading";
import { getCategoryByName } from "../../features/categories/cateorySlice";
import { SingleCategoryInterface } from "../../interfaces/category";
import { ErrorResponse } from "../../interfaces/error";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import "./singleCategory.css";
import { addToCart } from "../../features/cart/cartSlice";

export const SingleCategory: React.FC = () => {
	const { name } = useParams();

	const [singleCategory, setSingleCategory] = useState<
		SingleCategoryInterface[]
	>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>();

	const { data } = useAppSelector((state) => state.cart);
	console.log(data);

	const dispatch = useAppDispatch();

	const addItemToCart = (e: BaseSyntheticEvent, id: number) => {
		e.preventDefault();
		const item = singleCategory.find((item) => item.id === id);
		dispatch(addToCart(item));
	};

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				if (name) {
					const item = await getCategoryByName(name);
					setSingleCategory(item);
					setLoading(false);
					// console.log(item);
				}
			} catch (error) {
				const errors = error as unknown as ErrorResponse;
				console.log(error);
				setError(errors.message);
				setLoading(false);
			}
		};
		fetchCategory();
		return () => {
			console.log("cleaning useeffect");
		};
	}, [name]);

	return (
		<div>
			<Header></Header>
			<div className='products__categoryContainer'>
				{loading && <LoadingComponent card={true}>{}</LoadingComponent>}
				{error && <p>{error}</p>}
				{!loading &&
					singleCategory.map((item) => {
						return (
							<div
								className='products__categoryContainer__coontent'
								key={item.id}
							>
								<img src={item.images && item?.images[0]} alt='' />
								<h4>{item.name}</h4>
								<p>{item.description}</p>
								<div className='star__categoryContainer'>
									<i className='fa-solid fa-star'></i>
									<i className='fa-solid fa-star'></i>
									<i className='fa-solid fa-star'></i>
									<i className='fa-solid fa-star'></i>
									<i className='fa-solid fa-star'></i>
									<span>(85)</span>
								</div>
								<div className='cart__singlePRoduct'>
									<p>
										<span></span>
										<span style={{ display: "block" }}>₦{item.price}</span>
									</p>
									<button onClick={(e) => addItemToCart(e, item.id)}>
										Add To Cart
									</button>
								</div>
							</div>
						);
					})}
			</div>
			<Footer></Footer>
		</div>
	);
};
