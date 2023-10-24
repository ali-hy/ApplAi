import "./App.css";
import SalaryClassifierForm from "./forms/SalaryClassifierForm";
import SalaryClassifierOutput from "./ouput/SalaryClassifierOutput";

function App() {
	return (
		<>
			<div className="screen">
				<h1 className=" font-bold ">Applai</h1>
				<h2>Salary Classifier</h2>
				<div className=" md:flex w-full gap-2">
					<SalaryClassifierForm />
					<SalaryClassifierOutput />
				</div>
			</div>
		</>
	);
}

export default App;
