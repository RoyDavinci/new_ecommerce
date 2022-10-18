import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, About, Categories } from "./pages";

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/about' element={<About />}></Route>
				<Route path='/categories' element={<Categories />}></Route>
			</Routes>
		</div>
	);
}

export default App;
