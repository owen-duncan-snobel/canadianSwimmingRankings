import React from 'react';
import { EVENTS } from '../../constants/swimmingConstants/swimmingConstants';
import Linegraph from '../../components/linegraph/linegraph';
import * as SwimFormulas from '../../constants/graphFunctions/graphFunctions';
import FastestMeets from '../../components/analytics/fastestMeets/fastestMeets';
import TimeAnalytics from '../../components/analytics/timeAnalytics/timeAnalytics';
import SwimmerTable from '../swimmertable/swimmerTable';

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
}) => {
	let selectedSwimmerData: Array<keyable[]> = [];
	let meetData: keyable[] = [];

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
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div>
			{/* Dashboard with all the logic for the graph **/}

			<div className="grid grid-cols-1 md:grid-cols-3">
				<div className="border border-black m-1 col-span-3 md:col-span-2">
					<Linegraph
						swimmerData={selectedSwimmerData}
						eventName={eventName}
						year={year}
						clubName={clubName}
					/>
				</div>
				<div className="border border-black m-1 md:col-span-1">
					<div className="">
						<TimeAnalytics
							swimmerData={selectedSwimmerData}
							eventName={eventName}
						/>
					</div>

					<div className="">
						<FastestMeets
							swimmerData={meetData}
							eventName={eventName}
						/>
					</div>
				</div>
			</div>

			<div>
				<div>
					<SwimmerTable tableData={selectedSwimmerData} />
				</div>
			</div>
		</div>
	);
};
export default SwimmerDashboard;
