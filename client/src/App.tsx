import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/login.page';
import RegisterPage from './pages/Register/register.page';
import PageNotFound from './components/Page not found/pageNotFound';
import Multistep from './components/Multi stepper forms/multiStepperFormOnboarding';

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
					path="/multi"
					element={<Multistep />}></Route>

				<Route
					path="*"
					element={<PageNotFound />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
