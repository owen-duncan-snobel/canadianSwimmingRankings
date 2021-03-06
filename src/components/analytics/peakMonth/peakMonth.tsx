import React from 'react';
import * as SwimFormulas from '../../../constants/graphFunctions/graphFunctions';
import { Bar } from 'react-chartjs-2';
import ReactTable from '../../../components/reactTable/reactTable';
import { MONTH_NAMES } from '../../../constants/swimmingConstants/swimmingConstants';
//import PropTypes from 'prop-types';

/**
 * Peak Month is responsible for handling the logic and displaying the graph that either,
 * Shows for a specific event the months over the year where best times were swam, or over all events the subcomponents of months over the year. 
 * @component
 * @example
 * const swimmerData = [
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "**********",
    "__EMPTY_4": 37370,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "23.54",
    "__EMPTY_8": 23.54,
    "FINA 2019": 637,
    "__EMPTY_9": 1,
    "__EMPTY_10": 43813,
    "__EMPTY_11": "Toronto",
    "__EMPTY_12": "Ontario Junior International",
    "__EMPTY_13": "Oakville Aquatic Club"
  },
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "**********",
    "__EMPTY_4": 37277,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "24.31",
    "__EMPTY_8": 24.31,
    "FINA 2019": 578,
    "__EMPTY_9": 2,
    "__EMPTY_10": 43792,
    "__EMPTY_11": "London",
    "__EMPTY_12": "LAC - Nothers Fall Invitational",
    "__EMPTY_13": "Oakville Aquatic Club"
  }
];
    * const allSwimmerData = [
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "**********",
    "__EMPTY_4": 37370,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "23.54",
    "__EMPTY_8": 23.54,
    "FINA 2019": 637,
    "__EMPTY_9": 1,
    "__EMPTY_10": 43813,
    "__EMPTY_11": "Toronto",
    "__EMPTY_12": "Ontario Junior International",
    "__EMPTY_13": "Oakville Aquatic Club"
  },
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "**********",
    "__EMPTY_4": 37277,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "24.31",
    "__EMPTY_8": 24.31,
    "FINA 2019": 578,
    "__EMPTY_9": 2,
    "__EMPTY_10": 43792,
    "__EMPTY_11": "London",
    "__EMPTY_12": "LAC - Nothers Fall Invitational",
    "__EMPTY_13": "Oakville Aquatic Club"
  },
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "**********",
    "__EMPTY_4": 37370,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "23.54",
    "__EMPTY_8": 23.54,
    "FINA 2019": 637,
    "__EMPTY_9": 1,
    "__EMPTY_10": 43813,
    "__EMPTY_11": "Toronto",
    "__EMPTY_12": "Ontario Junior International",
    "__EMPTY_13": "Oakville Aquatic Club"
  },
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "**********",
    "__EMPTY_4": 37277,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "24.31",
    "__EMPTY_8": 24.31,
    "FINA 2019": 578,
    "__EMPTY_9": 2,
    "__EMPTY_10": 43792,
    "__EMPTY_11": "London",
    "__EMPTY_12": "LAC - Nothers Fall Invitational",
    "__EMPTY_13": "Oakville Aquatic Club"
  },
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "**********",
    "__EMPTY_4": 37370,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "23.54",
    "__EMPTY_8": 23.54,
    "FINA 2019": 637,
    "__EMPTY_9": 1,
    "__EMPTY_10": 43813,
    "__EMPTY_11": "Toronto",
    "__EMPTY_12": "Ontario Junior International",
    "__EMPTY_13": "Oakville Aquatic Club"
  },
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "**********",
    "__EMPTY_4": 37277,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "24.31",
    "__EMPTY_8": 24.31,
    "FINA 2019": 578,
    "__EMPTY_9": 2,
    "__EMPTY_10": 43792,
    "__EMPTY_11": "London",
    "__EMPTY_12": "LAC - Nothers Fall Invitational",
    "__EMPTY_13": "Oakville Aquatic Club"
  }
]
    * const allSwimmerDataSub = [[
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "**********",
    "__EMPTY_4": 37370,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "23.54",
    "__EMPTY_8": 23.54,
    "FINA 2019": 637,
    "__EMPTY_9": 1,
    "__EMPTY_10": 43813,
    "__EMPTY_11": "Toronto",
    "__EMPTY_12": "Ontario Junior International",
    "__EMPTY_13": "Oakville Aquatic Club"
  },
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "**********",
    "__EMPTY_4": 37277,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "24.31",
    "__EMPTY_8": 24.31,
    "FINA 2019": 578,
    "__EMPTY_9": 2,
    "__EMPTY_10": 43792,
    "__EMPTY_11": "London",
    "__EMPTY_12": "LAC - Nothers Fall Invitational",
    "__EMPTY_13": "Oakville Aquatic Club"
  }
],
[
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "**********",
    "__EMPTY_4": 37370,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "23.54",
    "__EMPTY_8": 23.54,
    "FINA 2019": 637,
    "__EMPTY_9": 1,
    "__EMPTY_10": 43813,
    "__EMPTY_11": "Toronto",
    "__EMPTY_12": "Ontario Junior International",
    "__EMPTY_13": "Oakville Aquatic Club"
  },
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "**********",
    "__EMPTY_4": 37277,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "24.31",
    "__EMPTY_8": 24.31,
    "FINA 2019": 578,
    "__EMPTY_9": 2,
    "__EMPTY_10": 43792,
    "__EMPTY_11": "London",
    "__EMPTY_12": "LAC - Nothers Fall Invitational",
    "__EMPTY_13": "Oakville Aquatic Club"
  }
],
[
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "**********",
    "__EMPTY_4": 37370,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "23.54",
    "__EMPTY_8": 23.54,
    "FINA 2019": 637,
    "__EMPTY_9": 1,
    "__EMPTY_10": 43813,
    "__EMPTY_11": "Toronto",
    "__EMPTY_12": "Ontario Junior International",
    "__EMPTY_13": "Oakville Aquatic Club"
  },
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "**********",
    "__EMPTY_4": 37277,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "24.31",
    "__EMPTY_8": 24.31,
    "FINA 2019": 578,
    "__EMPTY_9": 2,
    "__EMPTY_10": 43792,
    "__EMPTY_11": "London",
    "__EMPTY_12": "LAC - Nothers Fall Invitational",
    "__EMPTY_13": "Oakville Aquatic Club"
  }]
]

 * const event = '50m Fr';
 * return (
 *  <PeakMonth swimmerData={swimmerData} allSwimmerData={allSwimmerData} allSwimmerDataSubComponents={allSwimmerDataSub} event={event} />
 * )
 */

