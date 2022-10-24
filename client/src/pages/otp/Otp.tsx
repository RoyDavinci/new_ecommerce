import React, { useState } from "react";

export const Otp = () => {
	const [otpValue, setOtpValue] = useState("");

	return (
		<div>
			<h1>Confirm Otp</h1>
			<form action=''>
				<input
					type='text'
					name='otp'
					value={otpValue}
					onChange={(e) => setOtpValue(e.target.value)}
				/>
				<button>Submit</button>
			</form>
		</div>
	);
};
