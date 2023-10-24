import { FC } from "react";
import { Form, Formik } from "formik";
import TextSelect from "../components/TextSelect";
import {
	SalaryClassifierInput,
	salaryClassifierRequest,
} from "../api/salaryClassifier";

const SalaryClassifierForm: FC = () => {
	const onSubmit = async (values: SalaryClassifierInput) => {
		const requestBody = { ...values };
		for (const i of Object.keys(requestBody)) {
			const key = i as unknown as keyof typeof values;
			if (typeof requestBody[key] == "string")
				requestBody[key] = " " + requestBody[key];
		}

		console.log(JSON.stringify(requestBody));
		salaryClassifierRequest(requestBody).then(console.log).catch(console.error);
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
		<div className="w-full">
			<Formik
				validateOnBlur
				initialValues={{
					age: "",
					education_num: "",
					capital_gain: "",
					capital_loss: "",
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
				<Form className="ai-form">
					<div>
						<label htmlFor="age">age</label>
						<TextSelect name="age" type="number" />

						<label className="ms-10" htmlFor="education_num">
							education_num
						</label>
						<TextSelect name="education_num" type="number" />
					</div>
					<div>
						<label htmlFor="capital_gain">capital_gain</label>
						<TextSelect name="capital_gain" type="number" />

						<label className="ms-10" htmlFor="capital_loss">
							capital_loss
						</label>
						<TextSelect name="capital_loss" type="number" />
					</div>
					<div>
						<label htmlFor="hours_per_week">hours_per_week</label>
						<TextSelect name="hours_per_week" type="number" />
					</div>
					<div>
						<label htmlFor="country">country</label>
						<TextSelect name="country" options={options.country} />
					</div>
					<div>
						<label htmlFor="gender">gender</label>
						<TextSelect name="gender" options={options.gender} />
					</div>
					<div>
						<label htmlFor="workclass">workclass</label>
						<TextSelect name="workclass" options={options.workclass} />
					</div>
					<div>
						<label htmlFor="occupation">occupation</label>
						<TextSelect name="occupation" options={options.occupation} />
					</div>
					<div>
						<label htmlFor="marital_status">marital_status</label>
						<TextSelect
							name="marital_status"
							options={options.marital_status}
						/>
					</div>
					<div>
						<label htmlFor="relationship">relationship</label>
						<TextSelect name="relationship" options={options.relationship} />
					</div>
					<div>
						<label htmlFor="race">race</label>
						<TextSelect name="race" options={options.race} />
					</div>
					<button className="w-full" type="submit">
						Classify
					</button>
				</Form>
			</Formik>
		</div>
	);
};

export default SalaryClassifierForm;
