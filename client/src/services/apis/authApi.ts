import { LoginFormData } from '../../components/Login form/loginForm';
import { axiosInstance } from '../axios';

export const signUp = async (data: LoginFormData) => {
	try {
		return axiosInstance.post('http://192.168.68.67:5000/user/registration-request', data, {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error(error);
	}
};

export const signIn = async (data: LoginFormData) => {
	try {
		return axiosInstance.post('http://192.168.68.53:5000/user/login', data, {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error(error);
	}
};
