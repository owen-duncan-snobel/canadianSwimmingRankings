import React from 'react';
import ReactTable from '../../components/reactTable/reactTable';

interface keyable {
	[key: string]: any;
}

interface Props {
	tableData: Array<keyable[]>;
}
const SwimmerTable: React.FC<Props> = ({ tableData }) => {
	let flatTableData: keyable[] = [];
	/**
	 * * Convert all meet dates into a readable strings from (Date Values in excel)
	 */
	try {
		/**
		 * * If there is multiple years for an event to compare together; Then convert the data and flatten to single array of swimmer objects
		 */
		tableData.forEach((el) => {
			el.forEach((item) => {
				/**
				 * * If the data is not changing between renders it will be converted from excel date time to date
				 * * string only on the first render. (Stops the date from attempting to convert again and breaking)
				 */
				if (Number.isInteger(item.__EMPTY_10)) {
					item.__EMPTY_10 = new Date(
						Math.floor(item.__EMPTY_10 - (25567 + 2)) * 86400 * 1000
					)
						.toDateString()
						.substring(4);
				}
			});
		});
		/**
		 * * Sort table data so that is in correct order to graph
		 */
		flatTableData = tableData
			.flat()
			.sort((a, b): any => a.__EMPTY_8 > b.__EMPTY_8);
		flatTableData.map(
			(obj: any, index: any) => (obj.__EMPTY_9 = index + 1)
		);
	} catch (error) {}

	/**
	 * * Refer to Processing Data for key names, but you filter which you want the table to display cols for
	 */
	let allowedKeys = [
		'__EMPTY_3',
		'__EMPTY_6',
		'__EMPTY_7',
		'__EMPTY_9',
		'__EMPTY_10',
		'__EMPTY_11',
		'__EMPTY_12',
	];

	return <ReactTable tableData={flatTableData} allowedKeys={allowedKeys} />;
};
export default SwimmerTable;
