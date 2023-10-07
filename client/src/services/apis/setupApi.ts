import { AddressSetupFormData } from '../../components/Registration and setup components/Address setup form/addressSetupForm';
import { CompanyProfileFormData } from '../../components/Registration and setup components/Company profile form/companyProfileForm';
import { WarehouseSetupFormData } from '../../components/Registration and setup components/Warehouse setup form/warehouseSetupForm';
import { axiosInstance } from '../axios';

export const setUpCompany = async (data: CompanyProfileFormData, token: string) => {
	try {
		return axiosInstance.patch(`${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/user/update`, data, {
			headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
		});
	} catch (error) {
		console.error(error);
	}
};

export const setUpCompanyAddress = async (data: { address: AddressSetupFormData }, token: string) => {
	try {
		return axiosInstance.patch(`${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/user/update`, data, {
			headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
		});
	} catch (error) {
		console.error(error);
	}
};

export const setUpWarehouses = async (data: WarehouseSetupFormData, token: string) => {
	try {
		return axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/warehouse/create`, data, {
			headers: { 'Content-Type': 'application/json', 'x-auth-token': `${token}` },
		});
	} catch (error) {
		console.error(error);
	}
};