interface keyable {
	[key: string]: any;
}

interface Props {
	swimmerData: Array<keyable>;
	allSwimmerData: Array<keyable>;
	allSwimmerDataSubComponents: Array<Array<keyable>>;
	eventName: string;
}

const PeakMonth: React.FC<Props> = ({
	swimmerData,
	allSwimmerData,
	allSwimmerDataSubComponents,
	eventName,
}) => {
	let months: number[] = [];
	let numSwimmers: number;
	let monthsPercent: number[] = [];
	let colorArray: string[] = [];
	let allEvents: Object = {};
	let event: Object = {};
	let eventOptions: Object = {};
	let allEventsOptions: Object = {};

	if (!allSwimmerDataSubComponents.length) {
		try {
			months = SwimFormulas.peakDistribution(swimmerData);
			numSwimmers = months.reduce((a, b) => a + b);
			monthsPercent = [...months].map((el) =>
				Math.floor((el / numSwimmers) * 100)
			);

			// * Data that will be passed to the Linegraph Component
			event = {
				labels: MONTH_NAMES,
				datasets: [
					{
						label: eventName,
						backgroundColor: 'rgb(255, 99, 132)',
						pointBackgroundColor: ['rgb(255, 99, 132)'],
						borderColor: 'rgb(255, 99, 132)',
						fill: true,
						data: months,
						yAxisID: 'left-y-axis',
					},
					{
						data: monthsPercent,
						label: '% Occurrence',
						backgroundColor: 'rgb(0,170,216)',
						yAxisID: 'right-y-axis',
					},
				],
			};
		} catch (e) {
			console.log('Error: ' + e);
		}
	} else {
		try {
			// * Hard Coding of the events needed in order to stack the bars and events appropriately and match to a color
			let fiftyFr = SwimFormulas.peakDistribution(
				allSwimmerDataSubComponents[0]
			);
			let oneHundredFr = SwimFormulas.peakDistribution(
				allSwimmerDataSubComponents[1]
			);
			let twoHundredFr = SwimFormulas.peakDistribution(
				allSwimmerDataSubComponents[2]
			);
			let fourHundredFr = SwimFormulas.peakDistribution(
				allSwimmerDataSubComponents[3]
			);
			let eightHundredFr = SwimFormulas.peakDistribution(
				allSwimmerDataSubComponents[4]
			);
			let fifteenHundredFr = SwimFormulas.peakDistribution(
				allSwimmerDataSubComponents[5]
			);
			let fiftyBk = SwimFormulas.peakDistribution(
				allSwimmerDataSubComponents[6]
			);
			let oneHundredBk = SwimFormulas.peakDistribution(
				allSwimmerDataSubComponents[7]
			);
			let twoHundredBk = SwimFormulas.peakDistribution(
				allSwimmerDataSubComponents[8]
			);
			let fiftyBr = SwimFormulas.peakDistribution(
				allSwimmerDataSubComponents[9]
			);
			let oneHundredBr = SwimFormulas.peakDistribution(
				allSwimmerDataSubComponents[10]
			);
			let twoHundredBr = SwimFormulas.peakDistribution(
				allSwimmerDataSubComponents[11]
			);
			let fiftyBu = SwimFormulas.peakDistribution(
				allSwimmerDataSubComponents[12]
			);
			let oneHundredBu = SwimFormulas.peakDistribution(
				allSwimmerDataSubComponents[13]
			);
			let twoHundredBu = SwimFormulas.peakDistribution(
				allSwimmerDataSubComponents[14]
			);
			let oneHundredMe = SwimFormulas.peakDistribution(
				allSwimmerDataSubComponents[15]
			);
			let twoHundredMe = SwimFormulas.peakDistribution(
				allSwimmerDataSubComponents[16]
			);
			let fourHundredMe = SwimFormulas.peakDistribution(
				allSwimmerDataSubComponents[17]
			);

			// * Creates The Colors for the PieChart depending on how many distinct meets there are
			colorArray = SwimFormulas.colorArray(18);
			allEvents = {
				labels: [
					'September',
					'October',
					'November',
					'December',
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
				],
				datasets: [
					{
						stack: '2',
						label: '50 Fr',
						backgroundColor: colorArray[0],
						pointBackgroundColor: ['rgb(255, 99, 132)'],
						borderColor: 'rgb(255, 99, 132)',
						fill: true,
						data: fiftyFr,
					},
					{
						stack: '2',
						label: '100 Fr',
						backgroundColor: colorArray[1],
						pointBackgroundColor: ['rgb(255, 99, 132)'],
						borderColor: 'rgb(255, 99, 132)',
						fill: true,
						data: oneHundredFr,
					},
					{
						stack: '2',
						label: '200 Fr',
						backgroundColor: colorArray[2],
						pointBackgroundColor: ['rgb(255, 99, 132)'],
						borderColor: 'rgb(255, 99, 132)',
						fill: true,
						data: twoHundredFr,
					},
					{
						stack: '2',
						label: '400 Fr',
						backgroundColor: colorArray[3],
						pointBackgroundColor: ['rgb(255, 99, 132)'],
						borderColor: 'rgb(255, 99, 132)',
						fill: true,
						data: fourHundredFr,
					},
					{
						stack: '2',
						label: '800 Fr',
						backgroundColor: colorArray[4],
						pointBackgroundColor: ['rgb(255, 99, 132)'],
						borderColor: 'rgb(255, 99, 132)',
						fill: true,
						data: eightHundredFr,
					},
					{
						stack: '2',
						label: '1500 Fr',
						backgroundColor: colorArray[5],
						pointBackgroundColor: ['rgb(255, 99, 132)'],
						borderColor: 'rgb(255, 99, 132)',
						fill: true,
						data: fifteenHundredFr,
					},
					{
						stack: '2',
						label: '50 Bk',
						backgroundColor: colorArray[6],
						pointBackgroundColor: ['rgb(255, 99, 132)'],
						borderColor: 'rgb(255, 99, 132)',
						fill: true,
						data: fiftyBk,
					},

					{
						stack: '2',
						label: '100 Bk',
						backgroundColor: colorArray[7],
						pointBackgroundColor: ['rgb(255, 99, 132)'],
						borderColor: 'rgb(255, 99, 132)',
						fill: true,
						data: oneHundredBk,
					},
					{
						stack: '2',
						label: '200 Bk',
						backgroundColor: colorArray[8],
						pointBackgroundColor: ['rgb(255, 99, 132)'],
						borderColor: 'rgb(255, 99, 132)',
						fill: true,
						data: twoHundredBk,
					},

					{
						stack: '2',
						label: '50 Br',
						backgroundColor: colorArray[9],
						pointBackgroundColor: ['rgb(255, 99, 132)'],
						borderColor: 'rgb(255, 99, 132)',
						fill: true,
						data: fiftyBr,
					},
					{
						stack: '2',
						label: '100 Br',
						backgroundColor: colorArray[10],
						pointBackgroundColor: ['rgb(255, 99, 132)'],
						borderColor: 'rgb(255, 99, 132)',
						fill: true,
						data: oneHundredBr,
					},
					{
						stack: '2',
						label: '200 Br',
						backgroundColor: colorArray[11],
						pointBackgroundColor: ['rgb(255, 99, 132)'],
						borderColor: 'rgb(255, 99, 132)',
						fill: true,
						data: twoHundredBr,
					},
					{
						stack: '2',
						label: '50 Bu',
						backgroundColor: colorArray[12],
						pointBackgroundColor: ['rgb(255, 99, 132)'],
						borderColor: 'rgb(255, 99, 132)',
						fill: true,
						data: fiftyBu,
					},

					{
						stack: '2',
						label: '100 Bu',
						backgroundColor: colorArray[13],
						pointBackgroundColor: ['rgb(255, 99, 132)'],
						borderColor: 'rgb(255, 99, 132)',
						fill: true,
						data: oneHundredBu,
					},

					{
						stack: '2',
						label: '200 Bu',
						backgroundColor: colorArray[16],
						pointBackgroundColor: ['rgb(255, 99, 132)'],
						borderColor: 'rgb(255, 99, 132)',
						fill: true,
						data: twoHundredBu,
					},

					{
						stack: '2',
						label: '100 Me',
						backgroundColor: colorArray[14],
						pointBackgroundColor: ['rgb(255, 99, 132)'],
						borderColor: 'rgb(255, 99, 132)',
						fill: true,
						data: oneHundredMe,
					},

					{
						stack: '2',
						label: '200 Me',
						backgroundColor: colorArray[15],
						pointBackgroundColor: ['rgb(255, 99, 132)'],
						borderColor: 'rgb(255, 99, 132)',
						fill: true,
						data: twoHundredMe,
					},

					{
						stack: '2',
						label: '400 Me',
						backgroundColor: colorArray[16],
						pointBackgroundColor: ['rgb(255, 99, 132)'],
						borderColor: 'rgb(255, 99, 132)',
						fill: true,
						data: fourHundredMe,
					},
				],
			};
		} catch (error) {
			console.log('Error: ' + error + ' unable data graph data');
		}
	}
	/**
	 * * Options for the selected events graph
	 */
	eventOptions = {
		tooltips: {
			callbacks: {
				/**
				 *  * Updates the Tooltips (Graph Points) with the Name,Time
				 */
				label: (tooltipItem: any, d: any) => {
					let labelArr = [];
					if (tooltipItem.datasetIndex === 1) {
						labelArr.push(monthPercent[tooltipItem.index] + '%');
					} else {
						labelArr.push(
							'PLACE         SWIMMER                  TIME'
						);
						/**
						 * * Label Array is used to create multiple labels inside of data element in graph.
						 */
						/**
						 * * Index needs to be shifted to match the correct data. TODO Need to see if I can standardize data and index
						 */
						let index = tooltipItem.index + 8;
						if (index > 11) {
							index -= 12;
						}
						/**
						 * * Converts Excel data to usable date then filters if it matches the correct month
						 */
						let swimmers = swimmerData
							.filter((el) => {
								//prettier-ignore
								let converted:number = Math.floor(el.__EMPTY_10 - (25567 + 2)) * 86400 * 1000;
								return new Date(converted).getMonth() === index;
							})
							.sort();

						swimmers.map((el) => {
							/**
							 * * Needed to align the strings for the hover on graph
							 */
							el.__EMPTY_9 = el.__EMPTY_9
								.toString()
								.padEnd(15, ' ');

							el.__EMPTY_3 = el.__EMPTY_3
								.split(', ')
								.map(
									(el: any) =>
										el.charAt(0).toUpperCase() +
										el.slice(1).toLowerCase()
								)
								.join(', ')
								.toString()
								.padEnd(25, ' ');

							el.__EMPTY_7 = el.__EMPTY_7
								.toString()
								.padEnd(15, ' ');
							return el;
						});
						// prettier-ignore
						swimmers.forEach((el) =>
							labelArr.push(
								el.__EMPTY_9 +
								el.__EMPTY_3 +
								el.__EMPTY_7 +
								new Date(Math.floor(el.__EMPTY_10 - (25567 + 2)) * 86400 *1000).toDateString().substring(4)
							)
						);
					}
					return labelArr;
				},
				bodyFontSize: 10,
			},
		},
		scales: {
			yAxes: [
				{
					id: 'left-y-axis',
					type: 'linear',
					position: 'left',
					scaleLabel: {
						display: true,
						labelString: 'Number Of Occurences',
					},
				},
				{
					ticks: {
						// Include a dollar sign in the ticks
						callback: function (
							value: any,
							index: any,
							values: any
						) {
							return value + '%';
						},
						maxTicksLimit: 100,
					},
					id: 'right-y-axis',
					type: 'linear',
					position: 'right',
					scaleLabel: {
						display: true,
						labelString: 'Percentage Of Occurences',
					},
				},
			],
		},
	};
	// * Options for the all events graph
	allEventsOptions = {
		legend: {
			display: false,
		},
		scales: {
			xAxes: [
				{
					stacked: true,
				},
			],
			yAxes: [
				{
					stacked: true,
				},
			],
		},
	};

	// * If a specific event was selected it will only return the specific month distribution
	// * Otherwise it returns all events on as a bargraph with the subcomponents
	let selectedEvents;

	// * Creates the arrays that allow the React table for the distributions
	let meetKeys = ['__EMPTY_10', '__EMPTY_14', '__EMPTY_18'];
	let monthName = [...MONTH_NAMES];
	let monthNum = [...months];
	let monthPercent = [...monthsPercent];
	let monthTable: keyable[] = [];

	months.forEach((month, index) =>
		monthTable.push(
			Object({
				__EMPTY_10: monthName[index],
				__EMPTY_14: monthNum[index],
				__EMPTY_18: monthPercent[index],
			})
		)
	);
	monthTable = monthTable.filter((el) => el.__EMPTY_14 !== 0);

	if (
		allSwimmerDataSubComponents === undefined ||
		allSwimmerDataSubComponents.length === 0
	) {
		selectedEvents = (
			<div className="justify-content-md-center">
				<div className="mt-1">
					<div>
						<span className="text-center text-md">
							{eventName + ': Month of Best Time'}
						</span>
					</div>
					<Bar data={event} options={eventOptions} redraw />
				</div>
				<div>
					<ReactTable tableData={monthTable} allowedKeys={meetKeys} />
				</div>
			</div>
		);
	} else {
		selectedEvents = (
			<div className="justify-content-md-center">
				<div className="">
					<div>
						<p className="text-center text-md">
							{'All Events: (For selected age group and gender)'}
						</p>
					</div>
					<Bar data={allEvents} options={allEventsOptions} />
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="mt-1">
				<div className="text-center">
					<p className="formTitle text-2xl font-semibold">
						Distribution Of Best Times Over the Year
					</p>
				</div>
				{selectedEvents}
			</div>
		</div>
	);
};
export default PeakMonth;
