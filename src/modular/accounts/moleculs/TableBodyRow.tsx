import { Link } from "react-router-dom";
import { IAccount } from "../interfaces/interfaces";


export const TableBodyRow = (props: IAccount) => {
	const { id, name, created_at } = props;
	return (
		<tr className="bg-white border-b text-center">
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{id}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{name}
			</th>
			<td className="px-md py-md">
				{created_at}
			</td>
			{/* <td className="px-md py-md">
				{created_by}
			</td> */}
			<td className="px-md py-md">
				<Link to={`/account/${id}`} state={id}><p className="text-blue-600">Más</p></Link>
			</td>
		</tr>
	)
}
