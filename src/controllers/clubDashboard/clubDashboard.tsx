import React from 'react';
import { EVENTS } from '../../constants/swimmingConstants/swimmingConstants';
import * as SwimFormulas from '../../constants/graphFunctions/graphFunctions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactTable from '../../components/reactTable/reactTable';
import FastestMeets from '../../components/analytics/fastestMeets/fastestMeets';
import FastestCity from '../../components/analytics/fastestCity/fastestCity';
import PeakMonth from '../../components/analytics/peakMonth/peakMonth';

type allDataType = Array<Array<Array<keyable>>>;

interface keyable {
	[key: string]: any;
}

type Props = {
	swimmerData: allDataType | null;
	eventName: string;
	clubName: string;
	year: string;
};

const ClubDashboard: React.FC<Props> = ({
	swimmerData,
	eventName,
	clubName,
	year,
}) => {
	try {
		let data: Array<keyable> = [{}];
		let allSwimmerData: Array<keyable> = [{}];
		let allSwimmerDataSubComponents: Array<Array<keyable>> = [[{}]];
		const index = EVENTS.indexOf(eventName);

		/**
		 * * If the fetch returns null (error) or the data returned is null (no swimmers for the time period)
		 */
		if (swimmerData === null || !swimmerData[0][0][0].length) {
			return <div></div>;
		} else {
			/**
			 * * If a specific event is selected, it will get the Sheet with the data for that specific event.
			 * * If 'All' is selected it will get all data for every sheet and then compare
			 */
			if (eventName !== 'All') {
				swimmerData[0].forEach((workbook) => {
					/**
					 * * In every Workbook (Age / Year) it holds Sheets with the events, will select the sheet that contains the events data
					 */
					let Sheet = workbook[index];
					/**
					 * * For the selected event collect all the swimmer data
					 */
					Sheet.forEach((swimmer: any) => {
						swimmer.__EMPTY_8 = SwimFormulas.standardizeTimes(
							swimmer.__EMPTY_7
						);
						data.push(swimmer);
					});
				});
				/**
				 * * First element is undefined and empty, needs to be removed
				 */
				data.shift();

				/**
				 * * Pass it the keys that will be used as the header for the table in React Table
				 */
				let meetCityKeys = ['__EMPTY_11', '__EMPTY_14'];

				/**
				 * * Converts all the events data into the labels and data for the piechart of meet city
				 */
				let meetCity = [
					...SwimFormulas.mostOccurrences(
						SwimFormulas.meetCity(data)
					),
				].sort((a, b) => b[1] - a[1]);
				/**
				 * * Converts it into array that holds objects with properties that can be used by the ReactTable Component
				 */
				let meetCityArr: keyable[] = [];
				meetCity.forEach((city) => {
					meetCityArr.push({
						__EMPTY_11: city[0],
						__EMPTY_14: city[1],
					});
				});
				/**
				 * * Pass it the keys that will be used as the header for the table in React Table
				 */
				let meetKeys = [
					'__EMPTY_9',
					'__EMPTY_12',
					'__EMPTY_14',
					'__EMPTY_16',
					'__EMPTY_17',
				];

				/**
				 *   * Converts all events data into label for Meet data. (Meet Name and occurence of best time)
				 *   * Converts the Meet Data Map into useable 'key' and 'value' arrays for graphing
				 */
				let meets = [
					...SwimFormulas.mostOccurrences(
						SwimFormulas.meetName(data)
					),
				].sort((a, b) => b[1] - a[1]);

				let timeHash: keyable = {};
				meets.forEach((el) => (timeHash[el[0]] = el[1]));

				/**
				 * * Going to be used for the groupings to sort by multiple properties.
				 */
				for (let hash of Object.entries(timeHash)) {
					/**
					 * * Set the value for the hash that consists of an array of Objects where all the meetNames are the same
					 */
					hash[1] = data.filter(
						(item) => item.__EMPTY_12 === hash[0]
					);
					timeHash[hash[0]] = hash[1];
				}

				for (let el of Object.entries(timeHash)) {
					let length = el[1].length;
					let times = el[1].map(
						(el: { __EMPTY_8: any }): any => el.__EMPTY_8
					);

					let average =
						times.reduce((a: any, b: any) => a + b) / length;

					let stddev = times.map((t: number) =>
						Math.pow(t - average, 2)
					);
					stddev = Math.sqrt(
						stddev.reduce((a: any, b: any) => a + b) / length
					);
					timeHash[el[0]] = {
						groupMembers: el[1],
						average: average,
						stddev: stddev,
						length: length,
					};
				}

				/**
				 * * For every each swimmer object sort by average and stddev for a general rankings system
				 */
				timeHash = [...Object.entries(timeHash)].sort(
					(a, b): any =>
						a[1].average > b[1].average && a[1].stddev > b[1].stddev
				);

				let meetArr: keyable[] = [];
				timeHash.forEach((city: any, index: any) =>
					meetArr.push({
						__EMPTY_9: index + 1,
						__EMPTY_12: city[0],
						__EMPTY_14: city[1].length,
						__EMPTY_16: new Date(city[1].average)
							.toISOString()
							.substr(14, 8),
						__EMPTY_17: new Date(city[1].stddev)
							.toISOString()
							.substr(14, 8),
					})
				);

				return (
					<div>
						<Container fluid className="mt-1">
							<Row>
								{/* Displays The Distribution of months with best time, aka. Peak Months */}
								<Col className="text-center colBorder">
									<PeakMonth
										swimmerData={data}
										allSwimmerData={allSwimmerData}
										allSwimmerDataSubComponents={[]}
										eventName={eventName}
									/>
								</Col>
							</Row>
							<Row className="mt-2">
								<Col className="colBorder" md={6} sm={12}>
									<FastestCity swimmerData={data} />
									<ReactTable
										tableData={meetCityArr}
										allowedKeys={meetCityKeys}
									/>
								</Col>
								<Col className="colBorder" md={6} sm={12}>
									<FastestMeets
										swimmerData={data}
										eventName={eventName}
									/>
									<ReactTable
										tableData={meetArr}
										allowedKeys={meetKeys}
									/>
								</Col>
							</Row>
						</Container>
					</div>
				);
			} else {
				/**
				 * * Need to copy the event array to reduce the subcomponents to be graphed
				 */
				allSwimmerDataSubComponents = JSON.parse(
					JSON.stringify(swimmerData[0][0])
				);
				/**
				 * * For getting the Data of all sheets containing all events (Workbook holds each fetch file)
				 * * Each fetch file contains 18 Sheets (aka arrays of events) in each, it contains 50 swimmers (Objects) (Max)
				 */
				swimmerData.forEach((workbook) => {
					workbook.forEach((sheet) => {
						sheet.forEach((event) => {
							event.forEach((swimmer: keyable) => {
								swimmer.__EMPTY_8 = SwimFormulas.standardizeTimes(
									swimmer.__EMPTY_7
								);
								data.push(swimmer);
							});
						});
					});
				});
				/**
				 * * First element is undefined and empty, needs to be removed
				 */
				data.shift();

				/**
				 * * Pass it the keys that will be used as the header for the table in React Table
				 */
				let meetCityKeys = ['__EMPTY_11', '__EMPTY_14'];
				/**
				 * * Converts all the events data into the labels and data for the piechart of meet city
				 */
				let meetCity = SwimFormulas.mostOccurrences(
					SwimFormulas.meetCity(data)
				).sort((a, b) => b[1] - a[1]);

				let meetCityKey = meetCity.map((city) => city[0]);
				let meetCityNum = meetCity.map((number) => number[1]);
				/**
				 * * Converts it into array that holds objects with properties that can be used by the ReactTable Component
				 */
				let meetCityArr: keyable[] = [];
				meetCity.forEach((city, index) =>
					meetCityArr.push({
						__EMPTY_11: meetCityKey[index],
						__EMPTY_14: meetCityNum[index],
					})
				);

				/**
				 * * Pass it the keys that will be used as the header for the table in React Table
				 */
				let meetKeys = ['__EMPTY_12', '__EMPTY_14'];

				/**
				 * * Converts all events data into label for Meet data. (Meet Name and occurence of best time)
				 * * Converts the Meet Data Map into useable 'key' and 'value' arrays for graphing
				 */
				let meets = SwimFormulas.mostOccurrences(
					SwimFormulas.meetName(data)
				).sort((a, b) => b[1] - a[1]);
				let meetName = meets.map((name) => name[0]);
				let meetNumber = meets.map((number) => number[1]);
				let meetArr: keyable[] = [];
				meets.forEach((city, index) =>
					meetArr.push({
						__EMPTY_12: meetName[index],
						__EMPTY_14: meetNumber[index],
					})
				);

				return (
					<div>
						<Container fluid className="mt-1">
							<Row>
								{/* Displays The Distribution of months with best time, aka. Peak Months */}
								<Col className="text-center colBorder">
									{' '}
									<PeakMonth
										swimmerData={data}
										allSwimmerData={allSwimmerData}
										allSwimmerDataSubComponents={
											allSwimmerDataSubComponents
										}
										eventName={eventName}
									/>
								</Col>
							</Row>
							<Row className="mt-2">
								<Col className="colBorder" sm={6}>
									<FastestCity swimmerData={data} />
									<ReactTable
										tableData={meetCityArr}
										allowedKeys={meetCityKeys}
									/>
								</Col>
								<Col className="colBorder" sm={6}>
									<FastestMeets
										swimmerData={data}
										eventName={eventName}
									/>
									<ReactTable
										tableData={meetArr}
										allowedKeys={meetKeys}
									/>
								</Col>
							</Row>
						</Container>
					</div>
				);
			}
		}
	} catch (error) {
		console.log(error);
	}
	return <div></div>;
};
export default ClubDashboard;
