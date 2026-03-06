interface PageProps {
	children: React.ReactNode;
}

export function Page({ children }: PageProps) {
	return (
		<div className="min-h-[calc(100vh-9rem)] space-y-6 p-6 bg-gray-100">
			{children}
		</div>
	);
}
