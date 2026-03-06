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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/auth";
import { Eye, EyeClosed, Lock, LogIn, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export const SignUp = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const isPasswordValid = password.length === 0 || password.length >= 8;

	const signup = useAuthStore((state) => state.signup);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password.length < 8) {
			toast.error("A senha deve ter no mínimo 8 caracteres");
			return;
		}

		setLoading(true);

		try {
			const signupMutate = await signup({
				name,
				email,
				password,
			});
			if (signupMutate) {
				toast.success("Cadastro realizado com sucesso!");
			}
		} catch (error: unknown) {
			toast.error("Erro ao realizar o cadastro");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center min-h-150 justify-center flex-col gap-6 bg-gray-100">
			<img src={logo} className="w-64 h-22" />
			<Card className="w-full max-w-md rounded-xl bg-white border-gray-200">
				<CardHeader className="flex flex-col items-center justify-center">
					<CardTitle className="text-xl font-bold text-gray-800">
						Criar conta
					</CardTitle>
					<CardDescription className="text-gray-600">
						Comece a controlar suas finanças ainda hoje
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="text" className="text-gray-700">
								Nome Completo
							</Label>
							<div className="flex items-center border border-gray-300 rounded-md px-3">
								<UserRound className="h-4 w-4 text-muted-foreground mr-2 text-gray-400" />
								<Input
									id="name"
									placeholder="Seu nome completo"
									className="text-gray-400 border-none focus-visible:ring-0"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="email" className="text-gray-700">
								Email
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
						<div className="space-y-2">
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
							<p
								className={`text-[10px] ${isPasswordValid ? "text-gray-500" : "text-red-500"}`}
							>
								A senha deve ter no mínimo 8 caracteres
							</p>
						</div>
						<Button
							variant="brand"
							type="submit"
							className="w-full bg-brand-base text-white"
							disabled={loading}
						>
							Cadastrar
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
					<p className="text-gray-600 text-sm">Já tem uma conta ?</p>
					<Button variant="outline" className="w-full" asChild>
						<Link to="/login">
							<LogIn /> Fazer Login
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};
