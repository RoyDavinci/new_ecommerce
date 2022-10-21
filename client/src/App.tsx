import React, { useEffect, useState } from "react";
import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Home, About, Categories, Login, SignUp } from "./pages";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAuth } from "./utils/useAuth";
const queryClient = new QueryClient();

function App() {
	const [userState, setUserState] = useState(false);

	const user = localStorage.getItem("user");

	interface childrenInterface {
		children?: React.ReactNode;
	}

	const PrivateOutlet: React.FC<childrenInterface> = ({ children }) => {
		const user = useAuth(); //Auth context
		return user ? ( //Check if logged in
			<>
				{children}
				<Outlet />
			</>
		) : (
			<Navigate to='/login' replace /> //Go back to login if not logged in
		);
	};

	const PublicOutlet: React.FC<childrenInterface> = ({ children }) => {
		const user = useAuth(); //Auth context
		return !user?.id ? ( //Check if logged in
			<>
				{children}
				<Outlet />
			</>
		) : (
			<Navigate to='/' replace /> //Go to protected route if logged in
		);
	};

	useEffect(() => {}, [user]);

	return (
		<div className='App'>
			<QueryClientProvider client={queryClient} contextSharing={true}>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/' element={<PrivateOutlet />}>
						<Route path='/about' element={<About />}></Route>
						<Route path='/categories' element={<Categories />}></Route>
					</Route>

					<Route path='/' element={<PublicOutlet />}>
						<Route path='/login' element={<Login />} />
						<Route path='/sign-up' element={<SignUp />}></Route>
					</Route>
				</Routes>
			</QueryClientProvider>
		</div>
	);
}

export default App;
