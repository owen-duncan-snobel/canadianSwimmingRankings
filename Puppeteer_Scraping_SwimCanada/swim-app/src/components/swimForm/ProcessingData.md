# Canadian Swimming Rankings
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


------------


#### JSON Array / Excel Rows Column Schematics

The Following is a breakdown of how the Columns in the JSON Array / Excel tables sheets rows are named. **REFER** to this when looking for what attribute property is needed for the corresponding data graphing or collection.

| JSON Attribute / Excel Column Name   | Data Column Holds   |
| ------------ | ------------ |
| __EMPTY  | "GENDER"   |
| __EMPTY_1 | "DISTANCE"   | 
| __EMPTY_2  | "STROKE"  |
| __EMPTY_3  | "FULLNAME"   |
| __EMPTY_4 | "BIRTHDATE"   |
| __EMPTY_5 | "NATION"  |
| __EMPTY_6   | "CLUBCODE"  |
| __EMPTY_7  | "SWIMTIME"  |
| __EMPTY_8  | "SWIMTIME_N"  |
| __EMPTY9  | "PLACE"   |
| __EMPTY_10  | "MEETDATE"  |
| __EMPTY_11  | "MEETCITY"  |
|  __EMPTY_12 | "MEETNAME"  |
| __EMPTY_13  | "CLUBNAME"  |

Example Usage:  Collect Alltimes From every swimmer in the Event 

     let data = workbook.Sheets[event];
     let toJSON = XLSX.utils.sheet_to_json(data);
     let times = toJSON.map(time => time.__EMPTY_8)

Results is an array with all the times from the Swimmers from the Event (Corresponding Sheet with whatever Event was selected)