export default interface IRoute {
	name: String;
	path: string;
	props?: any;
	component: any;
	auth: boolean;
}
