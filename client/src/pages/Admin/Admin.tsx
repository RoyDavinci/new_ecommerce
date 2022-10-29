import { Dashboard } from "../Dashboard/Dashboard";
import React from "react";
import { AdminLayout } from "../../components";
import { AdminSidebar } from "../../components/AdminSidebar/AdminSidebar";

export interface AdminProps {
	children?: React.ReactNode;
}

export const Admin: React.FC<AdminProps> = ({ children }) => {
	return (
		<div>
			<AdminLayout children={<Dashboard />}></AdminLayout>
		</div>
	);
};
