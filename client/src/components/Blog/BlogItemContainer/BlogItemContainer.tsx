import React from "react";
import "./blogItemContainer.css";

export interface BlogItemContainers {
	image: string;
	title: string;
	description: string;
	children?: React.ReactNode;
}

export const BlogItemContainer: React.FC<BlogItemContainers> = ({
	image,
	title,
	description,
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
		</section>
	);
};
