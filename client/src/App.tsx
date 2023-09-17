import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/login.page';

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/login"
					element={<LoginPage />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
