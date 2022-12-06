import React from "react";
import "./blog.css";
import { blogData } from "../../utils/data";
import { BlogItemContainer } from "./BlogItemContainer/BlogItemContainer";

export const Blog = () => {
	return (
		<div className='blogContainer p-4'>
			<h1>Tips and Tricks</h1>
			<div className='blogContainer__blogContent'>
				{blogData.map((item, index) => {
					return (
						<div key={index}>
							<BlogItemContainer
								image={item.image}
								description={item.description}
								title={item.title}
								id={index}
							></BlogItemContainer>
						</div>
					);
				})}
			</div>
		</div>
	);
};
