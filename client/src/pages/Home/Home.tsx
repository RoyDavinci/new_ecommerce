import React, { useEffect, useState } from "react";
import { Header, Hero, Blog, Footer } from "../../components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./home.css";
import { getCategories } from "../../features/categories/cateorySlice";
import { categoryPayloadResponse } from "../../interfaces/category";
import { Link } from "react-router-dom";

export const Home = () => {
	const { categoryData, status, error } = useAppSelector(
		(state) => state.category
	);
	const [categoryItems, setCategoryItems] =
		useState<categoryPayloadResponse[]>();
	const [errors, setErrors] = useState<{}>();

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (status === "idle") {
			dispatch(getCategories());
		}
		if (status === "successful") {
			setCategoryItems(categoryData);
		}
		if (status === "failed") {
			setErrors(error);
		}
	}, [status, dispatch, categoryData, error]);

	console.log(categoryData);
	return (
		<div>
			<div className='app__header'>
				<Header></Header>
				<Hero></Hero>
			</div>
			<section>
				{errors && <Link to='/categories'>Categories</Link>}
				<section>
					<div className='lg:flex lg:justify-between lg:items-center py-4 px-8 '>
						<h1>Shop By Category</h1>
						<button className='text-white  p-5 bg-[red] lg:rounded-full'>
							<Link to='/products'>Shop Now</Link>
						</button>
					</div>
					<div className='section__category__home__container p-8'>
						{categoryItems?.length &&
							categoryItems?.map((item) => {
								return (
									<div key={item.id} className='div__category__home__container'>
										<Link to={`/categories/${item.name}`}>
											<div
												style={{
													height: "200px",
													width: "300px",
													margin: "0 auto",
												}}
											>
												<img
													src={item.images}
													alt=''
													style={{
														width: "100%",
														height: "100%",
														objectFit: "contain",
													}}
												/>
											</div>
											<h2 className='text-center text-2xl py-8 bg-[#ccc] '>
												{item.name}
											</h2>
										</Link>
									</div>
								);
							})}
					</div>
				</section>
			</section>
			<Blog></Blog>
			<div className='home__newsletterContainer lg:flex lg:justify-between md:grid md:place-items-center sm:text-center'>
				<h2>Subscribe to our newsletter for tips on your car</h2>
				<form action=''>
					<input type='email' placeholder='getdata@gmail.com' />
					<button>Submit</button>
				</form>
			</div>
			<Footer></Footer>
		</div>
	);
};
