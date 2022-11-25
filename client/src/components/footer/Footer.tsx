import React from "react";
import "./footer.css";
import { linksData } from "../../utils/data";
import images from "../../images";

export const Footer: React.FC = () => {
	return (
		<div className='footerContainer'>
			<section>
				<article>
					<img src={images.footerLogo} alt='' />
					<p>emsthias33@gmail.com</p>
					<p>234-91-5940-3602</p>
					<span>
						<i className='fa-brands fa-facebook'></i>
						<i className='fa-brands fa-twitter'></i>
						<i className='fa-brands fa-linkedin'></i>
					</span>
				</article>
				<article>
					<h3>Links</h3>
					<ul>
						{linksData.map((item, index) => {
							return <li key={index}>{item}</li>;
						})}
					</ul>
				</article>
				<article>
					<h3>CUSTOMER SERVICE</h3>
					<ul>
						<li>Customer Dashboard</li>
						<li>Check My Delivery</li>
						<li>Payment Methods</li>
						<li>Delivery Details</li>
						<li>Complaints</li>
					</ul>
				</article>
				<article>
					<h3>Address/ Location</h3>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
						quibusdam eum sapiente? Deleniti sequi velit odio, recusandae saepe
						aliquid est, possimus nobis itaque iste voluptates nemo minus
						tempore dolorum voluptate.
					</p>
				</article>
			</section>
		</div>
	);
};
