import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/Register/register.page';
import LoginPage from './pages/Login/login.page';
import PageNotFound from './components/Page not found/pageNotFound';
import CountDownTimer from './components/Countdown timer/countDown';

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
					path="/timer"
					element={<CountDownTimer />}></Route>

				<Route
					path="*"
					element={<PageNotFound />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
