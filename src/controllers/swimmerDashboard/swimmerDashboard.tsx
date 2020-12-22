import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { EVENTS } from '../../constants/swimmingConstants/swimmingConstants';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Linegraph from '../../components/linegraph/linegraph';
import * as SwimFormulas from '../../constants/graphFunctions/graphFunctions';
import FastestMeets from '../../components/analytics/fastestMeets/fastestMeets';
import TimeAnalytics from '../../components/analytics/timeAnalytics/timeAnalytics';
import SwimmerTable from '../swimmertable/swimmertable';
import PropTypes, { number, string } from 'prop-types';

/**
 * Swim Dashboard converts the data fetched from the route 'swimmer', to a usable format to be used by the components (Linegraph,Analytics, Swimmertable/React Table).
 * @component
 */

// Might break down into interface to match book structure (Interface for swimmer, array of swimmers for event, array of events)
type allDataType = Array<Array<Array<keyable>>>;

interface keyable {
	[key: string]: any;
}

type Props = {
	allSwimmerData: allDataType | null;
	eventName: string;
	clubName: string;
	year: string;
};

const SwimmerDashboard: React.FC<Props> = ({
	allSwimmerData,
	eventName,
	clubName,
	year,
}: Props) => {
	let selectedSwimmerData: Object[] = [];
	let meetData: Object[] = [];

	/**
	 * * If the the Swimmer Data is NULL or it has no data (invalid year fetch / empty event / etc)
	 */

	if (allSwimmerData === null || allSwimmerData.length === 0) {
		return <div></div>;
	} else {
		try {
			allSwimmerData[0].forEach((workbook) => {
				/**
				 * * In every Workbook (Age / Year) it holds Sheets with the Events, will select the sheet that contains the events data
				 */
				console.log(workbook);
				let index = EVENTS.indexOf(eventName);
				let Sheet = workbook[index];
				let dataset: any[] = [];
				/**
				 * * For the selected event collect all the swimmer data
				 */
				Sheet.forEach((swimmer: any) => {
					/**
					 * * Convert time from MM:SS.ss to Milliseconds (Needed for graphing y-axis for time, since it is not a standardized time format)
					 */
					swimmer.__EMPTY_8 = SwimFormulas.standardizeTimes(
						swimmer.__EMPTY_7
					);
					dataset.push(swimmer);
				});
				selectedSwimmerData.push(dataset);
			});
			/**
			 * * Flatten data from multiple seasons into one array to be placed in table / meetchart
			 */
			meetData = selectedSwimmerData.flat(Infinity);
		} catch {}
	}
	return (
		<div>
			{/* Dashboard with all the logic for the graph **/}
			<Container fluid>
				<Row className="mb-3">
					<Col className="pr-0 mt-2" lg={8}>
						{/**
						 * * Need to make sure that I am ensuring the data format is handled outside of the components not inside.
						 *  */}
						<Linegraph
							swimmerData={selectedSwimmerData}
							swimEvent={eventName}
							clubName={clubName}
							year={year}
						/>
					</Col>
					<Col className="pl-0 mt-2" lg={4}>
						<div className="colBorder ml-2">
							<TimeAnalytics
								swimmerData={selectedSwimmerData}
								swimEvent={eventName}
							/>
						</div>

						<div className="colBorder ml-2 mt-2">
							<FastestMeets
								className=""
								swimmerData={meetData}
								swimEvent={eventName}
							/>
						</div>
					</Col>
				</Row>
			</Container>

			<Container fluid>
				<Row>
					<Col>
						<SwimmerTable
							tableData={selectedSwimmerData}
						></SwimmerTable>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
/*
SwimmerDashboard.propTypes = {
    /**
     *  Standardized JSON File structure Converted from Swimmer Component. It is an Array[Workbooks[Events[Swimmers[]]]]
     */
//swimmerData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)))),

/**
 *  The name of the event
 */
// swimEvent: PropTypes.string.isRequired,

/**
 *   Standardized JSON File structure Converted from Swimmer Component.
 */
// tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)))),

/**
 *  The name of the club that is being graphed
 */
// clubName: PropTypes.string.isRequired,

/**
 *  The season that data is being graphed from
 */
// season: PropTypes.string
//}

export default SwimmerDashboard;
