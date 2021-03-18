import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { CLUBS } from '../../constants/swimmingConstants/swimmingConstants';
import XLSX from 'xlsx';
import axios from 'axios';
import SwimmerDashboard from '../../controllers/swimmerDashboard/swimmerDashboard';

// Might break down into interface to match book structure (Interface for swimmer, array of swimmers for event, array of events)
type SwimmerData = Array<Array<Array<Object>>>;

const Swimmer: React.FC = () => {
	const [data, setData] = useState(null);
	const [formInput, setFormInput] = useState({});
	const [loading, setLoading] = useState<Boolean>(false);
	const [eventName, setEventName] = useState<string>('');
	const [clubName, setClubName] = useState<string>('72542');
	const [year, setYear] = useState<string>('2020');

	/**
	 * * Handles any form change, reusable
	 */
	const handleInputChange = (e: any) =>
		setFormInput({
			...formInput,
			[e.currentTarget.name]: e.currentTarget.value,
		});

	const handleSubmit = (e: any) => {
		try {
			/**
			 * * Prevent page from rerouting / reloading
			 */
			e.preventDefault();
			setLoading(true);

			const formdata = new FormData(e.target);
			const clubId = formdata.get('ddl_club')?.toString();
			const season = formdata.get('ddl_season')!?.toString();
			const course = formdata.get('ddl_course')?.toString();
			const gender = formdata.get('ddl_gender')?.toString();
			const agegroup = formdata.get('ddl_age')?.toString();
			const compare = formdata.get('compare')?.toString();
			/**
			 * * Event is not required for fetching only displaying the correct dataset and event name in the component
			 */
			const event: string = formdata.get('ddl_event')?.toString()!;

			axios({
				method: 'POST',
				url: 'http://localhost:8080/swimmers',
				data: JSON.stringify({
					clubId: clubId,
					season: season,
					course: course,
					gender: gender,
					agegroup: agegroup,
					compare: compare,
				}),
				headers: {
					'Access-Control-Allow-Origin': '*',
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
				.then((res) => res.data)
				.then((text) => console.log(text));
			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="m-2">
			<div>
				<span className="text-4xl font-bold">Swimmer Rankings</span>
			</div>

			<Form className="rankingsForm mt-2" onSubmit={handleSubmit}>
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
		</div>
	);
};
export default Swimmer;
