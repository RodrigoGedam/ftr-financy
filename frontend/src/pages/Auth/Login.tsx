import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/auth";
import { Eye, EyeClosed, Lock, Mail, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const login = useAuthStore((state) => state.login);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			const loginMutate = await login({
				email,
				password,
			});
			if (loginMutate) {
				toast.success("Login realizado com sucesso!");
			}
		} catch (error: unknown) {
			toast.error("Falha ao realizar o login!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col min-h-150 items-center justify-center gap-6 bg-gray-100">
			<img src={logo} className="w-32 h-11" />
			<Card className="w-full max-w-md rounded-xl bg-white border-gray-200">
				<CardHeader className="w-full flex flex-col items-center justify-center">
					<CardTitle className="text-xl font-bold text-gray-800">
						Fazer login
					</CardTitle>
					<CardDescription className="text-gray-600">
						Entre na sua conta para continuar
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<Label htmlFor="email" className="text-gray-700">
								E-mail
							</Label>
							<div className="flex items-center border border-gray-300 rounded-md px-3">
								<Mail className="h-4 w-4 text-muted-foreground mr-2 text-gray-400" />
								<Input
									id="email"
									type="email"
									placeholder="mail@exemplo.com"
									className="text-gray-400 border-none focus-visible:ring-0"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
						</div>
						<div>
							<Label htmlFor="password" className="text-gray-700">
								Senha
							</Label>
							<div className="flex items-center border border-gray-300 rounded-md px-3">
								<Lock className="h-4 w-4 text-muted-foreground mr-2 text-gray-400" />
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="Digite sua senha"
									className="text-gray-400 border-none focus-visible:ring-0"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
								/>
								<button
									type="button"
									onClick={() =>
										setShowPassword(!showPassword)
									}
									className="text-muted-foreground hover:text-foreground cursor-pointer"
								>
									{showPassword ? (
										<Eye className="h-4 w-4" />
									) : (
										<EyeClosed className="h-4 w-4" />
									)}
								</button>
							</div>
						</div>
						<div className="flex items-center justify-between text-sm">
							<div className="flex items-center space-x-2 text-gray-700">
								<Checkbox
									id="remember"
									checked={rememberMe}
									className="text-gray-300"
									onCheckedChange={(checked) =>
										setRememberMe(checked === true)
									}
								/>
								Lembrar-me
							</div>

							<Link
								to="/forgot-password"
								className="text-brand-base hover:underline"
							>
								Recuperar senha
							</Link>
						</div>
						<Button
							variant="brand"
							type="submit"
							className="w-full bg-brand-base text-white font-medium"
							disabled={loading}
						>
							Entrar
						</Button>
					</form>
				</CardContent>

				<div className="flex items-center w-full max-w-md gap-3 pb-3">
					<Separator className="flex-1 bg-gray-300" />
					<span className="text-sm text-muted-foreground text-gray-500">
						ou
					</span>
					<Separator className="flex-1 bg-gray-300" />
				</div>

				<CardFooter className="w-full flex flex-col gap-3">
					<p className="text-gray-600">Ainda não tem uma conta</p>
					<Button variant="outline" className="w-full py-3" asChild>
						<Link to="/signup">
							<UserRoundPlus />
							Criar conta{" "}
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};
