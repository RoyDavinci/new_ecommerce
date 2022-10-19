import React, { BaseSyntheticEvent, ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import "./login.css";
import axios from "axios";

export const Login = () => {
	const [text, setText] = useState<string>("password");

	const [inputValue, setInputValue] = useState({ email: "", password: "" });

	const showPassword = () => {
		return text === "password" ? setText("text") : setText("password");
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setInputValue({ ...inputValue, [name]: value });
	};

	const mutation = useMutation(
		(variables: { email: string; password: string }) => {
			return axios.post("http://localhost:8090/api/v1/user/signin", {
				email: variables.email,
				password: variables.password,
			});
		}
	);

	const { isError, isLoading, isSuccess, error } = mutation;

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		try {
			e.preventDefault();
			mutation.mutate({
				password: inputValue.password,
				email: inputValue.email,
			});

			// console.log(error, isLoading);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='login__container'>
			<div className='login__containerContent'>
				<h3>
					<i className='fa-solid fa-key'></i>Login
				</h3>
				<p>
					Become a member -- you'll enjoy exclusive deals offers, invites and
					rewards
				</p>
				<form action='' onSubmit={handleSubmit}>
					<div className='email__formControl'>
						{isError && <small>{}</small>}
						<label htmlFor='email'>
							<input
								type='email'
								name='email'
								id='email'
								placeholder='Email'
								className='email focus'
								value={inputValue.email}
								onChange={onChange}
							/>
						</label>
					</div>
					<div className='password__formControl'>
						<label htmlFor='password'>
							<input
								type={text}
								name='password'
								id='password'
								placeholder='Password'
								className='focus'
								value={inputValue.password}
								onChange={onChange}
							/>
							<i className='fa-solid fa-eye' onClick={showPassword}></i>
						</label>
					</div>
					<p style={{ textAlign: "right", display: "block" }}>
						Forgot Password?
					</p>
					<button type='submit'>LogIn</button>
				</form>
				<p style={{ textAlign: "center" }}>
					Don't Have an Account? <Link to='/sign-up'>Sign Up</Link>
				</p>
			</div>
		</div>
	);
};
