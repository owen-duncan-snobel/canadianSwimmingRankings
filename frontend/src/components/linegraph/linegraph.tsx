import React from 'react';
import { Line } from 'react-chartjs-2';
import * as SwimFormulas from '../../constants/graphFunctions/graphFunctions';

interface Swimmer {
	COURSE: string;
	GENDER: Gender;
	DISTANCE: number;
	STROKE: Stroke;
	FULLNAME: string;
	BIRTHDATE: Date;
	NATION: string;
	CLUBCODE: string;
	SWIMTIME: string;
	SWIMTIME_N: number;
	PTS_FINA: number;
	PTS_RUDOLPH: number;
	PLACE: number;
	MEETDATE: Date;
	MEETCITY: string;
	MEETNAME: string;
	CLUBNAME: string;
}

enum Stroke {
	Bk = 'Bk',
	Br = 'Br',
	Bu = 'Bu',
	Fr = 'Fr',
	Me = 'Me',
}
enum Gender {
	M = 'M',
	F = 'F',
}

interface SwimmerData {
	'50m Fr': Swimmer[];
	'100m Fr': Swimmer[];
	'200m Fr': Swimmer[];
	'400m Fr': Swimmer[];
	'800m Fr': Swimmer[];
	'1500m Fr': Swimmer[];
	'50m Bk': Swimmer[];
	'100m Bk': Swimmer[];
	'200m Bk': Swimmer[];
	'50m Br': Swimmer[];
	'100m Br': Swimmer[];
	'200m Br': Swimmer[];
	'50m Bu': Swimmer[];
	'100m Bu': Swimmer[];
	'200m Bu': Swimmer[];
	'200m Me': Swimmer[];
	'400m Me': Swimmer[];
	year: number;
}

type SwimmerDataKeys = keyof Omit<SwimmerData, 'year'>;

interface Props {
	swimmerData: SwimmerData[];
	eventName: SwimmerDataKeys;
	year: string;
	clubName: string;
}

const Linegraph: React.FC<Props> = ({
	swimmerData,
	eventName,
	year,
	clubName,
}) => {
	/**
	 * * Creates the labels from 1 - 50 for the rankings of the swimmers. (Currently can only return 1-50 max from api the length may be smaller)
	 */
	const labels = Array.from({ length: 50 }, (_, i) => i + 1);

	/**
	 * * Creates a Color Array to give each line a distinct color
	 */
	const colorArray = SwimFormulas.colorArray(swimmerData.length);

	/**
	 * * For each season (compare number chosen) create the chart.js data object
	 */
	const datasets = swimmerData.map((season, index) => {
		const year = season['year'];

		/**
		 * * Get the event times for the selected season and corresponding eventName (ex. 50m Fr, 50m Bk, ...) reversed so that it graphs descending order (50-1)
		 */
		const eventTimes = season[eventName].map(
			(swimmer) => swimmer.SWIMTIME_N
		);

		const color = colorArray[index];

		return {
			label: year,
			backgroundColor: color,
			pointBackgroundColor: [color],
			borderColor: color,
			fill: false,
			data: eventTimes,
		};
	});

	/**
	 * * Array of array of athletes names (needed for the tooltips to display the names)
	 */
	const athletes = swimmerData.map((season, index) => {
		return season[eventName].map((swimmer) => swimmer.FULLNAME);
	});

	let data = {
		datasets: datasets,
		labels: labels,
	};

	let options = {
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
				/**
				 * * Tooltip callback on hover will display the swimmer name + the corresponding time as the label. (yLabel * 1000 for seconds to milliseconds)
				 */
				label: (tooltipItem: any, data: any) => {
					return (
						athletes[tooltipItem.datasetIndex][
							tooltipItem.label - 1
						] +
						' ' +
						new Date(tooltipItem.yLabel * 1000)
							.toISOString()
							.slice(14, 22)
					);
				},
			},
		},
		scales: {
			xAxes: [
				{
					/**
					 * * x-axis needs to be reversed for the descending labels (50-1)
					 */
					ticks: {
						reverse: true,
					},
				},
			],
		},
	};

	/*
	options = {

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
*/
	return (
		<div>
			<div className="font-semibold text-center p-1">
				{clubName} Rankings
			</div>
			<div>
				<Line data={data} options={options} height={500} redraw />
			</div>
		</div>
	);
};
export default Linegraph;
