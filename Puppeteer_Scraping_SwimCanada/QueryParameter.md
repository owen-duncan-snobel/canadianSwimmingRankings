#  Canadian Swimming Rankings
###  How to use Parameters for Queries:
##### Inorder to get the excel file that is wanted from the database, the following Parameters listed are used to specify which file is wanted. The corresponding value used are listed as well.

ex.
` https://www.swimrankings.net/services/RankingXls/ranking.xls?gender=M&agegroup=X_X&course=LCM&season=2008&clubId=72542&Points=fina_2019&Language=us`

Which Would give us the Excel File with the following Parameters: 
- Gender : Male
- Age Group: Open
- Course: Long Course Metres
- Season : 2008
- Club : Oakville Aquatic Club
- Points : Fina 2019 Scoring
- Language : English


####Gender: 
> Used for selecting the gender of the swimmers for the event.

- 'F' : For Female
- 'M' : For Male

####Age: 
> Used for selecting the ages of the swimmers. For this Parameter it should be noted it is able to select a specific age (Such as ex. 16 years old).

> As well as Open for selecting all swimmers at any age bracket (Such as ex. 0-100 years old). 

> It is also able to select a range.  (Such as ex.13-14 years old  or 18-24 years old or 15-17). Refer to all listed below to see what can be used. It is not an exhaustive list but list all variations or distinct types.

- 'X_X'  : Open (All Age Groups)
- 'X_10' : 10 Years and Younger
- '11-11' : 11 Years Only
- '11-12' : 11 and 12 Years
-  '12-12' , '13-13', ... , '18-18' : All Distict age up to 18 Years
- '13-14' : 13 and 14 Years
- '15-16' : 15 and 16 Years
- '15-17' : 15 to 17 Years
- '17-18' :  17 and 18 Years

####Course:
> Used for selecting the Swim Course Pool Length.

- 'LCM' : For Long Course Metres Swim Meets
- 'SCM' : For Short Course Metres Swim Meets

####Season:

> Used for selecting the year events were swam.

- '-1' : Alltime (Used for selecting best times over all years)
- '2008' : 2008 was the first year times were tracked in this system
- '2009', '2010', ... , '2021' : All Years up until present date

####Club ID:
> Each Swim Club When registered has a respective club ID given to it, We will add more clubs to the list when available but currently if you would like to add your own change the clubID Parameter to be of the club that you are looking for.
-  ex: '72542' (Oakville Aquatic Club)

####Stroke:
