import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from "react";

export const OutputContext = createContext({
	value: [] as string[],
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	set: (value: string[] | ((value: string[]) => string[])) => {},
	writing: false,
	setWriting: (value: boolean | ((value: boolean) => boolean)) => {},
});

const OutputProvider: FC<PropsWithChildren> = (props) => {
	const [value, setValue] = useState<string[]>([]);
	const [writing, setWriting] = useState<boolean>(false);

	return (
		<OutputContext.Provider
			value={{ value, set: setValue, writing, setWriting }}
		>
			{props.children}
		</OutputContext.Provider>
	);
};

export default OutputProvider;
