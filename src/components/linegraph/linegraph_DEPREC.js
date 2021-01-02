import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import * as SwimFormulas from '../../constants/graphFunctions/graphFunctions';

// *   The dashboard is responsible for housing the Chart and styling for the chart
// *   it also will pass the chart back to the main app.

class Linegraph extends Component {
	render() {
		let data;
		let athletes = [];
		let rank = [];
		let colorArray = [];
		let maxLength;
		let options;

		// * Since Swim Times can Range from under a minute up to 20 mins we will standardize the times to all have the same length
		// * In the following format MM:SS:ss
		const standardize_times = (time) => {
			try {
				// * Ensures that all time strings given are in an appropriate ISO String format
				if (time.length === 5) time = '00:' + time;
				if (time.length === 7) time = '0' + time;
				let milli =
					parseInt(time.split(':')[0] * 60000) +
					parseInt(time.split(':')[1].split('.')[0] * 1000) +
					parseInt(time.split('.')[1]) * 10;
				return milli;
			} catch (e) {
				console.log('Error:' + e);
			}
		};

		// * If no data has been passed down from the form or invalid display empty form
		if (this.props.swimmerData == null) {
			return <div name="DashboardforChart"> </div>;
		} else {
			// * Datasets will hold all the datasets which will be passed to the linegraph component. (aka. Each line and its options / data)
			let datasets = [];
			let swimmerData = this.props.swimmerData;
			// * Creates a Color Array to give each line a distinct color
			colorArray = SwimFormulas.colorArray(swimmerData.length);

			// * For each distinct (year/event) item in array, converts it into the line data to be graphed
			swimmerData.forEach((dataset, index) => {
				// * Creates Athletes and Rank arrays that will be used for the callback tick displays for each Line on the graph (Name, place, time)
				athletes.push(dataset.map((athlete) => athlete.__EMPTY_3));
				rank.push(dataset.map((rank) => rank.__EMPTY_9).reverse());

				let times = dataset
					.map((time) => standardize_times(time.__EMPTY_7))
					.reverse();
				// * Pop off the color array to give the color to the line and prevent overlapping colors
				let color = colorArray.pop();
				let datayear = this.props.year
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

			// * Finds the length of the largest element in the array, to use for the label length
			maxLength = Math.max.apply(
				Math,
				rank.map((el) => el.length)
			);
			// * Fill arrays less then with empty values so that it graphs from 1 - ... correctly. Otherwise data is offset from x-axis
			datasets.forEach(function (el) {
				while (el.data.length < maxLength) {
					el.data.unshift(null);
				}
				return data;
			});
			// * Data that will be passed to the Linegraph Component
			data = {
				// * Ensures that the labels along x-axis match the longest dataset length, so that all points are graphed successfully
				labels: Array.from(Array(maxLength), (_, i) => i + 1).reverse(),
				datasets: datasets,
			};

			options = {
				title: {
					display: true,
					text: this.props.eventName,
				},
				responsive: true,
				maintainAspectRatio: false,
				animation: {
					duration: 0, // general animation time
				},
				tooltips: {
					callbacks: {
						// * Updates the Tooltips (Graph Points) with the Name,Time
						label: (tooltipItem, data) => {
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
								callback: function (v) {
									//* Responsible for the time graphing for the y-axis (converts ms to a readable format)
									return new Date(v)
										.toISOString()
										.substr(14, 8);
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
		}

		return (
			<div className="colBorder">
				<div className="App mt-1 formTitle">
					{this.props.clubName} Rankings
				</div>
				<div name="DashboardforChart">
					<Line data={data} options={options} height={500} redraw />
				</div>
			</div>
		);
	}
}
export default Linegraph;
