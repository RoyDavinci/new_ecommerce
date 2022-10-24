import React, { BaseSyntheticEvent, ChangeEvent, useState } from "react";
import "./signUp.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { createUser } from "../../features/auth/authenticateUser";
import { useNavigate } from "react-router-dom";
import logging from "../../utils/logging";
import { userSignUp } from "../../interfaces/userinterfaces";

export const SignUp = () => {
	const [text, setText] = useState<string>("password");
	const [previewImage, setPreviewImage] = useState<
		string | ArrayBuffer | null
	>();
	const [initial, setInitial] = useState<userSignUp>({
		first_name: "",
		last_name: "",
		email: "",
		username: "",
		mobile: "",
		image: "",
		password: "",
	});

	const showPassword = () => {
		return text === "password" ? setText("text") : setText("password");
	};

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const item = new FormData();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setInitial({ ...initial, [name]: value });

		const { files } = e.target;

		if (files) {
			setInitial({ ...initial, image: files[0] });
			const fileName = files[0];
			const reader = new FileReader();

			reader.onloadend = (e) => {
				if (fileName.size / 1024 / 1024 > 1) {
					toast.info("File is greater than 1MB");
					return;
				}

				if (
					fileName.type === "image/png" ||
					fileName.type === "image/jpg" ||
					fileName.type === "image/jpeg"
				) {
					setPreviewImage(e.target?.result);
				} else {
					toast.error(".png, .jpg and .jpeg are the only valid file format");
				}
			};
			reader.readAsDataURL(fileName);
		}

		for (var key in initial) {
			console.log(key);
		}
	};

	const handleSubmit = (e: BaseSyntheticEvent) => {
		e.preventDefault();
		item.append("image", initial.image);
		item.append("first_name", initial.first_name);
		item.append("last_name", initial.last_name);
		item.append("email", initial.email);
		item.append("password", initial.password);
		item.append("mobile", initial.mobile);
		item.append("username", initial.username);
		try {
			dispatch(createUser(item));
		} catch (error) {
			logging.info(JSON.stringify(error));
		}
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
				<form action='' onSubmit={handleSubmit}>
					<div className='email__formControl'>
						<label htmlFor='first_name'>
							First Name
							<input
								type='text'
								name='first_name'
								id='first_name'
								placeholder='First Name'
								className='email focus'
								value={initial.first_name}
								onChange={handleChange}
								required
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
								value={initial.last_name}
								onChange={handleChange}
								required
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
								value={initial.username}
								onChange={handleChange}
								required
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
								value={initial.mobile}
								onChange={handleChange}
								required
							/>
						</label>
					</div>
					<div
						id='uploadImage'
						className='dashboradCategories_upload'
						style={{}}
					>
						<label
							htmlFor='product'
							className='dashboradCategories_upload_btn'
							style={{
								height: "150px",
								backgroundImage: `url(${previewImage})`,
								border: "0.5px solid #ccc",
								margin: "10px 0px",
								display: "flex",
								alignItems: "center",
								textAlign: "center",
								justifyContent: "center",
							}}
						>
							Browse
							<input
								hidden
								id='product'
								name='image'
								multiple
								type='file'
								onChange={handleChange}
								required
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
								value={initial.email}
								onChange={handleChange}
								required
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
								value={initial.password}
								onChange={handleChange}
								required
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
