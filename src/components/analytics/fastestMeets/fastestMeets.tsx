import React from 'react';
import { Pie } from 'react-chartjs-2';
import * as SwimFormulas from '../../../constants/graphFunctions/graphFunctions';

interface keyable {
	[key: string]: any;
}

type Props = {
	swimmerData: keyable[] | null;
	eventName: string;
};
const FastestMeets: React.FC<Props> = ({ swimmerData, eventName }: Props) => {
	/**
	 * * Deep Copy of the swimmerData prop so we can mutate the object
	 */
	let meetData: keyable[] = JSON.parse(JSON.stringify(swimmerData));
	let meets;
	let meetName: string[];
	let meetNumber: number[];
	let colorArray: string[];
	let data: Object = {};
	let options: Object = {};

	if (!Array.isArray(swimmerData) || !swimmerData.length) {
		return <div></div>;
	} else {
		try {
			meets = meetData.map((meet) => meet.__EMPTY_12);
			/**
			 * * Converts the Meet Data Map into useable 'key' and 'value' arrays for graphing
			 * * Then it sorts in descending order for the graph to display.
			 */
			meets = SwimFormulas.mostOccurrences(meets)?.sort(
				(a, b) => b[1] - a[1]
			);
			meetName = meets?.map((name) => name[0])!;
			meetNumber = meets?.map((number) => number[1])!;

			/**
			 * * Creates The Colors for the PieChart depending on how many distinct meets there are
			 */
			colorArray = SwimFormulas.colorArray(meetName.length);
			data = {
				labels: meetName,
				datasets: [
					{
						data: meetNumber,
						backgroundColor: colorArray,
					},
				],
			};
			options = {
				legend: {
					display: false,
				},
			};
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div className="p-1">
			<h4 className="formTitle">Fastest Meets</h4> Based On Meet Where
			Best Times Were Swam.
			<div>
				<Pie data={data} options={options} height={150} />
			</div>
		</div>
	);
};
export default FastestMeets;
