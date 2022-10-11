import React from "react";
import { Header, Hero, Category, Blog } from "../../components";
import images from "../../images";
import { data } from "../../utils/data";
import "./home.css";

export const Home = () => {
	return (
		<div>
			<div className='app__header'>
				<Header
					logo={images.logoLight}
					cartItems={1}
					user={false}
					links={data}
					userImg={images.userImg}
				></Header>
				<Hero></Hero>
			</div>
			<div
				className='home__categoryContainer'
				style={{
					margin: "0px 45px",
				}}
			>
				<Category></Category>
			</div>
			<Blog></Blog>
			<div className='home__newsletterContainer'>
				<p>Newsletter</p>
				<p>Subscribe to our newsletter for tips on your car</p>
				<form action=''>
					<input type='email' />
					<button>Submit</button>
				</form>
			</div>
		</div>
	);
};
