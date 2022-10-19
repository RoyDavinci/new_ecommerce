import React from "react";
import { Footer, Header } from "../../components";
import images from "../../images";
import { data, categoryData } from "../../utils/data";
import "./categories.css";
import { CategoryItems } from "./CategoryItem/CategoryItems";

export const Categories = () => {
	return (
		<div className='categoriesContainer'>
			<Header
				logo={images.logoLight}
				cartItems={1}
				user={false}
				links={data}
				userImg={images.userImg}
			></Header>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					alignItems: "center",
					justifyContent: "center",
					padding: "60px",
					backgroundColor: "#F6F6F6",
				}}
				className='categories__heroContainer'
			>
				<div className='categories__heroContent'>
					<h1>Select From A Wide Range Of Categories</h1>
					<article>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
							tempora cum sapiente voluptatum, optio exercitationem?
						</p>
					</article>
					<button>Shop Now</button>
					<div
						className='category__statistics'
						style={{ display: "flex", margin: "15px 0px" }}
					>
						<p style={{ textAlign: "center", marginRight: " 10px" }}>
							<span style={{ fontSize: "24px" }}>
								<strong>1534</strong>
							</span>
							<br />
							<span>Total Products</span>
						</p>
						<p style={{ textAlign: "center" }}>
							<span style={{ fontSize: "24px" }}>
								<strong>12750+</strong>
							</span>
							<br />
							<span>Happy Customers</span>
						</p>
					</div>
				</div>
				<img src={images.categoryImage} alt='' />
			</div>
			<div className='categoriesContainer__categoryITems__container'>
				<h1>Explore By Category</h1>
				<div className='categoriesContainer__categoryITems__content'>
					{categoryData.map((item, index) => {
						return (
							<CategoryItems
								key={index}
								icon={item.button}
								name={item.name}
								description={item.description}
								image={item.image}
							></CategoryItems>
						);
					})}
				</div>
			</div>
			<Footer links={data} image={images.footerLogo}></Footer>
		</div>
	);
};
