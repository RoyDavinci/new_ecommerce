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

export interface orderDetail {
	id: number;
	name: string;
}

export type shippers = {
	id: number;
	name: string;
	places: string[];
	contact: string;
	lagos: boolean;
	price: string;
	createdAt: Date;
	updatedAt: Date | null;
};

export interface orders {
	id: number;
	order_code: string;
	product_detail: orderDetail[];
	name: string;
	email: string;
	phone: string;
	total_amount: string;
	userId: number | null;
	guestId: number | null;
	status: "pending" | "failed" | "successful" | "processing";
	payment_type: string;
	quantity: number;
	address: string;
	delivery_type: string;
	createdAt: Date;
	updatedAt: Date | null;
}

export interface ordersGotten {
	message?: string;
	orders: orders[];
}

export interface orderInterface {
	message: string;
	data: ordersGotten;
	error: unknown;
	status: "idle" | "loading" | "failed" | "successful";
}
