# Canadian Swimming Rankings   <img src="https://i.gyazo.com/5931b368adbf4d985e24f37012cebbc3.png" width="50" height="50">
[Canadian Swimming Rankings](https://canadian-swimming-rankings.herokuapp.com/) is a graphing website that allows Swimmers and Coaches to take a closer look at the trends and insights from the results across all **Age groups**, **Events** and **Genders** from the **Current** & **Previous Years**.  

All Data on this site has been provided by Christian Kaufmann, the owner of swimrankings.net .   If you or your club are looking for **Team Management** or **Meet Management** software, refer to https://www.swimrankings.net/index.php?page=splashsoftware 

![](https://i.gyazo.com/3661799f4dc89864365ef27b378aadad.png)
![](https://i.gyazo.com/d3b117de58b1325a42bd3f4e6d7b45ff.png)

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

### Components
components


├── [QueryParameter.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/QueryParameter.md) **Useful if you want to begin fetching your own excel files.**
├── analytics
│   ├── [analytics.css](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/analytics/analytics.css)
│   ├── [analytics.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/analytics/analytics.md)
│   ├── fastestCity
│   │   └── [fastestCity.js](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/analytics/fastestCity/fastestCity.js)
│   ├── fastestMeets
│   │   └── [fastestMeets.js](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/analytics/fastestMeets/fastestMeets.js)
│   ├── peakMonth
│   │   ├── [peakMonth.js](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/analytics/peakMonth/peakMonth.js)
│   │   └── [peakMonth.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/analytics/peakMonth/peakMonth.md)
│   └── timeAnalytics
│       └── [timeAnalytics.js](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/analytics/timeAnalytics/timeAnalytics.js)
├── linegraph
│   ├── [linegraph.js](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/linegraph/linegraph.js)
│   └── [linegraph.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/linegraph/linegraph.md)
├── reactTable
│   ├── [reactTable.js](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/reactTable/reactTable.js)
│   └── [reactTable.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/reactTable/reactTable.md)
└── [swimmerData.zip](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/swimmerData.zip)

### Constants
constants
├── graphFunctions
│   ├── [graphFunctions.js](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/constants/graphFunctions/graphFunctions.js)
│   └── [graphFunctions.test.js](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/constants/graphFunctions/graphFunctions.test.js)
└── swimmingConstants
    └── [swimmingConstants.js](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/constants/swimmingConstants/swimmingConstants.js)

### Controllers
controllers
├── clubDashboard
│   └── [clubDashboard.js](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/controllers/clubDashboard/clubDashboard.js)
├── swimmerDashboard
│   └── [swimmerDashboard.js](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/controllers/swimmerDashboard/swimmerDashboard.js)
└── swimmertable
    ├── [swimmertable.js](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/controllers/swimmertable/swimmertable.js)
    └── [swimmertable.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/controllers/swimmertable/swimmertable.md)
    
### Routes
routes
├── about
│   └── [about.js](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/routes/about/about.js)
├── clubs
│   ├── [clubs.css](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/routes/clubs/clubs.css)
│   ├── [clubs.js](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/routes/clubs/clubs.js)
│   ├── [clubs.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/routes/clubs/clubs.md)
│   └── [clubs.test.js](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/routes/clubs/clubs.test.js)
├── contact
│   ├── [contact.css](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/routes/contact/contact.css)
│   └── [contact.js](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/routes/contact/contact.js)
└── swimmer
    ├── [ProcessingData.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/routes/swimmer/ProcessingData.md)
    ├── [swimmer.css](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/routes/swimmer/swimmer.css)
    └── [swimmer.js](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/routes/swimmer/swimmer.js)
