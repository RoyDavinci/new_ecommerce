import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import LoadingComponent from "./components/Loading";
import { routes } from "./auth/route";
import { AdminLayout } from "./components";
const queryClient = new QueryClient();

function App() {
	// const [userState, setUserState] = useState(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [authStage, setAuthStage] = useState<string>("Checking local storage");

	const user = localStorage.getItem("user");

	interface childrenInterface {
		children?: React.ReactNode;
	}

	useEffect(() => {
		setTimeout(() => {
			checkLocalStorage();
		}, 1000);
	}, []);

	const checkLocalStorage = async () => {
		setAuthStage("Checking credentials");
		const fire_token = localStorage.getItem("user");
		if (!fire_token) {
			setAuthStage("No credentials found");
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		} else {
			// validate token
			setAuthStage("Credentials found");
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
	};

	if (loading) {
		return <LoadingComponent>{authStage}</LoadingComponent>;
	}

	return (
		<div className='App'>
			<Routes>
				{routes.map((route, index) => {
					if (route.auth) {
						<Route
							key={index}
							path={route.path}
							element={<route.component></route.component>}
						></Route>;
					}
					return (
						<Route
							key={index}
							path={route.path}
							element={<route.component></route.component>}
						></Route>
					);
				})}
			</Routes>
		</div>
	);
}

export default App;
