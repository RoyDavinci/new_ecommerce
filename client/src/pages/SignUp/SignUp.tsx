import React, { useState } from "react";
import "./signUp.css";
import { Link } from "react-router-dom";

export const SignUp = () => {
	const [text, setText] = useState<string>("password");

	const showPassword = () => {
		return text === "password" ? setText("text") : setText("password");
	};

	return (
		<div className='signUp__container'>
			<div className='signup__containerContent'>
				<h3>
					{" "}
					<i className='fa-solid fa-key'></i>Sign Up
				</h3>
				<p>
					Become a member -- you'll enjoy exclusive deals offers, invites and
					rewards
				</p>
				<form action=''>
					<div className='email__formControl'>
						<label htmlFor='first_name'>
							First Name
							<input
								type='text'
								name='first_name'
								id='first_name'
								placeholder='First Name'
								className='email focus'
							/>
						</label>
					</div>
					<div className='email__formControl'>
						<label htmlFor='last_name'>
							Last Name
							<input
								type='text'
								name='last_name'
								id='last_name'
								placeholder='Last Name'
								className='email focus'
							/>
						</label>
					</div>
					<div className='email__formControl'>
						<label htmlFor='username'>
							Username
							<input
								type='text'
								name='username'
								id='username'
								placeholder='Username'
								className='email focus'
							/>
						</label>
					</div>
					<div className='email__formControl'>
						<label htmlFor='mobile'>
							Phone Number
							<input
								type='text'
								name='mobile'
								id='mobile'
								placeholder='Phone Number'
								className='email focus'
							/>
						</label>
					</div>
					<div className='email__formControl'>
						<label htmlFor='email'>
							Email
							<input
								type='email'
								name='email'
								id='email'
								placeholder='Email'
								className='email focus'
							/>
						</label>
					</div>
					<div className='password__form'>
						<label htmlFor='password'>Password</label>
						<div className='password__formControl'>
							<input
								type={text}
								name='password'
								id='password'
								placeholder='Password'
								className='focus'
							/>
							<i className='fa-solid fa-eye' onClick={showPassword}></i>
						</div>
					</div>
					<p style={{ textAlign: "right", display: "block" }}>
						Forgot Password?
					</p>
					<button>SignUp</button>
				</form>
				<p style={{ textAlign: "center" }}>
					Already Have an Account? <Link to='/login'>Log In</Link>
				</p>
			</div>
		</div>
	);
};
