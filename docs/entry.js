
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../node_modules/better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  import Component0 from '../src/controllers/clubDashboard/clubDashboard.js';
reactComponents['ClubDashboard'] = Component0;

import Component1 from '../src/components/analytics/fastestCity/fastestCity.js';
reactComponents['FastestCity'] = Component1;

import Component2 from '../src/components/analytics/fastestMeets/fastestMeets.js';
reactComponents['FastestMeets'] = Component2;

import Component3 from '../src/components/analytics/peakMonth/peakMonth.js';
reactComponents['PeakMonth'] = Component3;

import Component4 from '../src/components/analytics/timeAnalytics/timeAnalytics.js';
reactComponents['TimeAnalytics'] = Component4;