export interface orderItemInterface {
	id: number;
	reference: string;
	new: boolean;
	payment: string;
	status: "paid" | "pending" | "failed";
	name: string;
	email: string;
	Address: string;
	price: number;
}
