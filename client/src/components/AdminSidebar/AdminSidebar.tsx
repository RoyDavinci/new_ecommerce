import React, { ChangeEvent, useEffect, useState } from "react";
import "./adminSidebar.css";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";

export const AdminSidebar = () => {
	const [image, setImage] = useState<string>(
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2DsvZVmO8R0meFJxT95IeHnnraPoqW-WJlliipzlMekNzv4SngxTX7Xr3KJFU0NnLj2M&usqp=CAU"
	);

	const [background, setBackground] = useState<number>();

	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) {
			const userDetails = JSON.parse(user);
			setImage(userDetails.image);
		}
		return () => {
			console.log("cleared on unmount");
		};
	}, [image]);

	const onBackgroundChange = (id: number) => {
		setBackground(id);
		const filter = sideMenuLinks.find((item) => item.id === id);
		// if (filter?.hasChildren) {
		// 	filter.children?.forEach((item) => {setBackground(sideMenuLinks[filter.children[item.id]])});
		// }
		console.log(id);
	};

	const sideMenuLinks = [
		{
			id: 1,
			icon: <DashboardIcon />,
			text: "Dashboard",
			path: "/admin",
			hasChildren: false,
		},
		{
			id: 2,
			icon: <FolderOpenOutlinedIcon />,
			text: "Orders",
			path: "/orders",
			hasChildren: false,
		},
		{
			id: 3,
			icon: "fa-solid fa-shop",
			text: "Catalog",
			path: "/products",
			hasChildren: false,
		},
		{
			id: 4,
			icon: <FolderOpenOutlinedIcon />,
			text: "Customers",
			path: "/admin",
			hasChildren: false,
		},
		{
			id: 5,
			icon: "fa-brands fa-amazon-pay",
			text: "Payments",
			path: "/admin",
			hasChildren: false,
		},
		{
			id: 6,
			icon: "fa-solid fa-gear",
			text: "Configuration",
			path: "/admin",
			hasChildren: true,
			children: [
				{
					id: 1,
					text: "Settings",
					path: "/admin/settings",
				},
			],
		},
	];

	return (
		<div className='adminSidebarContent__container p-3'>
			<div className='adminSidebar__userContainer mb-12'>
				<div className='userAdmin__sidebarContent flex'>
					<img src={image} alt='' />
					<div className='userAdmin__containerContent'>
						<p>Brady Shop</p>
						<p>Nicole (Role)</p>
					</div>
				</div>
				<i className='fa-solid fa-chevron-down'></i>
			</div>
			<div className='adminSidebar__menuContainer'>
				{sideMenuLinks.map((item) => {
					return (
						<div
							className='sideBarItems__linkContainer '
							key={item.id}
							onClick={() => onBackgroundChange(item.id)}
							style={{
								padding: "10px",
								backgroundColor: `${item.id === background ? "#ccc" : ""}`,
								borderRadius: "5px",
								marginBottom: "10px",
							}}
						>
							<div className='sideBarItems__linkItemContainer'>
								<Link to={item.path}>
									{typeof item.icon === "string" ? (
										<i className={item.icon}></i>
									) : (
										item.icon
									)}
									<span>{item.text}</span>
								</Link>

								{item.hasChildren && (
									<i className='fa-solid fa-chevron-down'></i>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
