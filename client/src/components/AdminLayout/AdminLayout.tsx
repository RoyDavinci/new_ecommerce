import React, { useState } from "react";
import "./adminLayout.css";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../AdminSidebar/AdminSidebar";

export const AdminLayout = () => {
	return (
		<div>
			<AdminSidebar></AdminSidebar>
			<section className='main__content'>
				<Outlet />
			</section>
		</div>
	);
};
