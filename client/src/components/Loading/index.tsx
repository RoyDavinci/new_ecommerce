import React from "react";
import { Card, CardBody } from "reactstrap";
import CenterPiece from "../CenterPiece";

export interface ILoadingProps {
	doctype?: string;
	children?: React.ReactNode;
}

export const Loading: React.FunctionComponent<ILoadingProps> = ({
	doctype,
	children,
}) => {
	return (
		<div className='text-center'>
			<div className='stage'>
				<div className={doctype}></div>
			</div>
		</div>
	);
};

Loading.defaultProps = {
	doctype: "dot-bricks",
};

export interface ILoadingComponentProps {
	card?: boolean;
	doctype?: string;
	children: React.ReactNode;
}

export const LoadingComponent: React.FunctionComponent<
	ILoadingComponentProps
> = ({ doctype, children, card }) => {
	if (card) {
		return (
			<CenterPiece>
				<Card>
					<CardBody>
						<Loading doctype={doctype}></Loading>
					</CardBody>
				</Card>
			</CenterPiece>
		);
	}

	return <Loading doctype={doctype}>{children}</Loading>;
};

LoadingComponent.defaultProps = {
	card: true,
	doctype: "dot-bricks",
};

export default LoadingComponent;
