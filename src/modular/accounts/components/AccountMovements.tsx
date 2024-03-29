import { useState } from "react";
import { MovementTableHeader, MovementTableRow } from "../moleculs";
import { NavigateButton } from '../../../ui/moleculs/NavigateButton';
import mas from "../../../../public/assets/icons/mas.png";
import { NewMovementForm } from "./NewMovementForm";
import { CreateExcelButton } from "../../../ui/moleculs";
import { IMovement, IMovements } from "../interfaces/interfaces";
import moment from "moment";
import { movementsFilterStore } from "../../../store/selectedYearMonthStore";
import * as XLSX from 'xlsx';

const tableHeaders = ["ID", "Referencia", "Concepto", "Cantidad", "Fecha movimiento", "Fecha creación", "Más"];

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


export const AccountMovements = (props: IMovements) => {
	const { idAccount, movements, setMonth, setYear, year, month } = props;

	const { setValue } = movementsFilterStore(state => state);
	const [newMovement, setNewMovement] = useState(false);
	const [editMovement, setEditMovement] = useState(false);
	const [selectedMovement, setSelectedMovement] = useState<IMovement>();

	const exportarAExcel = () => {
		const wb = XLSX.utils.book_new();
		const ws = XLSX.utils.json_to_sheet(movements);
		XLSX.utils.book_append_sheet(wb, ws, 'Datos');
		XLSX.writeFile(wb, `file.xlsx`);
	};


	return (
		<div className="flex flex-col my-lg space-y-sm">
			{
				(!newMovement && !editMovement) &&
				<div className="flex flex-row space-x-sm justify-end">
					{movements.length > 0 && <CreateExcelButton onClick={() => exportarAExcel()} />}
					<NavigateButton image={mas} title="Nuevo" onClick={() => setNewMovement(true)} />
				</div>
			}
			<div className="flex space-x-sm justify-end">
				<select
					className="focus:bg-white bg-gray-50 text-gray-800 text-lg rounded-md p-sm"
					defaultValue={month}
					onChange={(event) => { setMonth(+event.target.value), setValue('month', +event.target.value) }}>
					{
						months.map((month, i) => <option key={i} value={i + 1}>{month}</option>)
					}
				</select>
				<select
					className="focus:bg-white bg-gray-50 text-gray-800 text-lg rounded-md p-sm"
					defaultValue={year}
					onChange={(event) => { setYear(+event.target.value); setValue('year', +event.target.value) }}>
					<option value={2021}>2021</option>
					<option value={2022}>2022</option>
					<option value={2023}>2023</option>
					<option value={2024}>2024</option>
				</select>
			</div>
			{
				(newMovement || editMovement) ?
					newMovement ? <NewMovementForm idAccount={idAccount} setShow={setNewMovement} show={newMovement} />
						: <NewMovementForm idAccount={idAccount} setShow={setNewMovement} show={newMovement} edit movementData={selectedMovement} />
					: movements.length > 0 ? (
						<div className="w-full overflow-x-auto shadow-lg my-md">
							<p className="text-xl p-sm">Movimientos de la cuenta</p>
							<table className="w-full text-md text-left text-gray-500 rounded-xl">
								<thead className="bg-gray-50">
									<tr>
										{
											tableHeaders.map((e, i) => {
												return <MovementTableHeader key={i} title={e} />
											})
										}
									</tr>
								</thead>
								<tbody>
									{
										movements.map((mov, i) => {
											return <MovementTableRow
												key={i}
												movement={{
													id: mov.id,
													date: moment(mov.date, "DD-MM-YYYY").format("YYYY-MM-DD"),
													amount: mov.amount,
													created_at: mov.created_at,
													account: mov.account,
													reference: mov.reference,
													concept: mov.concept
												}}
												setSelectedMovement={setSelectedMovement}
												setEditMovement={setEditMovement}
												setNewMovement={setNewMovement}
											/>
										})
									}
								</tbody>
							</table>
						</div>
					) : <p className="mt-lg text">No hay movimientos con los filtros seleccionados</p>
			}
		</div>
	)
}
