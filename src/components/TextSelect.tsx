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

	const showOptions =
		fieldFocused &&
		options &&
		!options
			?.map((s) => s.toLowerCase())
			?.includes(
				(formik.values as Record<string, string>)[props.name].toLowerCase()
			);

	const keyDownReducer =
		(field: string) => (e: SyntheticEvent<HTMLInputElement, KeyboardEvent>) => {
			switch (e.nativeEvent.key.toLowerCase()) {
				case "enter":
					e.preventDefault();
					e.nativeEvent.target?.dispatchEvent(
						new KeyboardEvent("keydown", { bubbles: true, key: "Tab" })
					);
					break;
				case "tab":
					if (showOptions) {
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
				option.toLowerCase().startsWith(value.toLowerCase())
			)
		);
	}, [(formik.values as Record<string, string>)[props.name]]);

	const validateRange = (value: unknown) => {
		if (props.type !== "number") {
			console.log("not validating range cuz not number");
			return;
		}

		const n = value as number;
		if (props.max !== undefined && n > props.max) {
			return `Out of range. (maximum = ${props.max})`;
		} else if (props.min !== undefined && n < props.min) {
			return `Out of range. (minimum = ${props.min})`;
		}
	};

	const validateOptions = (value: unknown) => {
		if (props.options) {
			return !props.options
				.map((option) => option.toLowerCase())
				.includes((value as string).toLowerCase())
				? "not an available option"
				: undefined;
		}
	};

	const validate = (value: string) => {
		const errors =
			validateRange(value) ||
			validateOptions(value) ||
			(props.validate && props.validate(value));
		// console.log("errors: ", errors);
		return errors;
	};

	return (
		<>
			<label className="py-1">{props.name}</label>
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
						formik.handleChange(props.name);
					}}
					onBlur={(e: SyntheticEvent) => {
						setTimeout(setFieldFocused, 200, false);
						formik.handleBlur(props.name)(e);
					}}
				/>
				<ErrorMessage
					className=" text-sm text-red-400"
					component={"p"}
					name={props.name}
				/>
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
		</>
	);
}
