import { SerializedError } from "@reduxjs/toolkit";

export interface userData {
	id: number;
	name: string;
	createdAt?: string;
	updatedAt?: string;
	role?: string;
	email: string;
	token: string;
}
export interface payloadResponse {
	success: boolean;
	token: string;
	validity: string;
	data: { user: userData };
}

export interface payloadErrorResponse {
	name?: string;
	message?: string;
	stack?: string;
	code?: string;
}

export type userInfo = {
	email: string;
	password: string;
};

export type userSignUp = {
	first_name: string;
	last_name: string;
	password: string;
	email: string;
	mobile: string;
	username: string;
	image: string | Blob;
};

export interface UserState {
	message: string;
	status: "idle" | "loading" | "failed" | "successful";
	data: payloadResponse;
	error: payloadErrorResponse;
}
