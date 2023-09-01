enum inputType {
	text,
	email,
	number,
	file,
}

interface IField {
	type: inputType,
	placeholder: string,
	label: string,
	value: string,
	onChange: (object, value: string) => void
}

export const FormField = (props: IField) => {
	const { type, placeholder, label, value, onChange: setVal } = props;
	return (
		<div className="flex flex-col items-start px-sm w-full mb-sm md:mb-0">
			<label className="block uppercase tracking-wide text-gray-900 text-lg font-bold mb-sm">{label}</label>
			<input type={type} value={value} placeholder={placeholder} onChange={({ target }) => setVal(target.value)} className="appearance-none block w-full bg-gray-50 text-gray-800 border rounded-md py-sm px-md mb-xsm leading-tight focus:outline-none focus:bg-white" />
		</div>
	)
}
