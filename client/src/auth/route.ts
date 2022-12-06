import { Hero } from "../components/HeroNew/Hero";
import IRoute from "../interfaces/route";
import { About, Cart, Categories } from "../pages";
import { SignUp } from "../pages";
import { Home } from "../pages";
import { Login } from "../pages";
import { Admin } from "../pages/Admin/Admin";
import { Cataglog } from "../pages/Catalogue/Cataglg";
import { Checkout } from "../pages/Checkout/Checkout";
import { Orders } from "../pages/Orders/Orders";
import { Payment } from "../pages/Payment/Payment";
import { Products } from "../pages/Products/Products";
import { SingleCategory } from "../pages/SingleCategory/SingleCategory";
import { SingleProduct } from "../pages/SingleProduct/SingleProduct";
import { Transaction } from "../pages/Transaction/Transaction";

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
		auth: false,
	},
	{
		path: "/categories/:name",
		component: SingleCategory,
		name: "singleCategory",
		auth: false,
	},
	{
		path: "/about",
		component: About,
		name: "about",
		auth: false,
	},
	{
		path: "/",
		component: Home,
		name: "home",
		auth: false,
	},
	{
		path: "/cart",
		component: Cart,
		name: "cart",
		auth: false,
	},
	{
		path: "/products",
		component: Products,
		name: "products",
		auth: false,
	},
	{
		path: "/products/:id",
		component: SingleProduct,
		auth: false,
		name: "single-product",
	},
	{
		path: "/hero",
		component: Hero,
		auth: false,
		name: "single-product",
	},
	{
		path: "/checkout",
		component: Checkout,
		auth: false,
		name: "checkout",
	},
	{
		path: "/payment",
		component: Payment,
		auth: false,
		name: "payment",
	},
	{
		path: "/transaction",
		component: Transaction,
		auth: false,
		name: "transaction",
	},
];

const authRoute: IRoute[] = [
	{
		path: "/admin",
		component: Admin,
		name: "admin",
		auth: true,
	},
	{
		path: "/orders",
		component: Orders,
		name: "orders",
		auth: true,
	},
	{
		path: "/products",
		component: Cataglog,
		name: "products",
		auth: true,
	},
];

const routes: IRoute[] = [...authRoutes, ...mainRoutes, ...authRoute];

export { routes };
