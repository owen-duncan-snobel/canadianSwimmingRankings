import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles({
    root: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
        // Color for font in the drop down menu
        color: "#333"
    },
    ChevronRightIcon: {
        backgroundColor: "yellow"
    }
});
{/* Useful for displaying the contents of csv datasets */ }


{/*
const divStyle = {
    textAlign: 'center',
    backgroundColor: 'lightblue',
};
*/ }

{/* NEED TO GO BACK AND MAKE AN ARRAY OF ALL FOLDERS AND PUSH THE FOLDERS INTO A ROW */ }
{/* ALSO NEED TO SEE HOW WHEN DATA IS UPDATED IT IS ADDED TO SITE IDEALLY DYNAMICALLY BOOTSTRAP CHECKS SERVER AND JUST UPDATE*/ }

// CONSIDER USING JSON EVENTS AND AGE LIST TO CREATE THE DROP DOWN. EXPORT THEM AS JSON AND USE TO FORMAT
const yearAndData = (data, ages) => {
    return (
        <div>
            <TreeItem nodeId="Power Rankings Data" label={"Power Rankings Data"}>
                {/* Render all the csv files by creating a nested tree components to allow 
                    users the ability to download the files from a certain height
                */}
                {data.map(function (x) {
                    return (
                        <TreeItem nodeId={x.name} label={x.name} >
                            {/* Mapping for year nestings */}
                            {x.children.map(function (y) {
                                return (
                                    < TreeItem nodeId={y.name} label={y.name}>
                                        {/* Mapping for Course (short / long) nestings */}
                                        {y.children.map(function (z) {
                                            return (
                                                <TreeItem nodeId={z.name} label={z.name}>
                                                    {/* Mapping for Ages nestings */}
                                                    {z.children.map(function (m) {
                                                        return (
                                                            <TreeItem nodeId={m.name} label={m.name}>
                                                                {/* Mapping for Events nestings */}
                                                                {m.children.map(function (m) {
                                                                    return (
                                                                        <TreeItem nodeId={m.name} label={m.name} />
                                                                    )
                                                                })}
                                                            </TreeItem>
                                                        )
                                                    })}
                                                </TreeItem>
                                            )
                                        })}
                                    </TreeItem>
                                )
                            })}
                        </TreeItem>
                    )
                })}
            </TreeItem>
        </div>

    );
}
function Datasets() {
    let data = require('./dirTree.json');
    // Sort the Year data to be in the correct order
    data = data.sort((a, b) => parseInt(b.name.slice(0, 4)) - parseInt(a.name.slice(0, 4)));
    // console.log(data);
    const classes = useStyles();
    return (
        <Container>
            <Row>
                <TreeView
                    className={classes.root}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    <div>{yearAndData(data)}</div>
                    {/*}
                    <TreeItem nodeId="0" label="TOP NODE">
                        {data.map(n => <TreeItem nodeId="1" label={n.path.split('/')[1]} />)}
    </TreeItem> */}
                </TreeView>
            </Row>
        </Container>

    );
}
export default Datasets;