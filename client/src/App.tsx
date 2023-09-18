import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/Register/register.page';
import LoginPage from './pages/Login/login.page';
import PageNotFound from './components/Page not found/pageNotFound';
import HomePage from './pages/Home/home.page';

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

				<Route
					path="/home"
					element={<HomePage />}></Route>

				<Route
					path="*"
					element={<PageNotFound />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
