import React, { useEffect, useState } from "react";
import "./orderComponent.css";
import { orders } from "../../../interfaces/order";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ErrorResponse } from "../../../interfaces/error";
import { clearStorage } from "../../../utils/localstorage";
import { getOrders } from "../../../features/orders/orderSlice";
import { useNavigate } from "react-router-dom";

export const OrderComponent = () => {
	const [orderState, setOrderState] = useState("All");
	const [orders, setOrders] = useState<orders[]>([]);
	const [newOrders, setNewORders] = useState<orders[]>([]);

	const [errorMessage, setErrorMessage] = useState<string>("");
	// const [filteredData, setFilteredData] = useState([]);

	const navigate = useNavigate();

	const { data, status, error } = useAppSelector((state) => state.allOrder);

	const dispatch = useAppDispatch();

	const setFilteredPaid = () => {
		const filtered = orders.filter((item) => item.status === "successful");
		setNewORders(filtered);
		setOrderState("completed");
		console.log(filtered);
	};

	const setFilteredAll = () => {
		setNewORders(orders);
		setOrderState("All");
	};

	const setFilteredPending = () => {
		const filtered = orders.filter((item) => item.status === "pending");
		setNewORders(filtered);
		setOrderState("pending");
		console.log(filtered);
	};

	const columns: GridColDef[] = [
		{
			field: "id",
			headerName: "ID",
			width: 90,
		},
		{
			field: "name",
			headerName: "Name",
			width: 150,
			editable: true,
		},
		{
			field: "email",
			headerName: "Email",
			width: 150,
			editable: true,
		},
		{
			field: "address",
			headerName: "Address",
			width: 110,
			editable: true,
		},
		{
			field: "phone",
			headerName: "Phone",
			width: 110,
			editable: true,
		},
		{
			field: "delivery_type",
			headerName: "Delivery_Type",
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
			field: "status",
			headerName: "Status",
			width: 200,
			editable: true,
			renderCell: (param) => {
				return <p className={param?.row.status}>{param.row.status}</p>;
			},
		},
		{
			field: "total_amount",
			headerName: "Total_Amount",
			width: 150,
			editable: false,
		},
	];

	useEffect(() => {
		if (status === "idle") {
			dispatch(getOrders());
		}
		if (status === "successful") {
			setNewORders(data.orders);
			setOrders(data.orders);
		}
		if (status === "failed") {
			const errors = error as unknown as ErrorResponse;
			console.log(errors);
			if (errors.message?.includes("jwt")) {
				clearStorage();
				navigate("/login");
			}
			errors.message && setErrorMessage(errors.message);
		}
	}, [status, dispatch, error, data.orders, navigate]);
	console.log(newOrders);

	return (
		<main className='order__componentContainer p-4'>
			<h1>Orders</h1>
			<section className='order__SectionCenter my-4'>
				<article className='order__sectionArticle newOrders'>
					<h3>New Orders</h3>
					<div className='newOrders__content flex items-center'>
						<h2>245</h2>
						<p className='mx-4'>|</p>
						<p>Impression - 20%</p>
					</div>
				</article>
				<article className='order__sectionArticle deliveredOrders'>
					<h3>Delivered Orders</h3>
					<div className='deliveredOrders__content flex items-center'>
						<h2>245</h2>
						<p className='mx-4'>|</p>
						<p>Impression - 20%</p>
					</div>
				</article>
				<article className='order__sectionArticle cancelledOrders'>
					<h3>Cancelled Orders</h3>
					<div className='cancelledOrders__content flex items-center'>
						<h2>245</h2>
						<p className='mx-4'>|</p>
						<p>Impression - 20%</p>
					</div>
				</article>
			</section>
			<section className='orderFilter bg-[#F9F9F9]'>
				<div className='orderFilter__content__contianer  flex justify-between items-center'>
					<div className='order__filtersContainer flex'>
						<h4
							className={
								orderState === "All" ? "state cursor-pointer" : "cursor-pointer"
							}
							onClick={setFilteredAll}
						>
							All Orders
						</h4>
						<h4
							className={
								orderState === "completed"
									? "state cursor-pointer"
									: "cursor-pointer"
							}
							onClick={setFilteredPaid}
						>
							Completed
						</h4>
						<h4
							className={
								orderState === "pending"
									? "state cursor-pointer"
									: "cursor-pointer"
							}
							onClick={setFilteredPending}
						>
							Pending
						</h4>
					</div>
					<div className='orderFilter__container flex justify-between items-center '>
						<p className='px-2'>
							<i className='fa-solid fa-filter'></i> Filters
						</p>
						<form action='' className='px-2'>
							<i className='fa-solid fa-magnifying-glass'></i>
							<input type='text' placeholder='Search' />
						</form>
						<p className='px-2 export'>
							<i className='fa-solid fa-download'></i> Export Table
						</p>
					</div>
				</div>
				<Box sx={{ height: "65vh", width: "100%" }}>
					{errorMessage && <h1>{errorMessage}</h1>}
					<DataGrid
						rows={newOrders}
						columns={columns}
						pageSize={8}
						rowsPerPageOptions={[8]}
						checkboxSelection
						disableSelectionOnClick
						experimentalFeatures={{ newEditingApi: true }}
					/>
				</Box>
			</section>
		</main>
	);
};
