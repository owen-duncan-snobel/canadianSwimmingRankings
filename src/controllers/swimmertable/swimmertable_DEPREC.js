import React from 'react';
import { Component } from 'react'
import ReactTable from '../../components/reactTable/reactTable';

class SwimmerTable extends Component {
    render() {
        let tableData = this.props.tableData;
        if (tableData === null) {
            return (
                <div>
                </div>
            );
        } else {
            // * Convert all Meet Dates into a readable string from Date Value in excel
            try {
                if (tableData[0].length > 1) {
                    // * If there is multiple years for an event to compare convert the data and flatten to single array of swimmer objects
                    tableData.forEach(el => {
                        el.map(item =>
                            item.__EMPTY_10 = new Date(Math.floor(item.__EMPTY_10 - (25567 + 2)) * 86400 * 1000).toDateString().substring(4)
                        );
                    })
                    // * Sort so data is in correct order to graph
                    tableData = tableData.flat().sort((a, b) => a.__EMPTY_8 > b.__EMPTY_8);
                    tableData.map((obj, index) => obj.__EMPTY_9 = index + 1);
                } else {
                    tableData.map((item) =>
                        item.__EMPTY_10 = new Date(Math.floor(item.__EMPTY_10 - (25567 + 2)) * 86400 * 1000).toDateString().substring(4))
                }

            } catch {
                console.log('Error: Data Array is Empty');
            }

            // * Refer to Processing Data for key names, but you filter which you want the table to display cols for
            let allowedKeys = [
                '__EMPTY_3',
                '__EMPTY_6',
                '__EMPTY_7',
                '__EMPTY_9',
                '__EMPTY_10',
                '__EMPTY_11',
                '__EMPTY_12',
            ]
            return (
                <ReactTable tableData={tableData} allowedKeys={allowedKeys} />
            )
        }
    }
}
export default SwimmerTable;

