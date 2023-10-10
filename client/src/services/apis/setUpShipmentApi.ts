import { axiosInstance } from '../axios';

export const getAllWarehouses = async (token: string) => {
	try {
		return axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/warehouse/all-list`, {
			headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
		});
	} catch (error) {
		console.error(error);
	}
};
