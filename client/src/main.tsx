import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { chakraTheme } from './chakraTheme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider theme={chakraTheme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>
);
