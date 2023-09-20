import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/Registration and setup/register.page';
import LoginPage from './pages/Login/login.page';
import PageNotFound from './components/Page not found/pageNotFound';
import Navbar from './components/Navbar/navbar';
import HomePage from './pages/Home/home.page';
import AnalyticsPage from './pages/Analytics/analytics.page';
import DashboardPage from './pages/Dashboard/dashboard.page';
import CreateBasicShipmentPage from './pages/Create shipment/createBasicShipment';

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

				<Route element={<Navbar />}>
					<Route
						path="/home"
						element={<HomePage />}
					/>
					<Route
						path="/analytics"
						element={<AnalyticsPage />}
					/>
					<Route
						path="/dashboard"
						element={<DashboardPage />}
					/>

					<Route
						path="/create"
						element={<CreateBasicShipmentPage />}
					/>
				</Route>

				<Route
					path="*"
					element={<PageNotFound />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
