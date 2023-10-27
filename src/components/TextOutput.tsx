import { useContext, useEffect, useState } from "react";
import "./TextOutput.css";
import { OutputContext } from "./OutputProvider";

function* textStep(target: string) {
	// console.log("line target: ", target);
	for (let i = 0; i < target.length; i++) {
		yield target.slice(0, i + 1);
	}
}

const typeInterval = 20;

export default function TextOutput() {
	const output = useContext(OutputContext);
	const [screenContent, setScreenContent] = useState<string[]>([]);
	// const maxLines = props.maxLines ?? 10;

	useEffect(() => {
		const content = output.value;
		if (content.length === 0) return;

		output.setWriting(true);
		const step = textStep(content[content.length - 1]);
		const applyStep = () => {
			const nextContent = step.next();
			if (nextContent.done) {
				output.setWriting(false);
				return;
			}
			setScreenContent((displayedContent) => {
				if (displayedContent.length < content.length) displayedContent.push("");
				displayedContent[displayedContent.length - 1] = nextContent.value;
				return [...displayedContent];
			});
			setTimeout(applyStep, typeInterval);
		};
		setTimeout(applyStep, typeInterval);
	}, [output.value]);

	return (
		<div
			className={`overflow-y-auto text-output w-full h-full bg-black rounded-lg px-3 py-3 ${
				output.writing ? "animate-none" : ""
			}`}
		>
			{screenContent.map((line, i) => (
				<code key={i}>{line}</code>
			))}
			{!output.writing ? <code></code> : null}
		</div>
	);
}
