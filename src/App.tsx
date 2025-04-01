import "./App.css";
import { BrowserRouter } from "react-router";
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

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<div className="container mx-auto px-4 py-8">
					<Header />
					<GridBuilder />
					<Footer />
				</div>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
