import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Footer, Header } from "../../components";
import { getCategoryByName } from "../../features/categories/cateorySlice";
import images from "../../images";
import { SingleCategoryInterface } from "../../interfaces/category";
import { linksData } from "../../utils/data";
import "./singleCategory.css";

export const SingleCategory: React.FC = ({}) => {
	const { name } = useParams();

	const [singleCategory, setSingleCategory] = useState<
		SingleCategoryInterface[]
	>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				if (name) {
					const item = await getCategoryByName(name);
					setSingleCategory(item);
					setLoading(false);
					// console.log(item);
				}
			} catch (error) {
				setLoading(true);
				console.log(error);
			}
		};
		fetchCategory();
		return () => {
			console.log("cleaning useeffect");
		};
	}, [name]);

	console.log(singleCategory);

	return (
		<div>
			<Header
				logo={images.logoLight}
				cartItems={1}
				links={linksData}
				userImg={images.userImg}
			></Header>
			<div className='products__categoryContainer'>
				{singleCategory.map((item) => {
					return (
						<div
							className='products__categoryContainer__coontent'
							key={item.id}
						>
							<img src={item.images && item?.images[0]} alt='' />
							<h4>{item.name}</h4>
							<p>{item.description}</p>
							<div className='star__categoryContainer'>
								<i className='fa-solid fa-star'></i>
								<i className='fa-solid fa-star'></i>
								<i className='fa-solid fa-star'></i>
								<i className='fa-solid fa-star'></i>
								<i className='fa-solid fa-star'></i>
								<span>(85)</span>
							</div>
							<div className='cart__singlePRoduct'>
								<p>
									<span></span>
									<p>₦{item.price}</p>
								</p>
								<button>Add To Cart</button>
							</div>
						</div>
					);
				})}
			</div>
			<Footer links={linksData} image={images.footerLogo}></Footer>
		</div>
	);
};
