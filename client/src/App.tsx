import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/login.page';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/login"
					element={
						<ChakraProvider>
							<LoginPage />
						</ChakraProvider>
					}></Route>
			</Routes>
		</Router>
	);
}

export default App;
