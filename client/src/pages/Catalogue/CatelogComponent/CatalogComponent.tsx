import React, {
	BaseSyntheticEvent,
	useCallback,
	useEffect,
	useState,
} from "react";
import "./catalogComponent.css";
import {
	productsData,
	ProductInterface,
	AddProductInterface,
	EditProductInterface,
} from "../../../interfaces/product";
import "./catalogComponent.css";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { changeState } from "../../../features/state/state";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { toast } from "react-toastify";
import {
	deleteProducts,
	getProducts,
	addProduct,
	getSingleProduct,
	editProducts,
} from "../../../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../features/categories/cateorySlice";
import { categoryPayloadResponse } from "../../../interfaces/category";
import { ErrorResponse } from "../../../interfaces/error";

export const CatalogComponent = () => {
	const [products, setProducts] = useState<ProductInterface[]>([
		{
			id: 0,
			name: "",
			images: ["image"],
			quantity: 1,
			price: 0,
			make: "",
			model: "",
			year: "",
			description: "",
		},
	]);
	const [showAddForm, setShowAddForm] = useState<boolean>(false);
	const [previewImage, setPreviewImage] = useState<
		string | Blob | ArrayBuffer | null
	>(null);
	const [errorMessage, setErrorMessage] = useState("");
	const [initial, setInitial] = useState<AddProductInterface>({
		name: "",
		description: "",
		product: "",
		make: "",
		model: "",
		price: 0,
		quantity: 0,
		id: 0,
		year: "",
		categoryName: "",
	});
	const [editId, setEditId] = useState<number>(0);
	const [value, setValue] = useState("");
	const [categories, setCategories] = useState<categoryPayloadResponse[]>([]);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { data, status } = useAppSelector((state) => state.allProducts);

	const { categoryData } = useAppSelector((state) => state.category);
	const { productError, productStatus } = useAppSelector(
		(state) => state.products
	);

	const onInputChange = (
		e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setInitial({ ...initial, [name]: value });
		const { files } = e.target;

		if (files) {
			setInitial({ ...initial, product: files[0] });
			const fileName = files[0];
			const reader = new FileReader();

			reader.onloadend = (e) => {
				if (fileName.size / 1024 / 1024 > 1) {
					toast.info("File is greater than 1MB");
					return;
				}

				if (
					fileName.type === "image/png" ||
					fileName.type === "image/jpg" ||
					fileName.type === "image/jpeg"
				) {
					e.target && setPreviewImage(e.target.result);
				} else {
					toast.error(".png, .jpg and .jpeg are the only valid file format");
				}
			};
			reader.readAsDataURL(fileName);
		}
	};

	const openAddProduct = () => {
		setShowAddForm(true);
		dispatch(changeState());
	};

	const closeAddForm = () => {
		setShowAddForm(false);
		setEditId(0);
		dispatch(changeState());
	};

	const form = new FormData();

	const addNewProduct = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		form.append("name", initial.name);
		initial.description && form.append("description", initial.description);
		form.append("make", initial.make);
		form.append("model", initial.model);
		form.append("year", initial.year);
		form.append("price", initial.price.toString());
		form.append("quantity", initial.quantity.toString());
		typeof initial.product === "object" &&
			form.append("product", initial.product);
		form.append("categoryName", initial.categoryName);

		if (!editId) {
			dispatch(addProduct(form));
			if (productStatus === "failed") {
				const errors = productError as unknown as ErrorResponse;
				if (errors.message?.includes("jwt")) {
					dispatch(changeState());
					navigate("/login");
				}
			}
			if (productStatus === "successful") {
				window.location.reload();
			}
		} else {
			form.forEach((item) => {
				console.log(item);
			});
			// const data = await editProducts(editId, form);
			// console.log(data);
			// if (typeof data.message === "string" && data.message.includes("jwt")) {
			// 	setShowAddForm(false);
			// 	setEditId(0);
			// 	localStorage.removeItem("user");
			// 	localStorage.removeItem("token");
			// 	dispatch(changeState());
			// 	navigate("/login");
			// } else {
			// 	console.log("No");
			// }
		}
	};

	const editProduct = async (id: number) => {
		const item = await getSingleProduct(id);
		if (typeof item.message === "string" && item.message.includes("jwt")) {
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			navigate("/login");
		}
		const data = item.message as unknown as EditProductInterface;
		setEditId(id);
		setInitial({
			product: data.images[0],
			quantity: data.quantity,
			id: data.id,
			categoryName: data.categoryName,
			description: data.description,
			model: data.model,
			name: data.name,
			make: data.make,
			price: data.price,
			year: data.year,
		});
		setShowAddForm(true);
		setPreviewImage(data.images[0]);
		dispatch(changeState());
	};

	const deleteProduct = async (id: number) => {
		const data = await deleteProducts(id);
		if (data.message.includes("jwt")) {
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			navigate("/login");
		}
		toast.success(data.message, {
			position: toast.POSITION.TOP_RIGHT,
		});
		window.location.reload();
	};

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 90 },
		{
			field: "name",
			headerName: "Name",
			width: 150,
			editable: true,
		},
		{
			field: "price",
			headerName: "Price",
			width: 150,
			editable: true,
		},
		{
			field: "make",
			headerName: "Make",
			width: 110,
			editable: true,
		},
		{
			field: "year",
			headerName: "Year",
			width: 110,
			editable: true,
		},
		{
			field: "model",
			headerName: "Model",
			width: 110,
			editable: true,
		},
		{
			field: "quantity",
			headerName: "Quantity",
			width: 110,
			editable: true,
		},
		{
			field: "description",
			headerName: "Description",
			width: 200,
			editable: true,
		},
		{
			field: "image",
			headerName: "Image",
			width: 150,
			editable: false,
			renderCell: (params) => {
				return (
					<>
						<img src={params.row.images[0]} alt={params.row.name} width='40' />
					</>
				);
			},
		},
		{
			field: "edit",
			headerName: "Edit",
			width: 70,
			renderCell: (param) => {
				return (
					<>
						<i
							className='fa-solid fa-pen-to-square'
							onClick={() => editProduct(param.row.id)}
						></i>
					</>
				);
			},
		},
		{
			field: "delete",
			headerName: "Delete",
			width: 70,
			renderCell: (param) => {
				return (
					<>
						<i
							className='fa-solid fa-trash'
							onClick={() => deleteProduct(param.row.id)}
						></i>
					</>
				);
			},
		},
	];

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setValue(value);
	};

	const checkSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newValue = value.toLowerCase();
		const filtered = products.filter((item) =>
			item.name.toLowerCase().includes(newValue)
		);
		setProducts(filtered);
		setValue("");
	};

	const setAllProducts = () => {
		setProducts(productsData);
	};

	const setData = useCallback(() => {
		if (status === "failed") {
			setErrorMessage("An Error Occured");
		}
		if (status === "idle") {
			dispatch(getProducts());
			dispatch(getCategories());
		}
		if (status === "successful") {
			setProducts(data);
			setCategories(categoryData);
		}
	}, [status, data, dispatch, categoryData]);

	useEffect(() => {
		setData();
		return () => console.log("cleanup useEffect");
	}, [setData]);

	return (
		<main
			className='catalog__componentContainer p-6 relative'
			style={{ height: "100vh" }}
		>
			{status === "idle" && <h1>Loading</h1>}
			{errorMessage && <h1>{errorMessage}</h1>}
			<section className='catalog__sectionCenter'>
				<article className='flex justify-between items-center'>
					<h1>Products</h1>
					<button
						className='bg-[#4285F4] text-white p-2 rounded-md'
						onClick={openAddProduct}
					>
						Add New Products
					</button>
				</article>
				<article className='catalog__SectionFilter__component flex justify-between my-4'>
					<h4 className='cursor-pointer' onClick={setAllProducts}>
						All Products
					</h4>
					<form action='' className='p-2 ' onSubmit={checkSubmit}>
						<i className='fa-solid fa-magnifying-glass text-sm'></i>
						<input
							type='text'
							placeholder='Search'
							value={value}
							onChange={onChange}
						/>
					</form>
				</article>
			</section>
			<Box sx={{ height: "80vh", width: "100%" }}>
				{errorMessage && <h1>{errorMessage}</h1>}
				<DataGrid
					rows={products}
					columns={columns}
					pageSize={10}
					rowsPerPageOptions={[10]}
					checkboxSelection
					disableSelectionOnClick
					experimentalFeatures={{ newEditingApi: true }}
				/>
			</Box>
			<form
				action=''
				className={
					showAddForm
						? "addNewProductForm absolute z-20	top-10 block"
						: "addNewProductForm absolute z-20	top-10 hidden"
				}
				onSubmit={addNewProduct}
			>
				<i
					className='fa-solid fa-xmark absolute right-7 text-xl'
					onClick={closeAddForm}
				></i>
				<h1>Add New Product</h1>
				<div className='addNewPRoductForm__inputContainer'>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						id='name'
						placeholder='name'
						value={initial.name}
						onChange={onInputChange}
						name='name'
					/>
				</div>
				<div className='addNewPRoductForm__inputContainer'>
					<label htmlFor='make'>Make</label>
					<input
						type='text'
						id='make'
						placeholder='make'
						value={initial.make}
						onChange={onInputChange}
						name='make'
					/>
				</div>
				<div className='addNewPRoductForm__inputContainer'>
					<label htmlFor='year'>Year</label>
					<input
						type='text'
						id='year'
						placeholder='year'
						value={initial.year}
						onChange={onInputChange}
						name='year'
					/>
				</div>
				<div className='addNewPRoductForm__inputContainer'>
					<label htmlFor='model'>Model</label>
					<input
						type='text'
						id='model'
						placeholder='model'
						value={initial.model}
						onChange={onInputChange}
						name='model'
					/>
				</div>
				<div className='addNewPRoductForm__inputContainer'>
					<label htmlFor='model'>Category</label>
					<select
						name='categoryName'
						id='category'
						value={initial.categoryName}
						onChange={onInputChange}
					>
						{categories.map((item) => {
							return (
								<option value={item.name} key={item.id}>
									{item.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className='addNewPRoductForm__inputContainer'>
					<label htmlFor='price'>Price</label>
					<input
						type='number'
						placeholder='name'
						id='price'
						value={initial.price}
						onChange={onInputChange}
						name='price'
					/>
				</div>
				<div className='addNewPRoductForm__inputContainer'>
					<label htmlFor='quantity'>Quantity</label>
					<input
						type='number'
						id='quantity'
						placeholder='quantity'
						value={initial.quantity}
						onChange={onInputChange}
						name='quantity'
					/>
				</div>
				<div className='addNewPRoductForm__inputContainer'>
					<label htmlFor='description'>Description</label>
					<input
						type='text'
						placeholder='description'
						id='description'
						value={initial.description}
						onChange={onInputChange}
						name='description'
					/>
				</div>
				<div
					className='addNewPRoductForm__inputContainer'
					style={{
						height: "180px",
						backgroundImage: `url(${previewImage})`,
						backgroundPosition: "center",
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						display: "flex",
						alignItems: "center",
						textAlign: "center",
						justifyContent: "center",
						border: "0.5px solid #ccc",
						borderRadius: "5px",
					}}
				>
					<label htmlFor='image'>
						Browse
						<input
							hidden
							id='image'
							name='image'
							multiple
							type='file'
							onChange={onInputChange}
						/>
					</label>
				</div>
				<button className='bg-[#4285F4] text-white p-3 rounded-md'>
					Add Product
				</button>
			</form>
		</main>
	);
};
