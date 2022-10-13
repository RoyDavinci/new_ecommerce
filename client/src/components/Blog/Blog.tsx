import React from "react";
import "./blog.css";
import { blogData } from "../../utils/data";
import { BlogItemContainer } from "./BlogItemContainer/BlogItemContainer";

export const Blog = () => {
	return (
		<div className='blogContainer'>
			<h1>Tips and Tricks</h1>
			<div className='blogContainer__blogContent'>
				{blogData.map((item, index) => {
					return (
						<div key={index}>
							<BlogItemContainer
								image={item.image}
								description={item.description}
								title={item.title}
							></BlogItemContainer>
						</div>
					);
				})}
			</div>
		</div>
	);
};