import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

export interface IAuthRouteProps {
	children?: React.ReactNode;
}

export const AuthRoute: React.FunctionComponent<IAuthRouteProps> = ({
	children,
}) => {
	const user = localStorage.getItem("user");

	return user ? <Outlet /> : <Navigate to='/login' />;
};

export default AuthRoute;
