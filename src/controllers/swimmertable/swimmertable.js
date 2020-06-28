import React from 'react';
import { Component } from 'react'
import ReactTable from '../../components/reactTable/reactTable';

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
                <ReactTable tableData={this.props.tableData} allowedKeys={allowedKeys} />
            )
        }
    }
}
export default SwimmerTable;

