export interface ProductInterface {
	name: string;
	images: string[];
	quantity: number;
	price: number;
	make: string;
	model: string;
	year: string;
	description?: string;
	id: number;
	adminId: number | null;
	sellerId: number | null;
	createdAt: Date;
}
export interface AddProductInterface {
	name: string;
	product: string | Blob;
	quantity: number;
	price: number;
	make: string;
	model: string;
	year: string;
	description?: string;
	id: number;
	categoryName: string;
}

export interface EditProductInterface {
	name: string;
	images: Array<string>;
	quantity: number;
	price: number;
	make: string;
	model: string;
	year: string;
	description?: string;
	id: number;
	categoryName: string;
}
export interface productPayloadResponse {
	name: string;
	sellerId: number | null;
	adminId: number | null;
	quantity: number;
	price: string;
	categoryName: string;
	model: string;
	make: string;
	year: string;
	description: string | null;
	createdAt: string;
	updatedAt: string | null;
	product: string[] | string | File;
}

export interface AllProductInterface {
	message: string;
	data: ProductInterface[];
	error: {};
	status: "idle" | "loading" | "failed" | "successful";
}
export interface productErrorResponse {
	data?: [];
	message?: string;
}

export interface productAddInterface {
	message: string;
	data: productPayloadResponse;
	productStatus: "idle" | "loading" | "failed" | "successful";
	error: {};
	productError: unknown;
}
