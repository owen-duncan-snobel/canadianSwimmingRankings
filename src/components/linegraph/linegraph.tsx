import React from 'react';
import { Line } from 'react-chartjs-2';
import * as SwimFormulas from '../../constants/graphFunctions/graphFunctions';

interface keyable {
	[key: string]: any;
}

interface Props {
	swimmerData: keyable[][];
	eventName: string;
	year: string;
	clubName: string;
}
const Linegraph: React.FC<Props> = ({
	swimmerData,
	eventName,
	year,
	clubName,
}) => {
	let data: Object = {};
	let options: Object = {};
	let athletes: keyable[] = [];
	let rank: keyable[] = [];
	let maxLength: any;
	let swimData = JSON.parse(JSON.stringify(swimmerData));
	let colorArray: string[] = [];

	if (swimmerData === null || swimmerData.length === 0) {
		return <div></div>;
	} else {
		/**
		 * * Datasets will hold all the datasets which will be passed to the linegraph component. (aka. Each line and its options / data)
		 */
		let datasets: keyable[] = [];
		/**
		 * * Creates a Color Array to give each line a distinct color
		 */
		colorArray = SwimFormulas.colorArray(swimData.length);

		/**
		 * * For each distinct (year/event) item in array, converts it into the line data to be graphed
		 */
		swimmerData.forEach((dataset: keyable[], index: number) => {
			/**
			 * * Creates Athletes and Rank arrays that will be used for the callback tick displays for each Line on the graph (Name, place, time)
			 */
			athletes.push(dataset.map((athlete) => athlete.__EMPTY_3));
			rank.push(dataset.map((rank) => rank.__EMPTY_9).reverse());

			let times = dataset
				.map((time) => SwimFormulas.standardizeTimes(time.__EMPTY_7))
				.reverse();
			/**
			 * * Pop off the color array to give the color to the line and prevent overlapping colors
			 */
			let color = colorArray.pop();
			let datayear = year
				.split('-')
				.map((el) => parseInt(el) - index)
				.join('-');

			let el = {
				label: datayear,
				backgroundColor: color,
				pointBackgroundColor: [color],
				borderColor: color,
				fill: false,
				data: times,
			};
			datasets.push(el);
		});

		/**
		 * * Finds the length of the largest element in the array, to use for the label length
		 */
		maxLength = Math.max.apply(
			Math,
			rank.map((el) => el.length)
		);
		/**
		 * * Fill arrays less then with empty values so that it graphs from 1 - ... correctly. Otherwise data is offset from x-axis
		 */
		datasets.forEach(function (el) {
			while (el.data.length < maxLength) {
				el.data.unshift(null);
			}
			return data;
		});
		/**
		 * * Data that will be passed to the Linegraph Component
		 */
		data = {
			/**
			 * * Ensures that the labels along x-axis match the longest dataset length, so that all points are graphed successfully
			 */
			labels: Array.from(Array(maxLength), (_, i) => i + 1).reverse(),
			datasets: datasets,
		};

		options = {
			title: {
				display: true,
				text: eventName,
			},
			responsive: true,
			maintainAspectRatio: false,
			animation: {
				duration: 0, // general animation time
			},
			tooltips: {
				callbacks: {
					// * Updates the Tooltips (Graph Points) with the Name,Time
					label: (tooltipItem: any, data: any) => {
						// * Label Array is used to create multiple labels inside of data element in graph.
						let labelArr = [];
						// * Selects the athlete name from the correct dataset array
						labelArr.push(
							athletes[tooltipItem.datasetIndex][
								tooltipItem.label - 1
							] +
								' ' +
								new Date(tooltipItem.yLabel)
									.toISOString()
									.substr(14, 8)
						);
						return labelArr;
					},
				},
			},
			scales: {
				yAxes: [
					{
						scaleLabel: {
							display: true,
							labelString: 'Times (Seconds)',
						},
						ticks: {
							callback: function (v: number) {
								//* Responsible for the time graphing for the y-axis (converts ms to a readable format)
								return new Date(v).toISOString().substr(14, 8);
							},
						},
					},
				],
				xAxes: [
					{
						scaleLabel: {
							display: true,
							labelString: 'Rank',
						},
					},
				],
			},
		};

		return (
			<div className="colBorder">
				<div className="App mt-1 formTitle">{clubName} Rankings</div>
				<div>
					<Line data={data} options={options} height={500} redraw />
				</div>
			</div>
		);
	}
};
export default Linegraph;
