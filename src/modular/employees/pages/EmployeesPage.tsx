import Layout from "../../../ui/layout/Layout";
import { useNavigate } from "react-router-dom";
import { EmployeesTable } from "../components";
import { CreateExcelButton, NavigateButton } from "../../../ui/moleculs";

export const EmployeesPage = () => {
	const navigate = useNavigate();
  return (
    <Layout>
			<div className="flex flex-col space-y-md">
				<div className="flex justify-end w-full">
					<div className="flex flex-row justify-end space-x-sm">
						<CreateExcelButton onClick={() => console.log("Creando excel...")} />
						<NavigateButton title='Nuevo Empleado' onClick={() => navigate("/newEmployee")} />
					</div>
				</div>
        <EmployeesTable />
      </div>
    </Layout>
  );
};
