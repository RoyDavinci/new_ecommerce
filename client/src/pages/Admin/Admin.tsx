import React from "react";

export interface AdminProps {
	children?: React.ReactNode;
}

export const Admin: React.FC<AdminProps> = ({ children }) => {
	return <div>Admin</div>;
};
