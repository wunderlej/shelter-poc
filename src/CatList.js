import React from 'react';
import { db } from './Firebase';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import WeightForm from './WeightForm';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import ArchiveIcon from '@material-ui/icons/Archive';
import { Button } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import CreateCatForm from './CreateCatForm';

const styles = {
    root: {
        marginTop: '75px'
    },
    addCatButton: {
        margin: '10px'
    }
}

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

class CatList extends React.PureComponent {
    state = {
        cats: [],
        tableCellOpen: false
    }

    componentDidMount() {
        this.getAllCats();
    }

    getAllCats = () => {
        db.collection('cats')
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data);
                this.setState({ cats: data });
            })
    }

    openCellToggle = () => {
        this.setState({ tableCellOpen: !this.state.tableCellOpen })
    }

    render() {
        const { cats, tableCellOpen } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CreateCatForm/>
                <Button size="small" variant="contained" color="primary" className={classes.addCatButton}>Add New Cat</Button>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Room</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cats.map((row, index) => (
                                <React.Fragment key={index}>
                                    <TableRow>
                                        <TableCell>
                                            <IconButton aria-label="expand row" size="small" onClick={() => this.setState({ tableCellOpen: !tableCellOpen })}>
                                                {tableCellOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.room}</TableCell>
                                        <TableCell align="right">
                                            <IconButton size="small">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton size="small">
                                                <ArchiveIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                                            <Collapse in={tableCellOpen} timeout="auto" unmountOnExit>
                                                <Box margin={1}>
                                                    <Typography variant="h6" gutterBottom component="div">
                                                        Recent Weights
                                                                </Typography>
                                                    <Table size="small" aria-label="purchases">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Date</TableCell>
                                                                <TableCell>Weight</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {row.weightData.map((historyRow) => (
                                                                <TableRow key={historyRow.date}>
                                                                    <TableCell component="th" scope="row">
                                                                        {moment(historyRow.date.seconds).format('MM-DD-YYYY')}
                                                                    </TableCell>
                                                                    <TableCell>{historyRow.weight}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Line data={data} />
            </div>
        );
    }


}

export default (withStyles(styles)(CatList));