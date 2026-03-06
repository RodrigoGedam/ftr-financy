import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Auth/Login";
import { SignUp } from "./pages/Auth/SignUp";
import { Categories } from "./pages/Categories";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { Transactions } from "./pages/Transactions";
import { useAuthStore } from "./stores/auth";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuthStore();
	return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuthStore();
	return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}

function App() {
	return (
		<Layout>
			<Routes>
				<Route
					path="/login"
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path="/signup"
					element={
						<PublicRoute>
							<SignUp />
						</PublicRoute>
					}
				/>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/transactions"
					element={
						<ProtectedRoute>
							<Transactions />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/categories"
					element={
						<ProtectedRoute>
							<Categories />
						</ProtectedRoute>
					}
				/>
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</Layout>
	);
}

export default App;
