import logo from "@/assets/logo.svg";
import { useAuthStore } from "@/stores/auth";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

export const Header = () => {
	const user = useAuthStore((state) => state.user);
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	return (
		<div className="w-full px-8 py-4 bg-white border-b border-gray-200">
			{isAuthenticated && (
				<div className="relative flex items-center w-full">
					<div className="min-w-48">
						<img src={logo} />
					</div>
					<div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
						<NavLink to="/">
							{({ isActive }) => (
								<Button
									className={`gap-2 cursor-pointer ${
										isActive
											? "bg-white text-brand-base font-semibold"
											: "text-gray-400"
									}`}
								>
									Dashboard
								</Button>
							)}
						</NavLink>

						<NavLink to="/transactions">
							{({ isActive }) => (
								<Button
									className={`gap-2 cursor-pointer ${
										isActive
											? "bg-white text-brand-base font-semibold"
											: "text-gray-400"
									}`}
								>
									Transações
								</Button>
							)}
						</NavLink>

						<NavLink to="/categories">
							{({ isActive }) => (
								<Button
									className={`gap-2 cursor-pointer ${
										isActive
											? "bg-white text-brand-base font-semibold"
											: "text-gray-400"
									}`}
								>
									Categorias
								</Button>
							)}
						</NavLink>
					</div>
					<div className="ml-auto flex items-center gap-2">
						<NavLink to="/profile">
							<Avatar key={user?.name}>
								<AvatarFallback className="bg-gray-300 text-gray-800">
									{user?.name?.charAt(0)}
								</AvatarFallback>
							</Avatar>
						</NavLink>
					</div>
				</div>
			)}
		</div>
	);
};
