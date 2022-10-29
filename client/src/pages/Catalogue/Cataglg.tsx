import React from "react";
import { AdminLayout } from "../../components";
import "./catalog.css";
import { CatalogComponent } from "./CatelogComponent/CatalogComponent";

export const Cataglog = () => {
	return (
		<div>
			<AdminLayout children={<CatalogComponent />}></AdminLayout>
		</div>
	);
};
