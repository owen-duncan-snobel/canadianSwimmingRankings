import React from 'react';
import * as SwimFormulas from '../../../constants/graphFunctions/graphFunctions';

/**
 * Returns a Component with the average,mode,median,standard deviation listed based on data based to it.
 * @component
 * @example
 * const allData = [
 * [
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "*********",
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
    "__EMPTY_3": "*********",
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
],[
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "*********",
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
    "__EMPTY_3": "*********",
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
]
 * const event = '50m Free';
 * return (
 *  <TimeAnalytics swimmerData={allData} swimEvent={event} />
 * )
 * 
 */

interface keyable {
	[key: string]: any;
}
interface Props {
	swimmerData: keyable[][];
	eventName: string;
}

interface Mode {
	mostCommonNumber: string;
	maxCount: number;
}
const TimeAnalytics: React.FC<Props> = ({ swimmerData, eventName }) => {
	let meetData: keyable[] = [];
	let average: string = '';
	let median: string = '';
	let mode = {} as Mode;
	let times: number[] = [];
	let standardDeviation: string = '';
	let mostCommonTimeRange: string = '';

	if (!Array.isArray(swimmerData) || !swimmerData.length) {
		return <div></div>;
	} else {
		try {
			swimmerData.forEach((event: keyable[]) => {
				event.forEach((swimmer: keyable) => {
					meetData.push(swimmer);
				});
			});

			// * Converts The Time & Meet Data To an Array that can be easily used
			times = meetData.map((time) => time.__EMPTY_8);
			// * Variables for the respective 'average' , 'median' and 'mode' from the data
			average = SwimFormulas.averageTime(times);
			median = SwimFormulas.medianTime(times);
			mode = SwimFormulas.modeTime(times)!;
			standardDeviation = SwimFormulas.standardDeviation(times);
			mostCommonTimeRange = SwimFormulas.commonTimeRange(meetData, mode);
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div className="container">
			{/* Time Analytics */}
			<div>
				{/* Hides The Average,Median,Mode if all events are selected. Aka data length is larger then 50 */}

				{/** Swimming Analytics Title */}
				<div>
					<p className="font-semibold text-2xl text-center">
						Swimming Analytics
					</p>

					<p>
						<span className="font-bold block">Average Time</span>
						{average}
					</p>

					<p>
						<span className="font-bold block">Median Time</span>
						{median}
					</p>

					<p>
						<span className="font-bold block">
							Most Common Time Range
						</span>
						{mostCommonTimeRange}
						<span className="font-bold block">
							With {mode.maxCount} Swimmers
						</span>
					</p>

					<p>
						<span className="font-bold block">
							Standard Deviation
						</span>
						{standardDeviation}
					</p>
				</div>
			</div>
		</div>
	);
};
export default TimeAnalytics;
