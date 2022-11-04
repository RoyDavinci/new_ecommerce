import React, { useState } from "react";
import "./adminLayout.css";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../AdminSidebar/AdminSidebar";
import { useAppSelector } from "../../app/hooks";
import { defaultState } from "../../features/state/state";

export interface adminLayoutInterface {
	children: React.ReactNode;
}

export const AdminLayout: React.FC<adminLayoutInterface> = ({ children }) => {
	const initial = useAppSelector(defaultState);
	return (
		<div className='admin__layoutContent'>
			<div
				className={`${!initial ? "overlay" : "overlay overlayBackground"}`}
			></div>
			<div className='admin__container'>
				<div className='adminSideBarContent'>
					<AdminSidebar></AdminSidebar>
				</div>

				<section className='main__content'>{children}</section>
			</div>
		</div>
	);
};
