import { AddressSetupFormData } from '../../components/Address setup form/addressSetupForm';
import { CompanyProfileFormData } from '../../components/Company profile form/companyProfileForm';
import { axiosInstance } from '../axios';

export const setUpCompany = async (data: CompanyProfileFormData) => {
	try {
		return axiosInstance.post('http://192.168.68.53:5000/user/registration-request', data, {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error(error);
	}
};

export const setUpCompanyAddress = async (data: AddressSetupFormData) => {
	try {
		return axiosInstance.post('http://192.168.68.53:5000/user/registration-request', data, {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error(error);
	}
};
