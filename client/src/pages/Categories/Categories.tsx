import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Footer, Header } from "../../components";
import images from "../../images";
import { linksData, categoryData } from "../../utils/data";
import "./categories.css";
import { CategoryItems } from "./CategoryItem/CategoryItems";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getCategories } from "../../features/categories/cateorySlice";
import LoadingComponent from "../../components/Loading";
import { categoryPayloadResponse } from "../../interfaces/category";

export const Categories = () => {
	const location = useLocation();
	const [loading, setLoading] = useState<boolean>(true);
	const [getCategoryData, setGetCategoryData] = useState<
		categoryPayloadResponse[]
	>([]);

	// const user = localStorage.getItem("user");
	// console.log(getCategoryData);

	const dispatch = useAppDispatch();

	const { categoryData, status } = useAppSelector((state) => state.category);
	// console.log(categoryData);

	useEffect(() => {
		const fetchCategories = () => {
			try {
				dispatch(getCategories());
				setGetCategoryData(categoryData);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchCategories();
		return () => {
			console.log("this will log on unmount");
		};
	}, [loading, categoryData, dispatch]);

	return (
		<div className='categoriesContainer'>
			<Header
				logo={images.logoLight}
				cartItems={1}
				links={linksData}
				userImg={images.userImg}
			></Header>
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
			<Footer links={linksData} image={images.footerLogo}></Footer>
		</div>
	);
};
