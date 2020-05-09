import React from 'react';
import { Component } from 'react'
import Table from 'react-bootstrap/Table';


class SwimmerTable extends Component {
    render() {
        if (this.props.tableBody === null) {
            return (
                <div>
                </div>
            );
        } else {

            let allowedKeys = [
                // '__EMPTY',               GENDER IS REDUNDANT
                // '__EMPTY_1',             DISTANCE IS REDUNDANT
                // '__EMPTY_2',             STROKE IS REDUNDANT
                '__EMPTY_3',
                //  '__EMPTY_4',            BIRTHDATE NOT IMPORTANT CURRENTLY EITHER
                '__EMPTY_5',
                '__EMPTY_6',
                '__EMPTY_7',
                '__EMPTY_9',
                //                          MEETDATE NOT IMPORTANT CURRENTLY AS DATE IS UNREADABLE  '__EMPTY_10',
                '__EMPTY_11',
                '__EMPTY_12',
                '__EMPTY_13']

            return (
                <Table size='sm' className="swimTable">
                    <thead>
                        <tr>
                            <th>Fullname</th>
                            <th>Nation</th>
                            <th>Clubcode</th>
                            <th>Time</th>
                            <th>Place</th>
                            <th>Meetcity</th>
                            <th>Meet</th>
                            <th>Clubname</th>
                        </tr>
                    </thead>

                    <tbody key="swimTableData" name="swimTableData">
                        {
                            this.props.tableBody.map(item => {
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

