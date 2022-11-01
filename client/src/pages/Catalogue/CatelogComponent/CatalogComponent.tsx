import React, { useState } from "react";
import "./catalogComponent.css";
import { productsData, ProductInterface } from "../../../interfaces/product";
import "./catalogComponent.css";
import { Table } from "reactstrap";

export const CatalogComponent = () => {
	const [products, setProducts] = useState<ProductInterface[]>(productsData);

	return (
		<main className='catalog__componentContainer'>
			<section className='catalog__sectionCenter'>
				<article className='flex justify-between items-center'>
					<h1>Products</h1>
					<button className='bg-[#4285F4] text-white p-2 rounded-md'>
						Add New Products
					</button>
				</article>
				<article className='catalog__SectionFilter__component flex justify-between my-4'>
					<h4>All Products</h4>
					<form action='' className='px-2'>
						<i className='fa-solid fa-magnifying-glass text-sm'></i>
						<input type='text' placeholder='Search' />
					</form>
				</article>
			</section>
			<table className='products__table__container'>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Image</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Make</th>
						<th>Model</th>
						<th>Year</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{products.map((item) => {
						return (
							<tr key={item.id}>
								<td>{item.id}</td>
								<td>{item.name}</td>
								<td>
									<img src={item.image[0]} alt='' />
								</td>
								<td>{item.quantity}</td>
								<td>{item.price}</td>
								<td>{item.make}</td>
								<td>{item.model}</td>
								<td>{item.year}</td>
								<td className='limtiCharClass'> {item.description}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</main>
	);
};
