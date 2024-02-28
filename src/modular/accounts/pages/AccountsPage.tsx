import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Layout from "../../../ui/layout/Layout";
import { AccountsTable } from "../components";
import { FormField } from "../../employees-check/moleculs";
import { inputType } from "../../users/moleculs";
import { accountsData } from "../data";
import { CreateExcelButton, NavigateButton } from "../../../ui/moleculs";
import { AccountsFormField } from "../moleculs/AccountsFormField";

export function AccountsPage() {
	const navigate = useNavigate();

	const [initialDateToFilter, setInitialDateToFilter] = useState("2022-01-01");
	const [endDateToFilter, setEndDateToFilter] = useState("2024-01-01");
	const [data, setData] = useState(accountsData);

	useEffect(() => {
		if (initialDateToFilter === "" || endDateToFilter === "") return;

		//Filtrar registros por fecha
		setData(
			accountsData.filter((data) =>
				moment(data.fecha).isBetween(
					moment(initialDateToFilter),
					moment(endDateToFilter)
				)
			)
		);
	}, [initialDateToFilter, endDateToFilter]);

	return (
		<Layout>
			<div className="w-full flex flex-col">
				<div className="flex flex-col space-y-md">
					<div className="flex flex-row space-x-md justify-end items-end">
						<AccountsFormField
							label="Fecha inicial"
							onChange={setInitialDateToFilter}
							type={inputType.date}
							value={initialDateToFilter}
							placeholder=""
						/>
						<AccountsFormField
							label="Fecha final"
							onChange={setEndDateToFilter}
							type={inputType.date}
							value={endDateToFilter}
							placeholder=""
						/>
					</div>
					<div className="flex justify-end w-full">
						<div className="flex flex-col justify-end space-y-sm">
							{ data.length > 0 && <CreateExcelButton onClick={() => console.log("Creando excel...")} /> }
							<NavigateButton title='Nueva cuenta' onClick={() => navigate("/newEmployee")} />
						</div>
					</div>
					{initialDateToFilter !== "" && endDateToFilter !== "" ? (
						data.length > 0 ? (
							<div className="space-y-md mt-sm">
								<p className="text-end mr-sm">Total de cuentas: <span className="text-blueLetter">{data.length}</span></p>
								<AccountsTable accountsData={data} />
							</div>
						) : (
							<p className="text-red-600 text-end">
								No hay registros entre las fechas seleccionadas
							</p>
						)
					) : (
						""
					)}
				</div>
			</div>
		</Layout>
	);
}
