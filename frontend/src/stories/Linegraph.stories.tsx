import React from 'react';
import Linegraph from '../components/linegraph/linegraph';
const DATA = require('./response.json');

export default {
	title: 'Linegraph',
	component: Linegraph,
};

export const Default = () => (
	<Linegraph
		swimmerData={DATA}
		eventName="200m Fr"
		year="2019-2020"
		clubName="Oak"
	/>
);
