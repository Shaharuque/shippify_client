import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/login.page';
import RegisterPage from './pages/Register/register.page';

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/register"
					element={<RegisterPage />}></Route>
				<Route
					path="/login"
					element={<LoginPage />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
