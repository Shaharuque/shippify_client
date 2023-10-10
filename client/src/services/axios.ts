import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
});

export const axiosBNPLInstance = axios.create({
	baseURL: `${import.meta.env.VITE_BNPL_URL}`,
});

export const axiosInsuranceInstance = axios.create({
	baseURL: `${import.meta.env.VITE_INSURANCE_URL}`,
});

export const axiosBlockchainInstance = axios.create({
	baseURL: `${import.meta.env.VITE_BLOCKCHAIN_URL}`,
});
