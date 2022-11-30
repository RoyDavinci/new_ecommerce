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
				margin: "30px 0px",
			}}
		>
			<div
				className='category__item__container'
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill , minmax(200px 1fr))",
					placeItems: "center",
				}}
			>
				<CategoryItem
					image={image.tyres}
					title='Select From a range of tyres'
					link='/categories/Tires'
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
