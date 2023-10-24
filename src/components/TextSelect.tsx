import { ErrorMessage, Field, useFormikContext } from "formik";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import "./TextSelect.css";

interface TextSelectProps {
	name: string;
	validate?: (values: unknown) => string[];
	className?: string;
	options?: string[];
	type?: string;
	min?: number;
	max?: number;
}

export default function TextSelect(props: TextSelectProps) {
	const formik = useFormikContext();
	const [fieldFocused, setFieldFocused] = useState<boolean>(false);
	const [options, setOptions] = useState<string[] | undefined>(undefined);
	const [currentOption, setCurrentOption] = useState<number>(0);
	const optionsListRef = useRef<null | HTMLUListElement>(null);
	const currentOptionLi = useRef<null | HTMLLIElement>(null);

	const incrementOption = () => {
		setCurrentOption((current) => {
			const next = (current + 1) % (options?.length ?? 1);
			return next;
		});
	};

	const decrementOption = () => {
		setCurrentOption((current) => {
			if (current - 1 < 0) {
				return (options?.length ?? 0) - 1;
			}
			return current - 1;
		});
	};

	useEffect(() => {
		currentOptionLi.current?.scrollIntoView();
	}, [currentOption]);

	const setValueToOption = (field: string) => {
		if (options) formik.setFieldValue(field, options[currentOption]);
	};

	const keyDownReducer =
		(field: string) => (e: SyntheticEvent<HTMLInputElement, KeyboardEvent>) => {
			console.log(e);
			switch (e.nativeEvent.key.toLowerCase()) {
				case "enter":
					console.log("doing enter stuff");
					e.preventDefault();
					console.log(
						e.nativeEvent.target?.dispatchEvent(
							new KeyboardEvent("keydown", { bubbles: true, key: "Tab" })
						)
					);
					break;
				case "tab":
					if (options) {
						console.log("doing tab stuff");
						setValueToOption(field);
					}
					break;
				case "arrowup":
					decrementOption();
					break;
				case "arrowdown":
					incrementOption();
					break;
				case "escape":
					e.currentTarget.blur();
					break;
				default:
					if (e.nativeEvent.key.length === 1) setCurrentOption(0);
			}
		};

	useEffect(() => {
		if (!props.options) return;

		const value = (formik.values as Record<string, string>)[props.name];
		setOptions(
			props.options.filter((option: string) =>
				option.toLowerCase().includes(value.toLowerCase())
			)
		);
	}, [(formik.values as Record<string, string>)[props.name]]);

	const validateType = (value: unknown) => {
		switch (props.type) {
			case "number":
				return isNaN(value as number) ? "expected a number" : undefined;
			default:
				return undefined;
		}
	};

	const validateOptions = (value: unknown) => {
		if (props.options) {
			return props.options.includes(value as string)
				? "not an available option"
				: undefined;
		}
	};

	const validate = (value: string) => {
		return (
			validateType(value) &&
			validateOptions(value) &&
			props.validate &&
			props.validate(value)
		);
	};

	const showOptions =
		fieldFocused &&
		options &&
		!options
			?.map((s) => s.toLowerCase())
			?.includes(
				(formik.values as Record<string, string>)[props.name].toLowerCase()
			);

	return (
		<div className="text-select">
			<Field
				className={"px-2 py-1 rounded-md " + props.className}
				validate={validate}
				name={props.name}
				type={props.type}
				min={props.min ?? 0}
				max={props.max}
				onKeyDown={keyDownReducer(props.name)}
				onFocus={() => {
					setFieldFocused(true);
				}}
				onBlur={() => {
					setTimeout(setFieldFocused, 200, false);
				}}
			/>
			<ErrorMessage name={props.name} />
			{showOptions && (
				<div className="options-list-container">
					<ul ref={optionsListRef} className="options-list">
						{options.map((option, i) => (
							<li
								key={option}
								className={`${currentOption == i ? "current" : ""}`}
								onClick={() => {
									formik.setFieldValue(props.name, option);
									setFieldFocused(false);
								}}
								ref={currentOption === i ? currentOptionLi : undefined}
							>
								{option}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
