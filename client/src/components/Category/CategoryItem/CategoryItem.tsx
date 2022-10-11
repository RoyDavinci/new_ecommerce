import React from "react";
import { Link } from "react-router-dom";
import "./categoryItem.css";

export interface categoryItems {
	image: string;
	title: string;
	link: string;
	children: React.ReactNode;
}

export const CategoryItem: React.FC<categoryItems> = ({
	image,
	title,
	link,
	children,
}) => {
	return (
		<div
			className='categoryItem__container'
			style={{
				backgroundImage: `linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0.5),
                    rgba(0, 0, 0, 0.5)
                ),url(${image})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundPosition: "center",
				height: "150px",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				padding: "15px",
				color: "white",
				margin: "10px 0px",
			}}
		>
			<h2 style={{ width: "60%" }}>{title}</h2>
			<Link
				to={link}
				style={{
					padding: "10px 15px",
					backgroundColor: "#4285f4",
					color: "white",
				}}
			>
				<i className='fa-solid fa-arrow-right-long'></i>
			</Link>
		</div>
	);
};
