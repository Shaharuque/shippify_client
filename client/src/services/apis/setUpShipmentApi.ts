import { axiosInstance } from '../axios';

export const getAllWarehouses = async (token: string) => {
	try {
		return axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/warehouse/all-list`, {
			headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
		});
	} catch (error) {
		console.error(error);
	}
};
