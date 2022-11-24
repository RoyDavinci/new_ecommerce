import { v4 as uuidv4 } from "uuid";

export function generateRandom() {
	var length = 8,
		charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
		retVal = "";
	for (var i = 0, n = charset.length; i < length; ++i) {
		retVal += charset.charAt(Math.floor(Math.random() * n));
	}
	return retVal;
}

export function generateId() {
	const data = uuidv4();
	return data.substring(0, 2);
}
