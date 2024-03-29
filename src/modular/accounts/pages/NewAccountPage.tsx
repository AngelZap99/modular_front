import { useState } from "react";
import Layout from "../../../ui/layout/Layout";
import { FormField } from "../../employees-check/moleculs";
import { inputType } from "../../users/moleculs";
import { apiUrl } from "../../../api";
//import { userStore } from "../../../store/userStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavigateButton, SaveButton } from "../../../ui/moleculs";
import { ToastContainer, toast } from "react-toastify";
import back from "../../../../public/assets/icons/back.png";

export const NewAccountPage = () => {
	//const token = userStore((state) => state.token);
	const navigate = useNavigate();
	const [accountName, setAccountName] = useState("");

	const saveAccount = async ( ) => {
		if (accountName.length <= 0) {
			toast.error("Ingrese un nombre válido para la cuenta");
			return;
		} else {
			const data = {
				name: accountName,
			};

			axios.post(
				`${apiUrl}/accounts/`,
				data,
				{ validateStatus: (status: number) => status < 500 }
			)
				.then(({ data, status }) => {
					if (status != 201) throw ({ ...data, status });
					toast.success("Creado con éxito");
					setAccountName("");
				})
				.catch(error => toast.error(error.message));
		}
	};

	return (
		<Layout>
			<form className="w-9/12 mt-sm space-y-sm">
				<h3 className="text-titleSm mb-xl uppercase">Crear nueva cuenta</h3>
				<div className="flex flex-row space-x-sm">
					<FormField
						label="Nombre de la cuenta"
						value={accountName}
						placeholder={"Concepto de la cuenta"}
						onChange={setAccountName}
						type={inputType.text}
					/>
				</div>
				<div className="flex justify-end space-x-sm">
					<NavigateButton image={back} title="Volver" onClick={() => navigate("/accounts")} />
					<SaveButton title="Guardar" onClick={() => saveAccount()} />
				</div>
				<ToastContainer />
			</form>
		</Layout>
	);
};
