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
            <TreeItem nodeId="1" label={"Power Rankings Data"}>
                <TreeItem nodeId="2" label={data[0].path.split("/")[1]}>
                    <TreeItem nodeId="3" label="Female">

                    </TreeItem>
                    <TreeItem nodeId="5" label="Male">
                        {ages.map(age => <TreeItem nodeId={age} label={
                            (age == "0") ? "Under 10" : age
                        }>
                            {data.map(n => <TreeItem nodeId="4" label={
                                (n.name.split('_')[3] == age) ? n.name : ''
                            }>
                            </TreeItem>)}
                        </TreeItem>)}
                    </TreeItem>
                </TreeItem>
            </TreeItem>

        </div >

    );
}
function Datasets() {
    let data = require('../datasets/directoryJSON.json');
    let ages = require('../datasets/agesJSON.json');
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
                    <div>{yearAndData(data, ages)}</div>
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