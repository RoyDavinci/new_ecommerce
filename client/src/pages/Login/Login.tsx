import React, {
	BaseSyntheticEvent,
	ChangeEvent,
	useEffect,
	useState,
} from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import "./login.css";
import { loginAdmin } from "../../features/auth/authenticateUser";
import { payloadResponse } from "../../interfaces/userinterfaces";
import { useNavigate } from "react-router-dom";
import logging from "../../utils/logging";

export const Login = () => {
	const [text, setText] = useState<string>("password");
	const [user, setUser] = useState<payloadResponse>({
		success: false,
		token: "",
		validity: "",
		data: { user: { id: 0, email: "", token: "", name: "" } },
	});

	const [inputValue, setInputValue] = useState({ email: "", password: "" });

	const showPassword = () => {
		return text === "password" ? setText("text") : setText("password");
	};

	const { data, status } = useAppSelector((state) => state.auth);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setInputValue({ ...inputValue, [name]: value });
	};

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		try {
			e.preventDefault();
			dispatch(
				loginAdmin({
					email: inputValue.email,
					password: inputValue.password,
				})
			);
		} catch (error) {
			const err = error as unknown as string;
			logging.info(err);
		}
	};

	useEffect(() => {
		setUser(data);
		const userState = localStorage.getItem("user");
		userState && navigate(-1);
	}, [data, user, navigate]);

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
				{status === "failed" && (
					<p className='failed-message'>Email or Password Incorrect</p>
				)}
				<form action='' onSubmit={handleSubmit}>
					<div className='email__formControl'>
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
