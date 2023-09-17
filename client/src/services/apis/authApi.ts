import { LoginFormData } from '../../components/Login form/loginForm';
import { axiosInstance } from '../axios';

export const signIn = async (data: LoginFormData) => {
	return axiosInstance.post('http://192.168.68.53:5000/user/login', {
		headers: { 'Content-Type': 'application/json' },
		data: data,
	});
};
