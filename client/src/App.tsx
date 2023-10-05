import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/Registration and setup/register.page';
import LoginPage from './pages/Login/login.page';
import PageNotFound from './components/Page not found/pageNotFound';
import HomePage from './pages/Home/home.page';
import DashboardPage from './pages/Dashboard/dashboard.page';
import CreateBasicShipmentPage from './pages/Create shipment/createBasicShipment';
import CreateLTLShipmentPage from './pages/Create shipment/createLTLShipment';
import TrackingPage from './pages/Tracking/trackingPage';
import SuccessFulPayment from './components/Payment/successFulPayment';
import Layout from './components/Layout/layout';
import BlockChainTransactions from './pages/BlockChainTransactions/BlockChainTransactions';

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

				<Route element={<Layout />}>
					<Route
						path="/home"
						element={<HomePage />}
					/>

					<Route
						path="/dashboard"
						element={<DashboardPage />}
					/>

					<Route path="/create">
						<Route
							path="basic"
							element={<CreateBasicShipmentPage />}
						/>
						<Route
							path="ltl"
							element={<CreateLTLShipmentPage />}
						/>
					</Route>

					<Route
						path="/tracking"
						element={<TrackingPage />}
					/>

					<Route path='/block-chain' element={<BlockChainTransactions></BlockChainTransactions>}></Route>

					<Route
						path="/stripe/payment/success"
						element={<SuccessFulPayment />}
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
