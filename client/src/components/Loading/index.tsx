import React from "react";
import { Spinner } from "reactstrap";

export interface ILoadingComponentProps {
	card?: boolean;
	doctype?: string;
	children: React.ReactNode;
}

export const LoadingComponent: React.FunctionComponent<
	ILoadingComponentProps
> = ({ doctype, children, card }) => {
	return (
		<Spinner color='primary' type='grow'>
			Loading...
		</Spinner>
	);
};

LoadingComponent.defaultProps = {
	card: true,
	doctype: "dot-bricks",
};

export default LoadingComponent;
