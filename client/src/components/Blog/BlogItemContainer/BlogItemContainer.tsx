import React from "react";
import { Link } from "react-router-dom";
import "./blogItemContainer.css";

export interface BlogItemContainers {
	image: string;
	title: string;
	description: string;
	children?: React.ReactNode;
	id: number;
}

export const BlogItemContainer: React.FC<BlogItemContainers> = ({
	image,
	title,
	description,
	id,
}) => {
	return (
		<section className='blogItemContainer'>
			<article className='blogItem__imgContainer'>
				<div>
					<img
						src={image}
						alt=''
						style={{
							width: "100%",
							height: "100%",
							objectFit: "contain",
						}}
					/>
				</div>
				<button></button>
			</article>
			<h3>{title}</h3>
			<p>{description}</p>
			<Link to={`/blog/${id}`} className='text-sky-500 text-lg'>
				Read More...
			</Link>
		</section>
	);
};
