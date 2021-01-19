# Canadian Swimming Rankings   <img src="https://i.gyazo.com/5931b368adbf4d985e24f37012cebbc3.png" width="50" height="50">
[Canadian Swimming Rankings](http://www.canadianswimmingrankings.ca) is a graphing website that allows Swimmers and Coaches to take a closer look at the trends and insights from the results across all **Age groups**, **Events** and **Genders** from the **Current** & **Previous Years**.  

All Data on this site has been provided by Christian Kaufmann, the owner of swimrankings.net .   If you or your club are looking for **Team Management** or **Meet Management** software, refer to https://www.swimrankings.net/index.php?page=splashsoftware 

![](https://gyazo.com/fb1572ca82f13dc12fc6b723c61cba84.png)
![](https://gyazo.com/e49fa62a5e16d6e51994fc1dc478d1b7.png)


# Table of Contents
1. [Request Club Listing](#RequestClubListing)
2. [Feedback / Feature Request](#feedback)
3. [Report Bug](#bugs)
4. [File Structure / Documentation](#filestructure)



<a id="RequestClubListing"> </a>
# Request Club Listing 


If you do not see your Club listed in the dropdown, or your club is not within Canada email me and I can add your club and country to the list.
**Use Header *"Canadian Swimming Rankings: '(Request Club)' "***
**owenduncansnobel@gmail.com**

<a id="feedback"> </a>
# Feedback / Feature Requests

If you have any comments / feedback on future updates or want to request a feature you can also email. 
**Use Header *"Canadian Swimming Rankings: '(Feedback)' "***
**owenduncansnobel@gmail.com**

<a id="bugs"> </a>
## Report Bug

If you find any bugs, or you believe the data does not seem to be correct for the graph. If you are familiar with Github you can open an **ISSUE**.

Otherwise, you can also email me and describe how to replicate it, or describe how the bug occured.

<a id="filestructure"> </a>
# File Structure / Documentation

### Documentation
https://owen-duncan-snobel.github.io/canadianSwimmingRankings/
### Components

``` bash
### Components
├── QueryParameter.md
├── analytics
│   ├── analytics.md
│   ├── fastestCity
│   │   └── fastestCity.tsx
│   ├── fastestMeets
│   │   └── fastestMeets.tsx
│   ├── peakMonth
│   │   ├── peakMonth.tsx
│   │   └── peakMonth.md
│   └── timeAnalytics
│       └── timeAnalytics.tsx
├── linegraph
│   ├── linegraph.tsx
│   └── linegraph.md
├── reactTable
│   ├── reactTable.tsx
│   └── reactTable.md
└── swimmerData.zip

### Constants
constants
├── graphFunctions
│   ├── graphFunctions.tsx
│   └── graphFunctions.test.js
└── swimmingConstants
    └── swimmingConstants.tsx

### Controllers
controllers
├── clubDashboard
│   └── clubDashboard.tsx
├── swimmerDashboard
│   └── swimmerDashboard.tsx
└── swimmertable
    ├── swimmertable.tsx
    └── swimmertable.md
    
### Views
views
├── about
│   └── about.tsx
├── clubs
│   ├── clubs.tsx
│   └── clubs.md
├── contact
│   └── contact.tsx
└── swimmer
    ├── ProcessingData.md
    └── swimmer.tsx
```

### Components
* [QueryParameter.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/QueryParameter.md) **Useful if you want to begin fetching your own excel files.**
* analytics
	* [analytics.css](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/analytics/analytics.css)
	* [analytics.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/analytics/analytics.md)
	* fastestCity
		*  [fastestCity.tsx](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/analytics/fastestCity/fastestCity.tsx)
	* fastestMeets
		*  [fastestMeets.tsx](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/analytics/fastestMeets/fastestMeets.tsx)
	*  peakMonth
		* [peakMonth.tsx](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/analytics/peakMonth/peakMonth.tsx)
		* [peakMonth.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/analytics/peakMonth/peakMonth.md)
	* timeAnalytics
		*  [timeAnalytics.tsx](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/analytics/timeAnalytics/timeAnalytics.tsx)
* linegraph
	* [linegraph.tsx](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/linegraph/linegraph.tsx)
	* [linegraph.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/linegraph/linegraph.md)
* reactTable
	*  [reactTable.tsx](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/reactTable/reactTable.tsx)
	* [reactTable.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/reactTable/reactTable.md)
	* [swimmerData.zip](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/swimmerData.zip)

### Constants
* graphFunctions
	*  [graphFunctions.tsx](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/constants/graphFunctions/graphFunctions.tsx)
	*  [graphFunctions.test.tsx](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/constants/graphFunctions/graphFunctions.test.tsx)
* swimmingConstants
	*  [swimmingConstants.tsx](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/constants/swimmingConstants/swimmingConstants.tsx)

### Controllers

* clubDashboard
	*  [clubDashboard.tsx](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/controllers/clubDashboard/clubDashboard.tsx)
* swimmerDashboard
	*  [swimmerDashboard.tsx](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/controllers/swimmerDashboard/swimmerDashboard.tsx)
* swimmertable
	* [swimmertable.tsx](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/controllers/swimmertable/swimmertable.tsx)
	* [swimmertable.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/controllers/swimmertable/swimmertable.md)
    
### Views

* about
	* [about.tsx](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/views/about/about.tsx)
* clubs
	* [clubs.css](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/views/clubs/clubs.css)
	* [clubs.tsx](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/views/clubs/clubs.tsx)
	* [clubs.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/views/clubs/clubs.md)
	* [clubs.test.js](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/views/clubs/clubs.test.js)
* contact
	* [contact.css](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/views/contact/contact.css)
	* [contact.tsx](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/views/contact/contact.tsx)
* swimmers
	*  [ProcessingData.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/views/swimmers/ProcessingData.md)
	* [swimmers.css](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/views/swimmers/swimmers.css)
	* [swimmers.tsx](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/views/swimmers/swimmers.tsx)
