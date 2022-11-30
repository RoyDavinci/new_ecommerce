import React, { useEffect, useState } from "react";
import "./hero.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getProducts } from "../../features/products/productSlice";
import { ProductInterface } from "../../interfaces/product";
export interface HeroProps {}

const getUnique = (
	items: ProductInterface[],
	value: keyof ProductInterface
) => {
	return [...new Set(items.map((item) => item[value]))];
};

export const Hero: React.FunctionComponent<HeroProps> = () => {
	const dispatch = useAppDispatch();
	const [products, setProducts] = useState<ProductInterface[]>([]);
	const [errors, setErrors] = useState<{}>();
	const [year, setYear] =
		useState<(string | number | Date | null | undefined | string[])[]>();
	const [selectNames, setSelectNames] =
		useState<(string | number | Date | null | undefined | string[])[]>();

	const { data, status, error } = useAppSelector((state) => state.allProducts);

	console.log(selectNames, data);

	useEffect(() => {
		if (status === "idle") {
			dispatch(getProducts());
		}
		if (status === "successful") {
			setProducts(data);
			const items = getUnique(data, "make");
			const years = getUnique(data, "year");
			setYear(years);
			setSelectNames(items);
		}
		if (status === "failed") {
			setErrors(error);
		}
	}, [dispatch, status, data, error]);

	return (
		<div className='heroContainer'>
			<div className='heroImgContainer'>
				<div className='heroImg__content'>
					<h1>Find The Parts for your Vehicle</h1>
					<h2 className='text-2xl'>Best Deals Across Board</h2>
					<form action=''>
						<select name='' id=''>
							<option value=''>Select Your Make</option>
							{selectNames &&
								selectNames.map((item, index) => {
									return (
										typeof item === "string" && (
											<option key={index}>{item}</option>
										)
									);
								})}
						</select>
						<select name='' id=''>
							<option value=''>Choose Year</option>
							{year &&
								year.map((item, index) => {
									return (
										typeof item === "string" && (
											<option key={index}>{item}</option>
										)
									);
								})}
						</select>
						<button>Filter</button>
					</form>
				</div>
			</div>
		</div>
	);
};
