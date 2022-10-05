import React from "react";
import "./App.css";
import { Header } from "./components";
import { Hero } from "./components/Hero/Hero";
import images from "./images/index";

const data = ["Home", "About", "Products", "Contact"];

function App() {
	return (
		<div className='App'>
			<Header
				logo={images.logoLight}
				cartItems={1}
				user={false}
				links={data}
				userImg={images.userImg}
			></Header>
			<Hero></Hero>
		</div>
	);
}

export default App;
