import { BrowserRouter } from "react-router";
import { GridBuilder } from "./components/GridBuilder";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
	return (
		<BrowserRouter>
			<div className="container mx-auto px-4 py-8">
				<Header />
				<GridBuilder />
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
