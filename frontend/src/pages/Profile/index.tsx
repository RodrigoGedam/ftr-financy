import { Page } from "@/components/Page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { UPDATE_USER } from "@/lib/graphql/mutations/User";
import { GET_USER } from "@/lib/graphql/queries/User";
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/types";
import { useMutation, useQuery } from "@apollo/client/react";
import { LogOut, Mail, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
	const { user: authUser, logout, setUser } = useAuthStore();
	const navigate = useNavigate();

	const { data, loading } = useQuery<{ getUser: User }>(GET_USER, {
		variables: { id: authUser?.id ?? "" },
		skip: !authUser?.id,
	});

	const user = data?.getUser;

	const [name, setName] = useState("");

	useEffect(() => {
		if (user?.name) {
			setName(user.name);
		}
	}, [user]);

	type UpdateUserMutationData = {
		updateUser: User;
	};

	type UpdateUserMutationVariables = {
		updateUserId: string;
		data: {
			name?: string;
		};
	};

	const [updateUserMutation, { loading: updating }] = useMutation<
		UpdateUserMutationData,
		UpdateUserMutationVariables
	>(UPDATE_USER);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!authUser?.id) return;

		const { data } = await updateUserMutation({
			variables: {
				updateUserId: authUser.id,
				data: { name },
			},
		});

		if (data?.updateUser) {
			setUser(data.updateUser);
		}
	};

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	if (loading) return <p>Carregando...</p>;

	return (
		<Page>
			<div className="flex items-center min-h-150 justify-center flex-col gap-6 bg-gray-100">
				<Card className="w-full max-w-md rounded-xl bg-white border-gray-200">
					<CardHeader className="w-full flex flex-col items-center justify-center">
						<Avatar>
							<AvatarFallback className="bg-gray-300 text-primary-foreground text-gray-800">
								{user?.name?.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<CardTitle className="text-xl font-bold text-gray-800 pt-4">
							{user?.name}
						</CardTitle>
						<CardDescription className="text-gray-500">
							{user?.email}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Separator className="bg-gray-200 mb-4" />
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<Label htmlFor="text" className="text-gray-700">
									Nome completo
								</Label>
								<div className="flex items-center border border-gray-300 rounded-md px-3">
									<UserIcon className="h-4 w-4 text-muted-foreground mr-2 text-black" />
									<Input
										id="nome"
										placeholder={user?.name}
										onChange={(e) =>
											setName(e.target.value)
										}
										className="placeholder:text-gray-800 border-none focus-visible:ring-0"
									/>
								</div>
							</div>
							<div>
								<Label
									htmlFor="email"
									className="text-gray-700"
								>
									E-mail
								</Label>
								<div className="flex items-center border border-gray-300 rounded-md px-3 cursor-not-allowed">
									<Mail className="h-4 w-4 text-muted-foreground mr-2 focus-visible:ring-0 text-gray-500" />
									<Input
										id="email"
										type="email"
										placeholder={user?.email}
										className="text-black border-none focus-visible:ring-0"
										disabled
									/>
								</div>
								<p className="text-gray-500 text-[12px] pt-1">
									O e-mail não pode ser alterado
								</p>
							</div>
							<Button
								variant="brand"
								type="submit"
								disabled={updating}
								className="w-full py-6 font-medium text-[16px]"
							>
								{updating ? "Salvando..." : "Salvar alterações"}
							</Button>
						</form>
					</CardContent>
					<CardFooter className="w-full flex flex-col gap-3">
						<Button
							variant="outline"
							onClick={handleLogout}
							className="w-full py-6 shadow-none font-medium text-[16px]"
							asChild
						>
							<div>
								<LogOut className="text-danger" />
								Sair da conta{" "}
							</div>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</Page>
	);
};
