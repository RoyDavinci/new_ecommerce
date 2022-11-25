import React from "react";
import { CategoryItem } from "./CategoryItem/CategoryItem";
import image from "../../images";
import "./category.css";
import { Link } from "react-router-dom";

export interface categoryProps {}

export const Category: React.FC<categoryProps> = () => {
	return (
		<div
			className='categoryContainer'
			style={{
				padding: "10px",
				display: "grid",
				gridTemplateColumns: "1.5fr 2.5fr",
				margin: "30px 0px",
			}}
		>
			<div
				className='categoryContainer__content'
				style={{
					padding: "10px",
				}}
			>
				<h2>Popular Categories</h2>
				<p>
					Now you can browse from
					<Link to={"/categories"}>100,000 products</Link> choose your category
					and narrow down what you are searching for
				</p>
				<button>
					<Link to='/categories'>
						Browse Categories <i className='fa-solid fa-arrow-right-long'></i>
					</Link>
				</button>
			</div>
			<div className='category__item__container'>
				<CategoryItem
					image={image.tyres}
					title='Select From a range of tyres'
					link='tyres'
				>
					{" "}
				</CategoryItem>
				<CategoryItem
					image={image.engine}
					title='Select From a range of engines'
					link='tyres'
				>
					{" "}
				</CategoryItem>
				<CategoryItem
					image={image.windshield}
					title='Select From a range of windshields'
					link='tyres'
				>
					{" "}
				</CategoryItem>
			</div>
		</div>
	);
};
