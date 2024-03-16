import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../ui/layout/Layout";
import { AccountsTable } from "../components";
import { CreateExcelButton, NavigateButton } from "../../../ui/moleculs";
import axios from "axios";
import { apiUrl } from "../../../api";
import { toast } from "react-toastify";
import { IAccount } from "../interfaces/interfaces";
import * as XLSX from 'xlsx';

export function AccountsPage() {
	const navigate = useNavigate();

	const [accounts, setAccounts] = useState<IAccount[]>([]);

	useEffect(() => {
		getAccounts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	/*
	useEffect(() => {
		if (initialDateToFilter === "" || endDateToFilter === "") return;

		//Filtrar registros por fecha
		setAccounts(
			accountsData.filter((data) =>
				moment(data.fecha).isBetween(
					moment(initialDateToFilter),
					moment(endDateToFilter)
				)
			)
		);
	}, [initialDateToFilter, endDateToFilter]);*/

	const exportarAExcel = () => {
		const wb = XLSX.utils.book_new();
		const ws = XLSX.utils.json_to_sheet(accounts);
		XLSX.utils.book_append_sheet(wb, ws, 'Datos');
		XLSX.writeFile(wb, `file.xlsx`);
	};


	const getAccounts = () => {
		axios.get(
			`${apiUrl}/accounts/`,
			{ validateStatus: (status) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 200) throw ({ ...data, status });
				setAccounts(data);
			})
			.catch(error => toast.error(error.message));
	}

	return (
		<Layout>
			<div className="w-full flex flex-col">
				<div className="flex flex-col space-y-md">
					{/* <div className="flex flex-row space-x-md justify-end items-end">
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
					</div> */}
					<div className="flex justify-end w-full">
						<div className="flex flex-col justify-end space-y-sm">
							<NavigateButton title='Nueva cuenta' onClick={() => navigate("/newAccount")} />
							{accounts.length > 0 && <CreateExcelButton onClick={() => exportarAExcel()} />}
						</div>
					</div>
					{
						accounts.length > 0 ? (
							<div className="space-y-md mt-sm">
								<p className="text-end mr-sm">Total de cuentas: <span className="text-blueLetter">{accounts.length}</span></p>
								<AccountsTable accounts={accounts} />
							</div>
						) : (
							<p className="text-red-600 text-end">
								No hay registros entre las fechas seleccionadas
							</p>
						)
					}
					{/* {initialDateToFilter !== "" && endDateToFilter !== "" ? (
						accounts.length > 0 ? (
							<div className="space-y-md mt-sm">
								<p className="text-end mr-sm">Total de cuentas: <span className="text-blueLetter">{accounts.length}</span></p>
								<AccountsTable accounts={accounts} />
							</div>
						) : (
							<p className="text-red-600 text-end">
								No hay registros entre las fechas seleccionadas
							</p>
						)
					) : (
						""
					)} */}
				</div>
			</div>
		</Layout>
	);
}
