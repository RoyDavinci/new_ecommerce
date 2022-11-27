import React, { useEffect, useState } from "react";
import { Footer, Header } from "../../components";
import images from "../../images";
import "./categories.css";
import { CategoryItems } from "./CategoryItem/CategoryItems";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getCategories } from "../../features/categories/cateorySlice";
import LoadingComponent from "../../components/Loading";
import { categoryPayloadResponse } from "../../interfaces/category";
import { ErrorResponse } from "../../interfaces/error";

export const Categories = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [getCategoryData, setGetCategoryData] = useState<
		categoryPayloadResponse[]
	>([]);
	const [errors, setErrors] = useState<string>();

	// const user = localStorage.getItem("user");
	// console.log(getCategoryData);

	const dispatch = useAppDispatch();

	const { categoryData, status, error } = useAppSelector(
		(state) => state.category
	);

	useEffect(() => {
		if (status === "idle") {
			dispatch(getCategories());
		}
		if (status === "successful") {
			setGetCategoryData(categoryData);
			setLoading(false);
		}
		if (status === "failed") {
			const errorMessage = error as unknown as ErrorResponse;
			setErrors(errorMessage.message);
			setLoading(false);
		}
		return () => {
			console.log("this will log on unmount");
		};
	}, [loading, error, status, categoryData, dispatch]);

	return (
		<div className='categoriesContainer'>
			<Header></Header>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					alignItems: "center",
					justifyContent: "center",
					padding: "60px",
					backgroundColor: "#F6F6F6",
				}}
				className='categories__heroContainer'
			>
				<div className='categories__heroContent'>
					<h1>Select From A Wide Range Of Categories</h1>
					<article>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
							tempora cum sapiente voluptatum, optio exercitationem?
						</p>
					</article>
					<button>Shop Now</button>
					<div
						className='category__statistics'
						style={{ display: "flex", margin: "15px 0px" }}
					>
						<p style={{ textAlign: "center", marginRight: " 10px" }}>
							<span style={{ fontSize: "24px" }}>
								<strong>1534</strong>
							</span>
							<br />
							<span>Total Products</span>
						</p>
						<p style={{ textAlign: "center" }}>
							<span style={{ fontSize: "24px" }}>
								<strong>12750+</strong>
							</span>
							<br />
							<span>Happy Customers</span>
						</p>
					</div>
				</div>
				<img src={images.categoryImage} alt='' />
			</div>
			{/* {!loading && <LoadingComponent card={true}>{}</LoadingComponent>} */}
			{loading && <LoadingComponent card={true}>{}</LoadingComponent>}
			{errors && <p>{errors}</p>}
			{!loading && (
				<div className='categoriesContainer__categoryITems__container'>
					<h1>Explore By Category</h1>
					<div className='categoriesContainer__categoryITems__content'>
						{getCategoryData.map((item, index) => {
							return (
								<CategoryItems
									key={index}
									name={item.name}
									description={item.description}
									image={item.images}
								></CategoryItems>
							);
						})}
					</div>
				</div>
			)}
			<Footer></Footer>
		</div>
	);
};
