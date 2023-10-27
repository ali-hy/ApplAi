import { FC, useContext } from "react";
import { Form, Formik } from "formik";
import TextSelect from "../components/TextSelect";
import {
	SalaryClassifierInput,
	salaryClassifierRequest,
} from "../api/salaryClassifier";
import { OutputContext } from "../components/OutputProvider";

const SalaryClassifierForm: FC = () => {
	const output = useContext(OutputContext);

	const onSubmit = async (values: SalaryClassifierInput) => {
		const requestBody = { ...values };
		for (const i of Object.keys(requestBody)) {
			const key = i as unknown as keyof typeof values;
			if (typeof requestBody[key] === "string")
				requestBody[key] = " " + requestBody[key];
		}

		const response = await salaryClassifierRequest(requestBody);
		const nextLine = response.data.status
			? response.data.data === 1
				? "This person has a salary over $5,000"
				: "This person's salaray is under $5,000"
			: response.data.message;
		// console.log("current output: ", output);
		const nextOutput = [...output.value, nextLine];

		output.set(nextOutput);
	};

	const options = {
		country: [
			"Cambodia",
			"Canada",
			"China",
			"Columbia",
			"Cuba",
			"Dominican-Republic",
			"Ecuador",
			"El-Salvador",
			"England",
			"France",
			"Germany",
			"Greece",
			"Guatemala",
			"Haiti",
			"Holand-Netherlands",
			"Honduras",
			"Hong",
			"Hungary",
			"India",
			"Iran",
			"Ireland",
			"Italy",
			"Jamaica",
			"Japan",
			"Laos",
			"Mexico",
			"Nicaragua",
			"Outlying-US(Guam-USVI-etc)",
			"Peru",
			"Philippines",
			"Poland",
			"Portugal",
			"Puerto-Rico",
			"Scotland",
			"South",
			"Taiwan",
			"Thailand",
			"Trinadad&Tobago",
			"United-States",
			"Vietnam",
			"Yugoslavia",
		],
		gender: ["Female", "Male"],
		workclass: [
			"Federal-gov",
			"Local-gov",
			"Private",
			"Self-emp-inc",
			"Self-emp-not-inc",
			"State-gov",
			"Without-pay",
		],
		occupation: [
			"Adm-clerical",
			"Armed-Forces",
			"Craft-repair",
			"Exec-managerial",
			"Farming-fishing",
			"Handlers-cleaners",
			"Machine-op-inspct",
			"Other-service",
			"Priv-house-serv",
			"Prof-specialty",
			"Protective-serv",
			"Sales",
			"Tech-support",
			"Transport-moving",
		],
		marital_status: [
			"Divorced",
			"Married-AF-spouse",
			"Married-civ-spouse",
			"Married-spouse-absent",
			"Never-married",
			"Separated",
			"Widowed",
		],
		relationship: [
			"Husband",
			"Not-in-family",
			"Other-relative",
			"Own-child",
			"Unmarried",
			"Wife",
		],
		race: [
			"Amer-Indian-Eskimo",
			"Asian-Pac-Islander",
			"Black",
			"Other",
			"White",
		],
	};

	return (
		<Formik
			validateOnBlur
			initialValues={{
				age: 0,
				education_num: 0,
				capital_gain: 0,
				capital_loss: 0,
				hours_per_week: "",
				country: "",
				gender: "",
				workclass: "",
				occupation: "",
				marital_status: "",
				relationship: "",
				race: "",
			}}
			onSubmit={onSubmit}
		>
			{({ isSubmitting, setSubmitting, handleSubmit }) => {
				return (
					<Form className="ai-form">
						<div className="fields-container px-1">
							<div>
								<TextSelect name="age" type="number" min={0} max={100} />
							</div>
							<div>
								<TextSelect
									name="education_num"
									type="number"
									min={0}
									max={10}
								/>
							</div>
							<div>
								<TextSelect name="capital_gain" type="number" min={0} />
							</div>
							<div>
								<TextSelect name="capital_loss" type="number" min={0} />
							</div>
							<div>
								<TextSelect
									name="hours_per_week"
									type="number"
									min={0}
									max={112}
								/>
							</div>
							<div>
								<TextSelect name="country" options={options.country} />
							</div>
							<div>
								<TextSelect name="gender" options={options.gender} />
							</div>
							<div>
								<TextSelect name="workclass" options={options.workclass} />
							</div>
							<div>
								<TextSelect name="occupation" options={options.occupation} />
							</div>
							<div>
								<TextSelect
									name="marital_status"
									options={options.marital_status}
								/>
							</div>
							<div>
								<TextSelect
									name="relationship"
									options={options.relationship}
								/>
							</div>
							<div>
								<TextSelect name="race" options={options.race} />
							</div>
						</div>
						<button
							disabled={isSubmitting || output.writing}
							className="w-full disabled:saturate-50 disabled:bg-sky-700 cursor-pointer disabled:cursor-not-allowed"
							type="submit"
							onClick={async () => {
								setSubmitting(true);
								await handleSubmit();
								setSubmitting(false);
							}}
						>
							Classify
						</button>
					</Form>
				);
			}}
		</Formik>
	);
};

export default SalaryClassifierForm;
