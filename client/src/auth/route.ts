import IRoute from "../interfaces/route";
import { Categories } from "../pages";
import { SignUp } from "../pages";
import { Home } from "../pages";
import { Login } from "../pages";

const authRoutes: IRoute[] = [
	{
		path: "/login",
		component: Login,
		name: "login",
		auth: false,
	},
	{
		path: "/register",
		component: SignUp,
		name: "Register",
		auth: false,
	},
];

const mainRoutes: IRoute[] = [
	{
		path: "/categories",
		component: Categories,
		name: "categories",
		auth: true,
	},
];

const authRoute: IRoute[] = [
	{
		path: "/",
		component: Home,
		name: "home",
		auth: false,
	},
];

const routes: IRoute[] = [...authRoutes, ...authRoute, ...mainRoutes];

export default routes;
