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

export const productsData: ProductInterface[] = [
	{
		id: 1,
		name: "iPhone 9",
		description: "An apple mobile which is nothing like apple",
		price: 549,
		quantity: 94,
		make: "Apple",
		model: "smartphones",
		year: "2022",
		images: [
			"https://dummyjson.com/image/i/products/1/1.jpg",
			"https://dummyjson.com/image/i/products/1/2.jpg",
			"https://dummyjson.com/image/i/products/1/3.jpg",
			"https://dummyjson.com/image/i/products/1/4.jpg",
			"https://dummyjson.com/image/i/products/1/thumbnail.jpg",
		],
	},
	{
		id: 2,
		name: "iPhone X",
		description:
			"SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
		price: 899,
		quantity: 34,
		make: "Apple",
		model: "smartphones",
		year: "2022",
		images: [
			"https://dummyjson.com/image/i/products/2/1.jpg",
			"https://dummyjson.com/image/i/products/2/2.jpg",
			"https://dummyjson.com/image/i/products/2/3.jpg",
			"https://dummyjson.com/image/i/products/2/thumbnail.jpg",
		],
	},
	{
		id: 3,
		name: "Samsung Universe 9",
		description:
			"Samsung's new variant which goes beyond Galaxy to the Universe",
		price: 1249,
		year: "2022",
		quantity: 36,
		make: "Samsung",
		model: "smartphones",
		images: ["https://dummyjson.com/image/i/products/3/1.jpg"],
	},
	{
		id: 4,
		name: "OPPOF19",
		description: "OPPO F19 is officially announced on April 2021.",
		year: "2022",
		price: 599,
		quantity: 123,
		make: "OPPO",
		model: "smartphones",
		images: [
			"https://dummyjson.com/image/i/products/4/1.jpg",
			"https://dummyjson.com/image/i/products/4/2.jpg",
			"https://dummyjson.com/image/i/products/4/3.jpg",
			"https://dummyjson.com/image/i/products/4/4.jpg",
			"https://dummyjson.com/image/i/products/4/thumbnail.jpg",
		],
	},
	{
		id: 5,
		name: "Huawei P30",
		description:
			"Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
		price: 499,
		year: "2022",
		quantity: 32,
		make: "Huawei",
		model: "smartphones",
		images: [
			"https://dummyjson.com/image/i/products/5/1.jpg",
			"https://dummyjson.com/image/i/products/5/2.jpg",
			"https://dummyjson.com/image/i/products/5/3.jpg",
		],
	},
	{
		id: 6,
		name: "MacBook Pro",
		description:
			"MacBook Pro 2021 with mini-LED display may launch between September, November",
		price: 1749,
		year: "2022",
		quantity: 83,
		make: "APPle",
		model: "laptops",
		images: [
			"https://dummyjson.com/image/i/products/6/1.png",
			"https://dummyjson.com/image/i/products/6/2.jpg",
			"https://dummyjson.com/image/i/products/6/3.png",
			"https://dummyjson.com/image/i/products/6/4.jpg",
		],
	},
	{
		id: 7,
		name: "Samsung Galaxy Book",
		description:
			"Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
		price: 1499,
		year: "2022",
		quantity: 50,
		make: "Samsung",
		model: "laptops",
		images: [
			"https://dummyjson.com/image/i/products/7/1.jpg",
			"https://dummyjson.com/image/i/products/7/2.jpg",
			"https://dummyjson.com/image/i/products/7/3.jpg",
			"https://dummyjson.com/image/i/products/7/thumbnail.jpg",
		],
	},
	{
		id: 8,
		name: "Microsoft Surface Laptop 4",
		description:
			"Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
		price: 1499,
		year: "2022",
		quantity: 68,
		make: "Microsoft Surface",
		model: "laptops",
		images: [
			"https://dummyjson.com/image/i/products/8/1.jpg",
			"https://dummyjson.com/image/i/products/8/2.jpg",
			"https://dummyjson.com/image/i/products/8/3.jpg",
			"https://dummyjson.com/image/i/products/8/4.jpg",
			"https://dummyjson.com/image/i/products/8/thumbnail.jpg",
		],
	},
	{
		id: 9,
		name: "Infinix INBOOK",
		description:
			"Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
		price: 1099,
		year: "2022",
		quantity: 96,
		make: "Infinix",
		model: "laptops",
		images: [
			"https://dummyjson.com/image/i/products/9/1.jpg",
			"https://dummyjson.com/image/i/products/9/2.png",
			"https://dummyjson.com/image/i/products/9/3.png",
			"https://dummyjson.com/image/i/products/9/4.jpg",
			"https://dummyjson.com/image/i/products/9/thumbnail.jpg",
		],
	},
	{
		id: 10,
		name: "HP Pavilion 15-DK1056WM",
		description:
			"HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
		price: 1099,
		quantity: 89,
		make: "HP Pavilion",
		model: "laptops",
		year: "2022",
		images: [
			"https://dummyjson.com/image/i/products/10/1.jpg",
			"https://dummyjson.com/image/i/products/10/2.jpg",
			"https://dummyjson.com/image/i/products/10/3.jpg",
			"https://dummyjson.com/image/i/products/10/thumbnail.jpeg",
		],
	},
	{
		id: 11,
		name: "perfume Oil",
		description:
			"Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
		price: 13,
		year: "2022",
		quantity: 65,
		make: "Impression of Acqua Di Gio",
		model: "fragrances",
		images: [
			"https://dummyjson.com/image/i/products/11/1.jpg",
			"https://dummyjson.com/image/i/products/11/2.jpg",
			"https://dummyjson.com/image/i/products/11/3.jpg",
			"https://dummyjson.com/image/i/products/11/thumbnail.jpg",
		],
	},
	{
		id: 12,
		name: "Brown Perfume",
		description: "Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
		price: 40,
		year: "2022",
		quantity: 52,
		make: "Royal_Mirage",
		model: "fragrances",
		images: [
			"https://dummyjson.com/image/i/products/12/1.jpg",
			"https://dummyjson.com/image/i/products/12/2.jpg",
			"https://dummyjson.com/image/i/products/12/3.png",
			"https://dummyjson.com/image/i/products/12/4.jpg",
			"https://dummyjson.com/image/i/products/12/thumbnail.jpg",
		],
	},
	{
		id: 13,
		name: "Fog Scent Xpressio Perfume",
		description:
			"Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
		price: 13,
		year: "2022",
		quantity: 61,
		make: "Fog Scent Xpressio",
		model: "fragrances",
		images: [
			"https://dummyjson.com/image/i/products/13/1.jpg",
			"https://dummyjson.com/image/i/products/13/2.png",
			"https://dummyjson.com/image/i/products/13/3.jpg",
			"https://dummyjson.com/image/i/products/13/4.jpg",
			"https://dummyjson.com/image/i/products/13/thumbnail.webp",
		],
	},
	{
		id: 14,
		name: "Non-Alcoholic Concentrated Perfume Oil",
		description:
			"Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil",
		price: 120,
		year: "2022",
		quantity: 114,
		make: "Al Munakh",
		model: "fragrances",
		images: [
			"https://dummyjson.com/image/i/products/14/1.jpg",
			"https://dummyjson.com/image/i/products/14/2.jpg",
			"https://dummyjson.com/image/i/products/14/3.jpg",
			"https://dummyjson.com/image/i/products/14/thumbnail.jpg",
		],
	},
	{
		id: 15,
		name: "Eau De Perfume Spray",
		description:
			"Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality",
		price: 30,
		year: "2022",
		quantity: 105,
		make: "Lord - Al-Rehab",
		model: "fragrances",
		images: [
			"https://dummyjson.com/image/i/products/15/1.jpg",
			"https://dummyjson.com/image/i/products/15/2.jpg",
			"https://dummyjson.com/image/i/products/15/3.jpg",
			"https://dummyjson.com/image/i/products/15/4.jpg",
			"https://dummyjson.com/image/i/products/15/thumbnail.jpg",
		],
	},
	{
		id: 16,
		name: "Hyaluronic Acid Serum",
		description:
			"L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
		price: 19,
		year: "2022",
		quantity: 110,
		make: "L'Oreal Paris",
		model: "skincare",
		images: [
			"https://dummyjson.com/image/i/products/16/1.png",
			"https://dummyjson.com/image/i/products/16/2.webp",
			"https://dummyjson.com/image/i/products/16/3.jpg",
			"https://dummyjson.com/image/i/products/16/4.jpg",
			"https://dummyjson.com/image/i/products/16/thumbnail.jpg",
		],
	},
	{
		id: 17,
		name: "Tree Oil 30ml",
		description:
			"Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
		price: 12,
		year: "2022",
		quantity: 78,
		make: "Hemani Tea",
		model: "skincare",
		images: [
			"https://dummyjson.com/image/i/products/17/1.jpg",
			"https://dummyjson.com/image/i/products/17/2.jpg",
			"https://dummyjson.com/image/i/products/17/3.jpg",
			"https://dummyjson.com/image/i/products/17/thumbnail.jpg",
		],
	},
	{
		id: 18,
		name: "Oil Free Moisturizer 100ml",
		description:
			"Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.",
		price: 40,
		year: "2022",
		quantity: 88,
		make: "Dermive",
		model: "skincare",
		images: [
			"https://dummyjson.com/image/i/products/18/1.jpg",
			"https://dummyjson.com/image/i/products/18/2.jpg",
			"https://dummyjson.com/image/i/products/18/3.jpg",
			"https://dummyjson.com/image/i/products/18/4.jpg",
			"https://dummyjson.com/image/i/products/18/thumbnail.jpg",
		],
	},
	{
		id: 19,
		name: "Skin Beauty Serum.",
		description:
			"Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m",
		price: 46,
		year: "2022",
		quantity: 54,
		make: "ROREC White Rice",
		model: "skincare",
		images: [
			"https://dummyjson.com/image/i/products/19/1.jpg",
			"https://dummyjson.com/image/i/products/19/2.jpg",
			"https://dummyjson.com/image/i/products/19/3.png",
			"https://dummyjson.com/image/i/products/19/thumbnail.jpg",
		],
	},
	{
		id: 20,
		name: "Freckle Treatment Cream- 15gm",
		description:
			"Fair & Clear is Pakistan's only pure Freckle cream which helpsfade Freckles, Darkspots and pigments. Mercury level is 0%, so there are no side effects.",
		price: 70,
		year: "2022",
		quantity: 140,
		make: "Fair & Clear",
		model: "skincare",
		images: [
			"https://dummyjson.com/image/i/products/20/1.jpg",
			"https://dummyjson.com/image/i/products/20/2.jpg",
			"https://dummyjson.com/image/i/products/20/3.jpg",
			"https://dummyjson.com/image/i/products/20/4.jpg",
			"https://dummyjson.com/image/i/products/20/thumbnail.jpg",
		],
	},
	{
		id: 21,
		name: "- Daal Masoor 500 grams",
		description: "Fine quality Branded Product Keep in a cool and dry place",
		price: 20,
		year: "2022",
		quantity: 133,
		make: "Saaf & Khaas",
		model: "groceries",
		images: [
			"https://dummyjson.com/image/i/products/21/1.png",
			"https://dummyjson.com/image/i/products/21/2.jpg",
			"https://dummyjson.com/image/i/products/21/3.jpg",
		],
	},
	{
		id: 22,
		name: "Elbow Macaroni - 400 gm",
		description: "Product details of Bake Parlor Big Elbow Macaroni - 400 gm",
		price: 14,
		year: "2022",
		quantity: 146,
		make: "Bake Parlor Big",
		model: "groceries",
		images: [
			"https://dummyjson.com/image/i/products/22/1.jpg",
			"https://dummyjson.com/image/i/products/22/2.jpg",
			"https://dummyjson.com/image/i/products/22/3.jpg",
		],
	},
	{
		id: 23,
		name: "Orange Essence Food Flavou",
		description:
			"Specifications of Orange Essence Food Flavour For Cakes and Baking Food Item",
		price: 14,
		year: "2022",
		quantity: 26,
		make: "Baking Food Items",
		model: "groceries",
		images: [
			"https://dummyjson.com/image/i/products/23/1.jpg",
			"https://dummyjson.com/image/i/products/23/2.jpg",
			"https://dummyjson.com/image/i/products/23/3.jpg",
			"https://dummyjson.com/image/i/products/23/4.jpg",
			"https://dummyjson.com/image/i/products/23/thumbnail.jpg",
		],
	},
	{
		id: 24,
		name: "cereals muesli fruit nuts",
		description:
			"original fauji cereal muesli 250gm box pack original fauji cereals muesli fruit nuts flakes breakfast cereal break fast faujicereals cerels cerel foji fouji",
		price: 46,
		year: "2022",
		quantity: 113,
		make: "fauji",
		model: "groceries",
		images: [
			"https://dummyjson.com/image/i/products/24/1.jpg",
			"https://dummyjson.com/image/i/products/24/2.jpg",
			"https://dummyjson.com/image/i/products/24/3.jpg",
			"https://dummyjson.com/image/i/products/24/4.jpg",
			"https://dummyjson.com/image/i/products/24/thumbnail.jpg",
		],
	},
	{
		id: 25,
		name: "Gulab Powder 50 Gram",
		description: "Dry Rose Flower Powder Gulab Powder 50 Gram • Treats Wounds",
		price: 70,
		year: "2022",
		quantity: 47,
		make: "Dry Rose",
		model: "groceries",
		images: [
			"https://dummyjson.com/image/i/products/25/1.png",
			"https://dummyjson.com/image/i/products/25/2.jpg",
			"https://dummyjson.com/image/i/products/25/3.png",
			"https://dummyjson.com/image/i/products/25/4.jpg",
			"https://dummyjson.com/image/i/products/25/thumbnail.jpg",
		],
	},
	{
		id: 26,
		name: "Plant Hanger For Home",
		description:
			"Boho Decor Plant Hanger For Home Wall Decoration Macrame Wall Hanging Shelf",
		price: 41,
		year: "2022",
		quantity: 131,
		make: "Boho Decor",
		model: "home-decoration",
		images: [
			"https://dummyjson.com/image/i/products/26/1.jpg",
			"https://dummyjson.com/image/i/products/26/2.jpg",
			"https://dummyjson.com/image/i/products/26/3.jpg",
			"https://dummyjson.com/image/i/products/26/4.jpg",
			"https://dummyjson.com/image/i/products/26/5.jpg",
			"https://dummyjson.com/image/i/products/26/thumbnail.jpg",
		],
	},
	{
		id: 27,
		name: "Flying Wooden Bird",
		description:
			"Package Include 6 Birds with Adhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF, Laminated 3.5mm",
		price: 51,
		year: "2022",
		quantity: 17,
		make: "Flying Wooden",
		model: "home-decoration",
		images: [
			"https://dummyjson.com/image/i/products/27/1.jpg",
			"https://dummyjson.com/image/i/products/27/2.jpg",
			"https://dummyjson.com/image/i/products/27/3.jpg",
			"https://dummyjson.com/image/i/products/27/4.jpg",
			"https://dummyjson.com/image/i/products/27/thumbnail.webp",
		],
	},
	{
		id: 28,
		name: "3D Embellishment Art Lamp",
		description:
			"3D led lamp sticker Wall sticker 3d wall art light on/off button  cell operated (included)",
		price: 20,
		year: "2022",
		quantity: 54,
		make: "LED Lights",
		model: "home-decoration",
		images: [
			"https://dummyjson.com/image/i/products/28/1.jpg",
			"https://dummyjson.com/image/i/products/28/2.jpg",
			"https://dummyjson.com/image/i/products/28/3.png",
			"https://dummyjson.com/image/i/products/28/4.jpg",
			"https://dummyjson.com/image/i/products/28/thumbnail.jpg",
		],
	},
	{
		id: 29,
		name: "Handcraft Chinese style",
		description:
			"Handcraft Chinese style art luxury palace hotel villa mansion home decor ceramic vase with brass fruit plate",
		price: 60,
		year: "2022",
		quantity: 7,
		make: "luxury palace",
		model: "home-decoration",
		images: [
			"https://dummyjson.com/image/i/products/29/1.jpg",
			"https://dummyjson.com/image/i/products/29/2.jpg",
			"https://dummyjson.com/image/i/products/29/3.webp",
			"https://dummyjson.com/image/i/products/29/4.webp",
			"https://dummyjson.com/image/i/products/29/thumbnail.webp",
		],
	},
	{
		id: 30,
		name: "Key Holder",
		description:
			"Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
		price: 30,
		year: "2022",
		quantity: 54,
		make: "Golden",
		model: "home-decoration",
		images: [
			"https://dummyjson.com/image/i/products/30/1.jpg",
			"https://dummyjson.com/image/i/products/30/2.jpg",
			"https://dummyjson.com/image/i/products/30/3.jpg",
			"https://dummyjson.com/image/i/products/30/thumbnail.jpg",
		],
	},
];
