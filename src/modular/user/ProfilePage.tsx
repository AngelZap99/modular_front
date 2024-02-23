import React from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../store/userStore";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Layout from "../../ui/layout/Layout";
import { apiUrl } from "../../api";
import { FormField, inputType } from "../users/moleculs/FormField";
import { ToastContainer, toast } from "react-toastify";
import { validateUserFields } from "./helpers/validateUserFields";
import { CancelButton, ChangePasswordButton, EditButton, NavigateButton, SaveButton } from "../../ui/moleculs";


export const ProfilePage = () => {
	const { id, name, email, rol } = userStore((state) => state);
	const token = userStore((state) => state.token);
	const navigate = useNavigate();
	const setValue = userStore((state) => state.setValue);

	const [newName, setNewName] = useState(name);
	const [newEmail, setNewEmail] = useState(email);
	const [role, setRole] = useState(rol);
	const [newPassword, setNewPassword] = useState("");
	const [rePassword, setrePassword] = useState("");
	const [isDisabled, setIsDisabled] = useState(true);
	const [changePassword, setChangePassword] = useState(false);


	const handleReset = () => {
		setNewName(name);
		setNewEmail(email);
		setRole(rol);
		setrePassword("");
		setNewPassword("");
		setIsDisabled(true);
		setChangePassword(false);
	};

	const updateUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		const errors = validateUserFields(newName!, newEmail!, role!, changePassword, newPassword, rePassword);


    if (errors.length > 0) {
      errors.map((error) => toast.error(error));

      return;
    }

		const data = JSON.stringify({
			nickname: newName ? newName : undefined,
			email: newEmail ? newEmail : undefined,
			password: newPassword ? rePassword : undefined,
			role: role,
		});

		const config = {
			method: "patch",
			url: `${apiUrl}/users/update/${id}/`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			data: data,
		};

		try {
			const { status } = await axios.request(config);
			if (status == 200) {
				toast.success("SUCCESS");
				setValue("email", newEmail!);
				setValue("name", newName!);
				setValue("rol", role!);
			}
		} catch (error: any) {
			if (error.message == "Request failed with status code 400") {
				toast.warn("WARN");
			} else {
				toast.error("ERROR");
			}
		}
	};

	return (
		<Layout>
			<form className="w-9/12 mt-sm">
				<h3 className="text-headerTitle mb-xl">Información de tu cuenta</h3>
				<div className="flex flex-row -mx-sm mb-md">
					<FormField
						label="Nombre"
						value={newName!}
						placeholder={name!}
						onChange={setNewName}
						type={inputType.text}
						disabled={isDisabled}
					/>
					<FormField
						label="Correo"
						value={newEmail!}
						placeholder={email!}
						onChange={setNewEmail}
						type={inputType.email}
						disabled={isDisabled}
					/>
				</div>

				{changePassword && (
					<div className="flex flex-row -mx-sm mb-md">
						<FormField
							label="Contraseña nueva"
							value={newPassword}
							placeholder=""
							onChange={setNewPassword}
							disabled={isDisabled}
							type={inputType.password}
						/>
						<FormField
							label="Repetir contraseña"
							value={rePassword}
							placeholder=""
							onChange={setrePassword}
							type={inputType.password}
							disabled={isDisabled}
						/>
					</div>
				)}
				<div className="flex flex-row -mx-sm mb-md">
					<div className="flex flex-col items-start px-sm w-1/2 mb-sm md:mb-0">
						<label className="block mb-sm text-xl capitalize text-gray-900">
							Rol de usuario
						</label>
						<select
							disabled={isDisabled}
							onChange={({ target }) => setRole(target.value)}
							value={role!}
							className="focus:bg-white bg-gray-50 text-gray-800 text-lg rounded-md block w-full p-sm"
						>
							<option value="INOPERATIVE">Inoperativo</option>
							<option value="READ">Sólo lectura</option>
							<option value="WRITE">Lectura y escritura</option>
							<option value="OVERWRITE">
								Lectura, escritura y modificar datos
							</option>
						</select>
					</div>
				</div>
				<div className="flex justify-end space-x-md py-sm">
					{
						!isDisabled && (
							changePassword ? <ChangePasswordButton onClick={() => setChangePassword(false)} title="Cancelar cambio de contraseña" />
							: <ChangePasswordButton onClick={() => setChangePassword(true)} title="Modificar contraseña" />
						)
					}
				</div>
				<div className="flex justify-end space-x-sm">
					{
						isDisabled && <NavigateButton title={"Volver"} onClick={() => navigate("/")} />
					}
					{
						!isDisabled && <CancelButton onClick={() => handleReset()} title="Cancelar" />
					}
					{
						isDisabled ? <EditButton onClick={() => setIsDisabled(false)} title={"Editar"} />
							: <SaveButton onClick={(event) => updateUser(event)} title="Guardar" />
					}
				</div>
				<div>
					<ToastContainer />
				</div>
			</form>
		</Layout>
	);
};
