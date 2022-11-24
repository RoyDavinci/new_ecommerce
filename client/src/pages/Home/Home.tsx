import React, { useEffect, useState } from "react";
import { Header, Hero, Category, Blog, Footer } from "../../components";
import images from "../../images";
import { linksData } from "../../utils/data";
import { useAppSelector } from "../../app/hooks";
import "./home.css";

export const Home = () => {
	const { data } = useAppSelector((state) => state.cart);

	console.log(data.length);
	return (
		<div>
			<div className='app__header'>
				<Header
					logo={images.logoLight}
					cartItems={data.length}
					links={linksData}
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
			<Footer links={linksData} image={images.footerLogo}></Footer>
		</div>
	);
};
