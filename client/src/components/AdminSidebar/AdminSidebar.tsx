import React from "react";
import "./adminSidebar.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Accordion, AccordionSummary } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

export const AdminSidebar = () => {
	const sideMenuLinks = [
		{
			id: 1,
			icon: <DashboardIcon />,
			text: "Dashboard",
			path: "/portal",
			hasChildren: false,
		},
		{
			id: 2,
			icon: <FolderOpenOutlinedIcon />,
			text: "Orders",
			path: "/portal/women-wears",
			hasChildren: false,
		},
		{
			id: 3,
			icon: "fa-duotone fa-bags-shopping",
			text: "Catalog",
			path: "/portal/categories",
			hasChildren: false,
		},
		{
			id: 3,
			icon: <FolderOpenOutlinedIcon />,
			text: "Customers",
			path: "/portal/payment",
			hasChildren: false,
		},
		{
			id: 4,
			icon: "fa-brands fa-amazon-pay",
			text: "Payments",
			path: "/portal",
			hasChildren: false,
		},
		{
			id: 5,
			icon: "fa-solid fa-gear",
			text: "Configuration",
			path: "/portal",
			hasChildren: false,
		},
	];

	return (
		<div>
			{sideMenuLinks.map((item) => {
				return (
					<Link to={item.path} key={item.id}>
						{typeof item.icon === "string" ? (
							<i className={item.icon}></i>
						) : (
							item.icon
						)}{" "}
						{item.text}
					</Link>
				);
			})}
		</div>
	);
};
