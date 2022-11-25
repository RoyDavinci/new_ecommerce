import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import images from "../../images";
import { linksData } from "../../utils/data";
import { useAppSelector } from "../../app/hooks";

export const Header: React.FunctionComponent = () => {
	const [userState, setUserState] = useState<boolean>(false);
	const [cartState, setCartState] = useState<number>(0);
	const { data } = useAppSelector((state) => state.cart);

	const user = localStorage.getItem("user");

	useEffect(() => {
		if (data.length >= 1) setCartState(data.length);
		return () => {
			console.log("cleaning useeffect");
		};
	}, [data.length]);

	useEffect(() => {
		if (user) setUserState(true);
		return () => {
			console.log("cleaning useeffect");
		};
	}, [user]);

	return (
		<div className='headerContainer'>
			<div className='headerLogo'>
				<Link to='/'>
					<img src={images.logoLight} alt='app-logo' />
				</Link>
			</div>
			<div className='headerLinks'>
				<ul>
					{linksData.map((item, index) => {
						return (
							<li key={index}>
								<Link
									to={item === "Home" ? "/" : item.toLowerCase()}
									className=''
								>
									{item}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
			<div className='headerUser'>
				<i className='fa-solid fa-magnifying-glass'></i>
				<Link to='/cart'>
					<i
						className={
							cartState > 0
								? "fa-solid fa-cart-shopping pointer-events-auto"
								: "fa-solid fa-cart-shopping pointer-events-none"
						}
					>
						<span className={cartState > 0 ? "showCartItem" : "hideCartItem"}>
							{cartState}
						</span>
					</i>
				</Link>
				{user ? (
					<img src={images.userImg} alt=''></img>
				) : (
					<button>Sign Up</button>
				)}
			</div>
		</div>
	);
};
