import { Dashboard } from "../Dashboard/Dashboard";
import React from "react";
import { AdminLayout } from "../../components";

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
