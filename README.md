# Canadian Swimming Rankings    <a src="https://i.gyazo.com/5931b368adbf4d985e24f37012cebbc3.png" width="50" length="50"></a>

[Canadian Swimming Rankings](https://canadian-swimming-rankings.herokuapp.com/) is a graphing website that allows Swimmers and Coaches to take a closer look at the trends and insights from the results across all **age groups**, **events** and **genders** from **Current** & **Previous Years**.  

All Data on this site has been provided by Christian Kaufmann, the owner of swimrankings.net   If you or your club are looking for **Team Management** software or **Meet Management** software, refer to https://www.swimrankings.net/index.php?page=splashsoftware 

![](https://i.gyazo.com/3661799f4dc89864365ef27b378aadad.png)
![](https://i.gyazo.com/d3b117de58b1325a42bd3f4e6d7b45ff.png)

# Table of Contents
1. [Request Club Listing](#RequestClubListing)
2. [Feedback / Feature Request](#feedback)
3. [Report Bug](#bugs)
4. [File Structure / Documentation](#filestructure)



<a id="RequestClubListing"> </a>
# Request Club Listing 


If you do not see your club listed in the dropdown or your club is not within Canada email me and I can add your club and country to the list.
**Use Header *"Canadian Swimming Rankings: '(Request Club)' "***
**owenduncansnobel@gmail.com**

<a id="feedback"> </a>
# Feedback / Feature Requests

If you have any comments / feedback on future updates or want to request a feature you can also email. 
**Use Header *"Canadian Swimming Rankings: '(Feedback)' "***
**owenduncansnobel@gmail.com**

<a id="bugs"> </a>
## Report Bug

If you find any bugs / the data does not seem to correct for the graph. If you are familiar with Github you can open an **ISSUE**.

 You can also email me and describe how to replicate it or how the bug happened if you are not.

<a id="filestructure"> </a>
# File Structure / Documentation

### Components
 - **clubs**
 
    - clubs.js
    - [clubs.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/tree/master/src/components/clubs/clubs.md)
  
 - **contact**
	 - contact.js
 - **linegraph** (Takes data from swimmerRankings and graphs it to /Swimmers) 
	 - linegraph.js
	 - linegraph.md
 - **peakMonth** (Takes data from clubs and parses and passes it to graph)
	 - peakMonth.js
	 - [peakMonth.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/peakMonth/peakMonth.md)
 - **piechart** (Takes data and returns the fastest meets in a piechart component)  
	 - piechart.js
	 - [pieChart.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/piechart/PieChart.md)
 - **swimmerRankings** (Fetches Swimmer Data and passes to line graph and piechart)
	 - swimmerRankings.js
	 - [ProcessingData.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/swimmerRankings/ProcessingData.md)
 - **swimmertable**  (Converts the data from the fetch JSON and returns it in a table in html) 
	- swimmertable.js
	- [swimmertable.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/swimmertable/swimmertable.md)


List of the possible Parameters that can be used for fetching swimmer data.  

**Useful if you want to begin fetching your own excel files.**
[QueryParameter.md](https://github.com/owen-duncan-snobel/canadianSwimmingRankings/blob/master/src/components/QueryParameter.md)
