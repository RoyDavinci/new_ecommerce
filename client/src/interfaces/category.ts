export interface categoryPayloadResponse {
	id: number;
	name: string;
	images: string;
	description: string;
	createdAt: string;
	updatedAt: string;
}

export interface CategoryState {
	message: string;
	categoryData: categoryPayloadResponse[];
	status: "idle" | "loading" | "failed" | "successful";
	error: {};
}

export interface SingleCategoryInterface {
	id?: number;
	adminId?: number;
	createdAt?: string;
	description?: string;
	make?: string;
	model?: string;
	price?: string;
	year?: string;
	sellerId?: number;
	updatedAt?: string;
	images?: string[];
	quantity: number;
	productRatings?: [];
	name: string;
}
