import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, About } from "./pages";

const data = ["Home", "About", "Products", "Contact"];

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/about' element={<About />}></Route>
			</Routes>
		</div>
	);
}

export default App;
