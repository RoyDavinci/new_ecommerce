import React, { useState } from "react";
import { getItem, modelType } from "../../../utils/cars/carItems";

export interface SelectProps {
	items: string[];
	name: string;
}

export const Select: React.FunctionComponent<SelectProps> = ({
	items,
	name,
}) => {
	const [make, SetMake] = useState<modelType>();

	const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
		const currentValue = e.currentTarget.value;
		const item = getItem(currentValue);
		SetMake(item);
	};

	return (
		<div className='heroSelect__container'>
			<select name='make' id='' onChange={handleChange}>
				<option value={name} disabled>
					{name}
				</option>
				{items.map((item, index) => {
					return (
						<option key={index} value={item}>
							{item}
						</option>
					);
				})}
			</select>
			<select name='' id=''>
				<option value='Select Model' disabled>
					Select Model
				</option>
				{make?.items?.map((item, index) => {
					return (
						<option value={item} key={index}>
							{item}
						</option>
					);
				})}
			</select>
			<button>Search Products</button>
		</div>
	);
};
