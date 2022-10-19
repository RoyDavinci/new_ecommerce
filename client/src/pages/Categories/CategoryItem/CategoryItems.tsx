import React from "react";
import "./categoryItems.css";

export interface categoryItems {
	image: string;
	name: string;
	description: string;
	icon: string;
	children?: React.ReactNode;
}

export const CategoryItems: React.FC<categoryItems> = ({
	image,
	name,
	description,
	icon,
}) => {
	return (
		<div className='categoryItems__container'>
			<img src={image} alt='' />
			<h2>{name}</h2>
			<p>{description}</p>
			<button>
				<i className={icon}></i>
			</button>
		</div>
	);
};
