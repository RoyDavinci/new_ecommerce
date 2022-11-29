import React, { useEffect, useState } from "react";
import { Footer } from "../footer/Footer";
import { Header } from "../Header/Header";
import { Link } from "react-router-dom";
import "./header.css";
import images from "../../images";
import { useAppSelector } from "../../app/hooks";
import { items } from "../../images";

export const Hero = () => {
	const [cartState, setCartState] = useState<number>(0);
	const { data } = useAppSelector((state) => state.cart);
	const [index, setIndex] = useState(0);
	const [image, setImage] = useState(items[index]);

	useEffect(() => {
		if (data.length >= 1) setCartState(data.length);
		return () => {
			console.log("cleaning useeffect");
		};
	}, [data.length]);
	useEffect(() => {
		const myInterval = setInterval(() => {
			if (index === items.length - 1) {
				setIndex(0);
			} else {
				setIndex(index + 1);
			}
			setImage(items[index]);
		}, 2000);
		return () => clearInterval(myInterval);
	}, [index]);
	return (
		<div>
			<Header />
			<div
				className=''
				style={{
					backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${image})`,
					backgroundPosition: "center",
					backgroundSize: "cover",
					height: "100vh",
					backgroundRepeat: "no-repeat",
				}}
			>
				<header>
					<nav className='flex justify-between items-center new__header__nav text-white'>
						<ul className='fkex items-center justify-center'>
							<li>
								<Link to='/'>
									<img
										src={images.logoLight}
										className='mr-3 h-6 sm:h-9'
										alt='Flowbite Logo'
									/>
								</Link>
							</li>
							<li>
								<Link to='/'> Home</Link>
							</li>
							<li>
								<Link to='/'> About</Link>
							</li>
							<li>
								<Link to='/'> Products</Link>
							</li>
							<li>
								<Link to='/'> Contact</Link>
							</li>
						</ul>
						<ul className='flex items-center justify-center'>
							<li>
								<i
									className={
										cartState > 0
											? "fa-solid fa-cart-shopping pointer-events-auto text-white"
											: "fa-solid fa-cart-shopping pointer-events-none text-white"
									}
								>
									<span
										className={cartState > 0 ? "showCartItem" : "hideCartItem"}
									>
										{cartState}
									</span>
								</i>
							</li>
							<li>
								<i className='fa-solid fa-magnifying-glass'></i>
							</li>
							<li>
								<form action=''>
									<input type='text' />
								</form>
							</li>
						</ul>
					</nav>
				</header>
			</div>
			<Footer />
		</div>
	);
};
