import React from "react";
import { make } from "../../utils";
import { Select } from "./Select/Select";

export interface HeroProps {}

export const Hero: React.FunctionComponent<HeroProps> = () => {
	return (
		<div className='heroContainer'>
			<Select name='Select Your Car' items={make}></Select>
		</div>
	);
};
