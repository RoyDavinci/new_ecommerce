import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, About, Categories, Login, SignUp } from "./pages";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
	return (
		<div className='App'>
			<QueryClientProvider client={queryClient} contextSharing={true}>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/about' element={<About />}></Route>
					<Route path='/categories' element={<Categories />}></Route>
					<Route path='/login' element={<Login />}></Route>
					<Route path='/sign-up' element={<SignUp />}></Route>
				</Routes>
			</QueryClientProvider>
		</div>
	);
}

export default App;
