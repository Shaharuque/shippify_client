import { LoginFormData } from '../../components/Login form/loginForm';
import { OtpFormData } from '../../components/Registration and setup components/Otp form/otpForm';
import { axiosInstance } from '../axios';

export const signUp = async (data: LoginFormData) => {
	try {
		return axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/user/registration-request`, data, {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error(error);
	}
};

export const sendOTP = async (data: OtpFormData) => {
	try {
		return axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/user/registration-confirm`, data, {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error(error);
	}
};

export const signIn = async (data: LoginFormData) => {
	try {
		return axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/user/login`, data, {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error(error);
	}
};
