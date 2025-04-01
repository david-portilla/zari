import { BrowserRouter, Navigate, useSearchParams } from "react-router";
import { GridBuilder } from "./components/GridBuilder";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // default: true
			staleTime: 5 * 60 * 1000, // 5 minutes
			retry: 1, // retry failed queries once
		},
	},
});

/**
 * Component that handles default URL parameters by redirecting if needed
 */
function AppContent() {
	const [searchParams] = useSearchParams();
	const productIdsParam = searchParams.get("productIds");

	// If no parameters are present, redirect to the default URL
	if (!productIdsParam) {
		return (
			<Navigate
				to="/?productIds=prod_001,prod_002,prod_003,prod_004&rows=3"
				replace
			/>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Header />
			<GridBuilder />
			<Footer />
		</div>
	);
}

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AppContent />
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
