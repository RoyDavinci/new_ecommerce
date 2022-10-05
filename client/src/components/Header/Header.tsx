import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

export interface HeaderProps {
	logo?: string;
	links: string[];
	cartItems: number;
	user: boolean;
	userImg?: string;
}

export const Header: React.FunctionComponent<HeaderProps> = ({
	logo,
	links,
	cartItems,
	user,
	userImg,
}) => {
	return (
		<div className='headerContainer'>
			<div className='headerLogo'>
				<img src={logo} alt='' />
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
