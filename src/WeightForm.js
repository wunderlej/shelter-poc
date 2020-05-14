import React from 'react';
import { db } from './Firebase';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Card, TextField, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        // padding: '15px'
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    formContainer: {
        margin: '10px auto',
        padding: '20px',
        maxWidth: '400px',
        marginTop: '75px'
    },
    titleText: {
        fontSize: '1.25rem',
        fontWeight: 'bold'
    },
    nameTextField: {
        // width: '300px'
    },
    text: {
        // marginRight: 'auto'
        padding: '10px 0'
    },
    numContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    submitButton: {
        width: '150px',
        marginLeft: 'auto'
    }
}

class WeightForm extends React.PureComponent {
    state = {
        cats: [],
        pounds: 0,
        ozs: 0,
        halfOzs: 0,
        ewPounds: 0,
        ewOzs: 0,
        ewHalfOzs: 0,
        calcWeight: 0,
        displayWeight: '0',
        catName: ''
    }

    changeHandler = (e) => {
        this.setState({ roomNumber: e.target.value })
    }

    componentDidMount() {
        // this.getAllCats();
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

    handleNumChange = (e) => {
        if (e.target.value !== "") {
            this.setState({ [e.target.name]: parseInt(e.target.value) })
        } else {
            this.setState({ [e.target.name]: "" })
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = () => {

    }

    convertWeight = (pounds, ozs, halfOzs, ewPounds, ewOzs, ewHalfOzs) => {
        let calcHalfOzs = 0;
        calcHalfOzs += (pounds * 16 * 10) + (ozs * 10) + halfOzs
        calcHalfOzs -= (ewPounds * 16 * 10) + (ewOzs * 10) + ewHalfOzs

        let leftOverHalfOzs = calcHalfOzs % 10
        let calcOzs = Math.floor(calcHalfOzs / 10)
        let leftOverOzs = calcOzs % 16
        let calcPounds = Math.floor(calcOzs / 16)
        this.setState({ displayWeight: `${calcPounds} lbs ${leftOverOzs} ozs ${leftOverHalfOzs} hozs` })
    }

    render() {
        const { cats, pounds, ozs, halfOzs, ewPounds, ewOzs, ewHalfOzs, calcWeight, displayWeight, catName } = this.state;
        const { classes } = this.props;
        return (
            <Card className={classes.formContainer}>
                <form className={classes.root}>
                    <Typography gutterBottom className={classes.titleText}>Weight Calculator</Typography>
                    <TextField type='text' name='catName' value={catName} onChange={this.handleChange} label="Cat Name" variant="outlined" size="small" className={classes.nameTextField} />
                    <Typography gutterBottom className={classes.text}>Initial Weight</Typography>
                    <div className={classes.numContainer}>
                        <TextField type='number' name='pounds' value={pounds} onChange={this.handleNumChange} label="lbs" variant="outlined" size="small" onBlur={() => this.convertWeight(pounds, ozs, halfOzs, ewPounds, ewOzs, ewHalfOzs)} />
                        <TextField type='number' name='ozs' value={ozs} onChange={this.handleNumChange} label="ozs" variant="outlined" size="small" onBlur={() => this.convertWeight(pounds, ozs, halfOzs, ewPounds, ewOzs, ewHalfOzs)} />
                        <TextField type='number' name='halfOzs' value={halfOzs} onChange={this.handleNumChange} label="hozs" variant="outlined" size="small" onBlur={() => this.convertWeight(pounds, ozs, halfOzs, ewPounds, ewOzs, ewHalfOzs)} />
                    </div>
                    <Typography gutterBottom className={classes.text}>Excess Weight</Typography>
                    <div className={classes.numContainer}>
                        <TextField type='number' name='ewPounds' value={ewPounds} onChange={this.handleNumChange} label="lbs" variant="outlined" size="small" onBlur={() => this.convertWeight(pounds, ozs, halfOzs, ewPounds, ewOzs, ewHalfOzs)} />
                        <TextField type='number' name='ewOzs' value={ewOzs} onChange={this.handleNumChange} label="ozs" variant="outlined" size="small" onBlur={() => this.convertWeight(pounds, ozs, halfOzs, ewPounds, ewOzs, ewHalfOzs)} />
                        <TextField type='number' name='ewHalfOzs' value={ewHalfOzs} onChange={this.handleNumChange} label="hozs" variant="outlined" size="small" onBlur={() => this.convertWeight(pounds, ozs, halfOzs, ewPounds, ewOzs, ewHalfOzs)} />
                    </div>
                    <div className={classes.text}>Calculated Weight: {displayWeight}</div>
                    {/* <Button variant="contained" color="primary" onClick={() => this.convertWeight(pounds, ozs, halfOzs, ewPounds, ewOzs, ewHalfOzs)}>Calculate</Button> */}
                    <Button endIcon={<SendIcon />} variant="contained" color="primary" className={classes.submitButton}>Submit</Button>
                </form>
            </Card>
        );
    }


}

export default (withStyles(styles)(WeightForm));