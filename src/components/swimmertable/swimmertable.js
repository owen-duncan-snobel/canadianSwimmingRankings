import React from 'react';
import { Component } from 'react'
import Table from 'react-bootstrap/Table';


class SwimmerTable extends Component {
    render() {
        if (this.props.tableData === null) {
            return (
                <div>
                </div>
            );
        } else {
            // * Convert all Meet Dates into a readable string from Date Value in excel
            try {
                this.props.tableData.map(item => item.__EMPTY_10 = new Date(Math.floor(item.__EMPTY_10 - (25567 + 2)) * 86400 * 1000).toDateString().substring(4));
            } catch {
                console.log('Error: Data Array is Empty');
            }
            let allowedKeys = [
                // '__EMPTY',               GENDER IS REDUNDANT
                // '__EMPTY_1',             DISTANCE IS REDUNDANT
                // '__EMPTY_2',             STROKE IS REDUNDANT
                '__EMPTY_3',
                //  '__EMPTY_4',            BIRTHDATE NOT IMPORTANT CURRENTLY EITHER
                //'__EMPTY_5',              NATION IS NOT CURRENTLY NEEDED SINCE IT IS ONLY ONE CLUB
                '__EMPTY_6',
                '__EMPTY_7',
                '__EMPTY_9',
                '__EMPTY_10',           //  MEETDATE
                '__EMPTY_11',
                '__EMPTY_12',
                //'__EMPTY_13'              CLUB NAME IS REDUNDANT WITH CLUB CODE LISTED
            ]

            return (
                <Table size='sm' responsive className="swimTable colBorder">
                    <thead>
                        <tr>
                            <th>Fullname</th>
                            {/* <th>Nation</th>  */}
                            <th>Clubcode</th>
                            <th>Time</th>
                            <th>Place</th>
                            <th>Meetdate</th>
                            <th>Meetcity</th>
                            <th>Meet</th>
                            {/* <th>Clubname</th> */}

                        </tr>
                    </thead>

                    <tbody key="swimTableData" name="swimTableData">
                        {
                            this.props.tableData.map(item => {
                                return (<tr key={item.__EMPTY_9} name={item.__EMPTY_9}>{
                                    Object.entries(item).filter(([key, value]) => allowedKeys.includes(key))
                                        .map(([key, value]) => {
                                            return (<td key={value}>{value}</td>)
                                        })
                                }
                                </tr>)
                            })
                        }
                    </tbody>
                </Table>
            )
        }
    }
}
export default SwimmerTable;

