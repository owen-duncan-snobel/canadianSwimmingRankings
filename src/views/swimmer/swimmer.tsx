import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { CLUBS } from '../../constants/swimmingConstants/swimmingConstants';
import XLSX from 'xlsx';
import SwimmerDashboard from '../../controllers/swimmerDashboard/swimmerDashboard';

// Might break down into interface to match book structure (Interface for swimmer, array of swimmers for event, array of events)
type SwimmerData = Array<Array<Array<Object>>>;

const Swimmer: React.FC = () => {
	const [data, setData] = useState<SwimmerData | null>(null);
	const [input, setInput] = useState({});
	const [loading, setLoading] = useState<Boolean>(false);
	const [urls, setUrls] = useState<string[]>([]);
	const [eventName, setEventName] = useState<string>('');
	const [clubName, setClubName] = useState<string>('72542');
	const [year, setYear] = useState<string>('2020');

	/**
	 * * Handles any form change, reusable
	 */
	const handleInputChange = (e: any) =>
		setInput({
			...input,
			[e.currentTarget.name]: e.currentTarget.value,
		});

	const handleSubmit = (e: any) => {
		try {
			/**
			 * * Prevent page from rerouting / reloading
			 */
			e.preventDefault();
			setLoading(true);

			/**
			 * * Formed data is used for getting the contents of the submitted form
			 */
			const formdata = new FormData(e.target);
			const clubID = formdata.get('ddl_club')?.toString();
			const season = formdata.get('ddl_season')!?.toString();
			const course = formdata.get('ddl_course')?.toString();
			const gender = formdata.get('ddl_gender')?.toString();
			const agegroup = formdata.get('ddl_age')?.toString();
			const event: string = formdata.get('ddl_event')?.toString()!;
			let compare = formdata.get('compare')!.toString();

			/**
			 * * urls array will contain all the distinct urls that will be fetched and graphed/compared.
			 * * They are stored in an array so that we can track when they change / update in our urls state
			 */
			let formUrls = [];
			let compareI = parseInt(compare);

			for (let i = 0; i < compareI; i++) {
				let url =
					'https://www.swimrankings.net/services/RankingXls/ranking.xls?';
				let param = new URLSearchParams();
				param.append('gender', gender!);
				param.append('agegroup', agegroup!);
				param.append('course', course!);
				param.append('season', (parseInt(season) - i).toString());
				param.append('clubID', clubID!);
				url += param.toString();
				formUrls.push(url);
			}

			/**
			 * * If the stringified array of urls is equal to the current form no need to refetch the data
			 * * since that urls have not changed
			 */
			if (JSON.stringify(urls) === JSON.stringify(formUrls)) {
				setLoading(false);
			} else {
				setUrls(formUrls);
				setEventName(event);
				setClubName(CLUBS.get(clubID));
				setYear(season);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		// Check if the file exists in local storage / will looking into storing with IndexedDB
		// TODO console.log('only fetch 1')

		// Else fetch the data needed
		const fetchData = async () => {
			if (urls === undefined || !urls.length) {
				console.log('No URLS to fetch');
			} else {
				Promise.all(
					urls.map((url) =>
						fetch(
							'https://dark-art-855d.canadianswimmingrankings.workers.dev/?' +
								url,
							{
								method: 'GET',
								mode: 'cors',
								headers: {
									Host: 'www.swimrankings.net',
									Accept:
										'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,',
								},
							}
						)
							.then((response) => {
								if (!response.ok) {
									throw new Error('Unable to fetch file');
								} else {
									return response.arrayBuffer();
								}
							})
							.then((buffer) => {
								/**
								 * * Converts the XLSX file into an Array buffer to be converted to Object
								 */
								let bookBuffer = new Uint8Array(buffer);
								let workbook = XLSX.read(bookBuffer, {
									type: 'array',
								});

								let workbookData = [];
								for (let sheet in workbook.Sheets) {
									let sheetData: Array<Object> = XLSX.utils.sheet_to_json(
										workbook.Sheets[sheet]
									);
									// * removes place holder for top of file
									sheetData.shift();
									workbookData.push(sheetData);
								}
								return workbookData;
							})
							.catch((error) => {
								console.log(error);
							})
					)
				).then((promiseData: any) => {
					/**
					 * * Ensure that the data is first an array, as well as that the data isn't an empty array
					 */
					if (!Array.isArray(promiseData) || !promiseData.length) {
						console.log('Error: No Swimmer Data was returned');
						setLoading(false);
					} else {
						/**
						 * * Need to standardize the data structure, ([Workbook (Year / Agegroup)] -> [Sheets (aka Event)] -> [Swimmers in event])
						 * * In the case where there is multiple urls/files implies multiple xlsx workbooks. You will need to keep an array of workbooks then iterate through each.
						 */
						setData([promiseData]);
						setLoading(false);
					}
				});
			}
		};
		fetchData();
	}, [urls]);

	return (
		<div>
			<div>
				<h1 className="formTitle">Swimmer Rankings</h1>
			</div>

			<Form className="rankingsForm" onSubmit={handleSubmit}>
				<Form.Row>
					{/**  Swimming Season */}
					<Form.Group>
						<Form.Control
							name="ddl_season"
							id="ddl_season"
							defaultValue={year}
							onChange={(e) => handleInputChange(e)}
							className="dropdownBox custom-select"
							as="select"
						>
							<option value="" disabled>
								Season
							</option>
							<option value="2008">2007-2008</option>
							<option value="2009">2008-2009</option>
							<option value="2010">2009-2010</option>
							<option value="2011">2010-2011</option>
							<option value="2012">2011-2012</option>
							<option value="2013">2012-2013</option>
							<option value="2014">2013-2014</option>
							<option value="2015">2014-2015</option>
							<option value="2016">2015-2016</option>
							<option value="2017">2016-2017</option>
							<option value="2018">2017-2018</option>
							<option value="2019">2018-2019</option>
							<option value="2020">2019-2020</option>
							<option value="2021">2020-2021</option>
							<option value="2022">2021-2022</option>
						</Form.Control>
					</Form.Group>

					<Form.Group>
						<Form.Control
							name="compare"
							id="compare"
							onChange={(e) => handleInputChange(e)}
							className="dropdownBox custom-select"
							as="select"
						>
							<option value="1" disabled>
								Compare With
							</option>
							<option value="1">None</option>
							<option value="2">Last Season</option>
							<option value="3">Last 2 Seasons</option>
							<option value="6">Last 5 Seasons</option>
						</Form.Control>
					</Form.Group>

					{/** Club */}
					<Form.Group>
						<Form.Control
							name="ddl_club"
							id="ddl_club"
							defaultValue={clubName}
							onChange={(e) => handleInputChange(e)}
							className="dropdownBox custom-select"
							as="select"
						>
							<option disabled>Club</option>
							<option value="73893">Cobra Swim Club</option>
							<option value="72359">London Aquatic Club</option>
							<option value="72365">
								Newmarket Stringrays Swim Club
							</option>
							<option value="74026">Markham Aquatic Club</option>
							<option value="72542">Oakville Aquatic Club</option>
						</Form.Control>
					</Form.Group>

					{/**  Course */}
					<Form.Group>
						<Form.Control
							name="ddl_course"
							id="ddl_course"
							defaultValue="SCM"
							onChange={(e) => handleInputChange(e)}
							className="dropdownBox custom-select"
							as="select"
						>
							<option disabled>Course</option>
							<option value="LCM">Long Course (50m)</option>
							<option value="SCM">Short Course (25m)</option>
						</Form.Control>
					</Form.Group>

					{/**  Gender */}
					<Form.Group>
						<Form.Control
							name="ddl_gender"
							id="ddl_gender"
							onChange={(e) => handleInputChange(e)}
							className="dropdownBox custom-select"
							as="select"
						>
							<option disabled>Gender</option>
							<option value="M">Male</option>
							<option value="F">Female</option>
						</Form.Control>
					</Form.Group>

					{/**  Age */}
					<Form.Group>
						<Form.Control
							name="ddl_age"
							id="ddl_age"
							onChange={(e) => handleInputChange(e)}
							className="dropdownBox custom-select"
							as="select"
						>
							<option disabled>Age</option>
							<option value="X_X">Open (All years)</option>
							<option value="X_10">10 years and younger</option>
							<option value="11_11">11 years</option>
							<option value="11_12">11 - 12 years</option>
							<option value="12_12">12 years</option>
							<option value="13_13">13 years</option>
							<option value="13_14">13 - 14 years</option>
							<option value="14_14">14 years</option>
							<option value="15_15">15 years</option>
							<option value="15_16">15 - 16 years</option>
							<option value="15_17">15 - 17 years</option>
							<option value="16_16">16 years</option>
							<option value="17_17">17 years</option>
							<option value="17_18">17 - 18 years</option>
							<option value="18_18">18 years</option>
						</Form.Control>
					</Form.Group>

					{/**   Event */}
					{/* Values for events are named as such inorder to match naming convention of the worksheets from excel workbook */}
					<Form.Group>
						<Form.Control
							name="ddl_event"
							id="ddl_event"
							onChange={(e) => handleInputChange(e)}
							className="dropdownBox custom-select"
							as="select"
						>
							<option disabled>Event</option>
							<option value="50m Fr">50 Free</option>
							<option value="100m Fr">100 Free</option>
							<option value="200m Fr">200 Free</option>
							<option value="400m Fr">400 Free</option>
							<option value="800m Fr">800 Free</option>
							<option value="1500m Fr">1500 Free</option>
							<option value="50m Bk">50 Back</option>
							<option value="100m Bk">100 Back</option>
							<option value="200m Bk">200 Back</option>
							<option value="50m Br">50 Breast</option>
							<option value="100m Br">100 Breast</option>
							<option value="200m Br">200 Breast</option>
							<option value="50m Bu">50 Fly</option>
							<option value="100m Bu">100 Fly</option>
							<option value="200m Bu">200 Fly</option>
							<option value="100m Me">100 I.Medley</option>
							<option value="200m Me">200 I.Medley</option>
							<option value="400m Me">400 I.Medley</option>
						</Form.Control>
					</Form.Group>
					<Button className="formButton" type="submit">
						{!loading && 'SHOW'}
						{loading && (
							<Spinner
								animation="border"
								size="sm"
								role="status"
							/>
						)}
					</Button>
				</Form.Row>
			</Form>
			<SwimmerDashboard
				allSwimmerData={data}
				eventName={eventName}
				clubName={clubName}
				year={year}
			/>
		</div>
	);
};
export default Swimmer;
