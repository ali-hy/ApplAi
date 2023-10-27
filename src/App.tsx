import "./App.css";
import OutputProvider from "./components/OutputProvider";
import TextOutput from "./components/TextOutput";
import SalaryClassifierForm from "./forms/SalaryClassifierForm";

function App() {
	return (
		<>
			<div className="screen">
				<h1 className=" font-bold ">Applai</h1>
				<h2>Salary Classifier</h2>
				<div className="flex max-h-[80vh] flex-col md:flex-row w-full gap-2">
					<OutputProvider>
						<div className="w-full order-2 md:order-none">
							<SalaryClassifierForm />
						</div>
						<div className="w-full order-1 md:order-none">
							<TextOutput />
						</div>
					</OutputProvider>
				</div>
			</div>
		</>
	);
}

export default App;
