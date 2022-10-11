import React from "react";
import "./blogItemContainer.css";

export interface BlogItemContainer {
	image: string;
	title: string;
	description: string;
	children?: React.ReactNode;
}

export const BlogItemContainer: React.FC<BlogItemContainer> = ({
	image,
	title,
	description,
}) => {
	return (
		<section className='blogItemContainer'>
			<article className='blogItem__imgContainer'>
				<img src={image} alt='' />
				<button></button>
			</article>
			<h3>{title}</h3>
			<p>{description}</p>
		</section>
	);
};
