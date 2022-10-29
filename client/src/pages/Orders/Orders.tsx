import React from "react";
import { AdminLayout } from "../../components";
import { OrderComponent } from "./OrderComponent/OrderComponent";
import "./orders.css";

export const Orders = () => {
	return (
		<div>
			<AdminLayout children={<OrderComponent />}></AdminLayout>
		</div>
	);
};
