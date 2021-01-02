import React from 'react';
import Table from 'react-bootstrap/Table';
import { JSON_ATTRIBUTES } from '../../constants/swimmingConstants/swimmingConstants';

interface keyable {
	[key: string]: any;
}
interface Props {
	tableData: keyable[];
	allowedKeys: string[];
}
const ReactTable: React.FC<Props> = ({ tableData, allowedKeys }) => {
	try {
		const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (
			key: U
		) => obj[key];

		return (
			<Table size="sm" responsive className="swimTable colBorder">
				<thead>
					<tr>
						{allowedKeys.map((key: any) => {
							return (
								<th
									key={getKeyValue(JSON_ATTRIBUTES)(key)}
									className={getKeyValue(JSON_ATTRIBUTES)(
										key
									)}
								>
									{getKeyValue(JSON_ATTRIBUTES)(key)}
								</th>
							);
						})}
					</tr>
				</thead>

				<tbody key="swimTableData" className="swimTableData">
					{tableData.map((item) => {
						return (
							<tr key={Object.entries(item).toString()}>
								{Object.entries(item)
									.filter(([key, value]) =>
										allowedKeys.includes(key)
									)
									.map(([key, value]) => {
										return (
											<td key={key + value}>{value}</td>
										);
									})}
							</tr>
						);
					})}
				</tbody>
			</Table>
		);
	} catch (error) {
		console.log(error);
	}
	return <div></div>;
};
export default ReactTable;
