import React from "react";
import { Link } from "react-router-dom";
import "./categoryItems.css";

export interface categoryItems {
	image: string;
	name: string;
	description: string;
	children?: React.ReactNode;
	id?: number;
}

export const CategoryItems: React.FC<categoryItems> = ({
	image,
	name,
	description,
}) => {
	return (
		<div className='categoryItems__container'>
			<Link to={`/categories/${name}`}>
				<img src={image} alt='' />
				<h2>{name}</h2>
				<p>{description}</p>
				<button>
					<i className='fa-solid fa-arrow-right'></i>
				</button>
			</Link>
		</div>
	);
};
