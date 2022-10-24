import React from "react";
import { Container } from "reactstrap";

export interface ICenterPieceProps {
	children?: React.ReactNode;
}

export const CenterPiece: React.FunctionComponent<ICenterPieceProps> = ({
	children,
}) => {
	return (
		<Container fluid className='p-0'>
			<Container
				style={{
					left: "50%",
					position: "absolute",
					transform: "translate(-50%, -50%)",
					WebkitTransform: "translate(-50%, -50%)",
					top: "50%",
				}}
				className='d-flex justify-content-center'
			>
				{children}
			</Container>
		</Container>
	);
};

export default CenterPiece;
