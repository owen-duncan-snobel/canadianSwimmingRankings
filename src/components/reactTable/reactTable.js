import React from 'react';
import { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { JSON_ATTRIBUTES } from '../../constants/swimmingConstants/swimmingConstants';

class ReactTable extends Component {

    render() {
        // * If an Array is passed it creates the table from array instead of an object

        try {
            console.log(this.props.tableData)
            return (<Table size='sm' responsive className="swimTable colBorder">
                <thead>
                    <tr>
                        {this.props.allowedKeys.map(key => {
                            return (
                                <th key={JSON_ATTRIBUTES[key]} name={JSON_ATTRIBUTES[key]} >
                                    {JSON_ATTRIBUTES[key]}
                                </th>
                            )
                        })}

                    </tr>

                </thead>

                <tbody key="swimTableData" name="swimTableData">
                    {
                        this.props.tableData.map(item => {
                            return (<tr key={Object.entries(item).toString()}>{
                                Object.entries(item).filter(([key, value]) => this.props.allowedKeys.includes(key))
                                    .map(([key, value]) => {
                                        return (<td key={key + value}>{value}</td>)
                                    })
                            }
                            </tr>)
                        })
                    }
                </tbody>
            </Table>)
        } catch {
            console.log('Error: Unable to create a table with data. Check to see if data passed in null')
            return (
                <div></div>
            )
        }
    }

}
export default ReactTable;