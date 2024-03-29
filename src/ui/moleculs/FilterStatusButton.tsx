

interface IStatusButton {
	onChange: (value: boolean | null) => void,
}

export const FilterStatusButton = (props: IStatusButton) => {
	const { onChange } = props;

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value === 'true' ? true : event.target.value === 'false' ? false : null;
		onChange(value);
	};

	return (
		<select className={"flex focus:outline-none justify-center items-center space-x-sm text-buttons rounded-lg px-lg py-xsm"}
			onChange={handleSelectChange}>
			<option selected disabled value="true">Filtrar</option>
			<option value="true">Activos</option>
			<option value="false">Inactivos</option>
		</select>
	);
};