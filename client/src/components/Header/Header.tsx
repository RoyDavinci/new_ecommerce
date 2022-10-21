import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

export interface HeaderProps {
	logo?: string;
	links: string[];
	cartItems: number;
	userImg?: string;
}

export const Header: React.FunctionComponent<HeaderProps> = ({
	logo,
	links,
	cartItems,
	userImg,
}) => {
	const [userState, setUserState] = useState(false);

	const user = localStorage.getItem("user");

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
					<img src={logo} alt='' />
				</Link>
			</div>
			<div className='headerLinks'>
				<ul>
					{links.map((item, index) => {
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
				<i className='fa-solid fa-cart-shopping'>
					<span className={cartItems > 0 ? "shoCartItem" : "hideCartItem"}>
						{cartItems}
					</span>
				</i>
				{user ? <img src={userImg}></img> : <button>Sign Up</button>}
			</div>
		</div>
	);
};
