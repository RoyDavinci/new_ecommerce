import React, { useState } from "react";
import "./adminLayout.css";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../AdminSidebar/AdminSidebar";

export interface adminLayoutInterface {
	children: React.ReactNode;
}

export const AdminLayout: React.FC<adminLayoutInterface> = ({ children }) => {
	return (
		<div className='admin__layoutContent'>
			<div className='adminSideBarContent'>
				<AdminSidebar></AdminSidebar>
			</div>

			<section className='main__content'>{children}</section>
		</div>
	);
};
