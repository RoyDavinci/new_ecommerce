import React from "react";
import { make } from "../../utils";
import { Select } from "./Select/Select";
import "./hero.css";

export interface HeroProps {}

export const Hero: React.FunctionComponent<HeroProps> = () => {
	return (
		<div className='heroContainer'>
			<h1>Select your car</h1>
			<Select name='Select Your Car' items={make}></Select>
			<div className='heroImgContainer'>
				<div className='heroImg__content'>
					<h1>
						<span>This Weekend</span>
						-15% on all Engine Oil buys
					</h1>
					<button>Click Here To Get Offer</button>
				</div>
			</div>
		</div>
	);
};
