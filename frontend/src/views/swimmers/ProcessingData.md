# Canadian Swimming Rankings   <img src="https://i.gyazo.com/5931b368adbf4d985e24f37012cebbc3.png" width="50" height="50">
### Processing Swimmer Data:

#### Events Naming Convention:
For every Event Name seen in the left column, there is  a corresponding "Event Shortform" naming convention which is used in the Workbooks naming of the Event Sheets. This can be found on is on the right Column. Since naming conventions of the Sheets can change in the future refer to table for current corresponding short forms.

Example Usage:    Excel Workbook with Sheets (50m Fr, 100m Fr, 200m Br, ... , 1500m Fr)
  // ddl_event are the list of events from the drop down form. 

     let event = formdata.get('ddl_event');
     let data = workbook.Sheets[event];

or 

	let data = workbook.Sheets['1500m Fr'];

| Event Name  |  Short Form Sheet Name |
| ------------ | ------------ |
|50m Free |50m Fr | 
| 100m Free|100m Fr | 
| 200m Free| 200m Fr | 
| 400m Free| 400m Fr | 
| 800m Free | 800m Fr | 
| 1500m Free| 1500m Fr | 
| 50m Back| 50m Bk | 
| 100m Back| 100m Bk | 
| 200m Back | 200m Bk | 
| 50m Breast| 50m Br | 
| 100m Breast|100m Br | 
| 200m Breast | 200m Br | 
| 50m Butterfly | 50m Bu | 
| 100m Butterfly| 100m Bu | 
| 200m Butterfly | 200m Bu | 
| 100m Individual Medley |100m Me | 
| 200m Individual Medley |200m Me | 
| 400m Individual Medley |400m Me | 




#### JSON Array / Excel Rows Column Schematics

The Following is a breakdown of how the Columns in the JSON Array / Excel tables sheets rows are named. **REFER** to this when looking for what attribute property is needed for the corresponding data graphing or collection.

| JSON Attribute / Excel Column Name   | Data Column Holds   | INDEX | Data Type |
| ------------ | ------------ |  ------------ | ------------ |
| __EMPTY  | "GENDER"   |     0 | String: "M" or "F"
| __EMPTY_1 | "DISTANCE"   |  1 |  Number: 25,50,100,200,400,800,1500
| __EMPTY_2  | "STROKE"  |    2 |  String: "Fr" or "Bk" or "Br" or "Bu" or "Me"
| __EMPTY_3  | "FULLNAME"   | 3 | String: "___"
| __EMPTY_4 | "BIRTHDATE"   | 4 | Epoch_Time
| __EMPTY_5 | "NATION"  |     5 | String: "CAN", ... , "MEX"
| __EMPTY_6   | "CLUBCODE"  | 6 | String: "OAK" , ... ,
| __EMPTY_7  | "SWIMTIME" **(Time as a string)  **| 7 | String: "25.62" in seconds s.MM
| __EMPTY_8  | "SWIMTIME_N" **(Time as a number) ** | 8 | Decimal_Number: 25.62 seconds s.MM
| __EMPTY_9  | "PLACE"   | 9 | Integer: 1,2,3,4,...,50
| __EMPTY_10  | "MEETDATE"  | 10 | Epoch_Time
| __EMPTY_11  | "MEETCITY"  | 11 | String: "Toronto"
|  __EMPTY_12 | "MEETNAME"  | 12 | String: "Dr. Ralph Hicken ..."
| __EMPTY_13  | "CLUBNAME"  | 13 | String: "Oakville Aquatic Club"


Custom Added Properties (NOT INCLUDED IN FETCHED EXAMPLES BUT ADDED AFTER FOR TABLE DISPLAY)

| JSON Attribute / Excel Column Name   | Data Column Holds |
| ------------ | ------------ | 
| __EMPTY_14: '# Occurrences' |    |
| __EMPTY_15: '' |
| __EMPTY_16: 'Average Time' | AVERAGE_TIME   |
| __EMPTY_17: 'Standard Deviation' | 

** MIGHT ADD A NESTED PROPERTY THAT CONTAINS ALL THE STATS FROM THE RESPECTIVE SHEET
Example Usage:  Collect Alltimes From every swimmer in the Event 

     let data = workbook.Sheets[event];
     let toJSON = XLSX.utils.sheet_to_json(data);
     let times = toJSON.map(time => time.__EMPTY_8)

Results is an array with all the times from the Swimmers from the Event (Corresponding Sheet with whatever Event was selected)
