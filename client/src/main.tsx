import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { chakraTheme } from './chakraTheme.ts';
import { store } from './redux/store.ts';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ChakraProvider theme={chakraTheme}>
				<App />
			</ChakraProvider>
		</Provider>
	</React.StrictMode>
);
