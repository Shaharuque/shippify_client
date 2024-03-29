import { LoginFormData } from '../../components/Login form/loginForm';
import { OtpFormData } from '../../components/Registration and setup components/Otp form/otpForm';
import { axiosInstance } from '../axios';

export const signUp = async (data: LoginFormData) => {
	try {
		return axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/user/registration-request`, data, {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error(error);
	}
};

export const sendOTP = async (data: OtpFormData) => {
	try {
		return axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/user/registration-confirm`, data, {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error(error);
	}
};

export const signIn = async (data: LoginFormData) => {
	try {
		return axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, data, {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error(error);
	}
};

export const profile = async (token: string) => {
	try {
		return axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/user/data`, {
			headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
		});
	} catch (error) {
		console.error(error);
	}
};
