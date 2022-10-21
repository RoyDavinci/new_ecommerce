import React, { useEffect, useState } from "react";
import { Header, Hero, Category, Blog, Footer } from "../../components";
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
				<h2>Subscribe to our newsletter for tips on your car</h2>
				<form action=''>
					<input type='email' placeholder='getdata@gmail.com' />
					<button>Submit</button>
				</form>
			</div>
			<Footer links={data} image={images.footerLogo}></Footer>
		</div>
	);
};
