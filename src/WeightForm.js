import React from 'react';
import { db } from './Firebase';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Card, TextField, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        width: '800px',
        margin: '10px auto',
        padding: '10px'
    },
    text: {
        textAlign: 'left'
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
        displayWeight: '0'
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

    handleChange = (e) => {
        if (e.target.value !== "") {
            this.setState({ [e.target.name]: parseInt(e.target.value) })
        } else {
            this.setState({ [e.target.name]: "" })
        }
    }

    // handleBlur = (e) => {
    //     let inputNum = parseInt(e.target.value)
    //     switch (e.target.name) {
    //         case 'pounds':
    //             console.log(inputNum)
    //             console.log(this.state.pounds)
    //             if (this.state.pounds === inputNum) {
    //                 this.setState({ calcWeight: this.state.calcWeight + (inputNum * 16 * 10) })
    //             }
    //             break;
    //         case 'ozs':
    //             if (this.state.ozs !== inputNum) {
    //                 this.setState({ calcWeight: this.state.calcWeight + (inputNum * 10) })
    //             }
    //             break;
    //         case 'halfOzs':
    //             if (this.state.halfOzs !== inputNum) {
    //                 this.setState({ calcWeight: this.state.calcWeight + inputNum })
    //             }
    //             break;
    //         case 'ewPounds':
    //             if (this.state.ewPounds !== inputNum) {
    //                 this.setState({ calcWeight: this.state.calcWeight - (inputNum * 16 * 10) })
    //             }
    //             break;
    //         case 'ewOzs':
    //             if (this.state.ewOzs !== inputNum) {
    //                 this.setState({ calcWeight: this.state.calcWeight - (inputNum * 10) })
    //             }
    //             break;
    //         case 'ewHalfOzs':
    //             if (this.state.ewHalfOzs !== inputNum) {
    //                 this.setState({ calcWeight: this.state.calcWeight - inputNum })
    //             }
    //             break;
    //     }
    // }

    handleSubmit = () => {

    }

    convertWeight = (pounds, ozs, halfOzs, ewPounds, ewOzs, ewHalfOzs) => {
        let calcHalfOzs = 0;
        calcHalfOzs += (pounds * 16 * 10) + (ozs * 10) + halfOzs
        calcHalfOzs -= (ewPounds * 16 * 10) + (ewOzs * 10) + ewHalfOzs

        let leftOverHalfOzs = calcHalfOzs % 10
        let calcOzs = Math.floor(calcHalfOzs / 10)
        this.setState({ displayWeight: `${calcOzs} ozs ${leftOverHalfOzs} hozs` })
    }

    render() {
        const { cats, pounds, ozs, halfOzs, ewPounds, ewOzs, ewHalfOzs, calcWeight, displayWeight } = this.state;
        const { classes } = this.props;
        return (
            <Card className={classes.formContainer}>
                <form className={classes.root}>
                    <Typography gutterBottom className={classes.text}>Initial Weight</Typography>
                    <div>
                        <TextField type='number' name='pounds' value={pounds} onChange={this.handleChange} label="lbs" variant="outlined" size="small" />
                        <TextField type='number' name='ozs' value={ozs} onChange={this.handleChange} label="ozs" variant="outlined" size="small" />
                        <TextField type='number' name='halfOzs' value={halfOzs} onChange={this.handleChange} label="hozs" variant="outlined" size="small" />
                    </div>
                    <Typography gutterBottom className={classes.text}>Excess Weight</Typography>
                    <div>
                        <TextField type='number' name='ewPounds' value={ewPounds} onChange={this.handleChange} label="lbs" variant="outlined" size="small" />
                        <TextField type='number' name='ewOzs' value={ewOzs} onChange={this.handleChange} label="ozs" variant="outlined" size="small" />
                        <TextField type='number' name='ewHalfOzs' value={ewHalfOzs} onChange={this.handleChange} label="hozs" variant="outlined" size="small" />
                    </div>
                    <div className={classes.text}>Calculated Weight: {displayWeight}</div>
                    <Button variant="contained" color="primary" onClick={() => this.convertWeight(pounds, ozs, halfOzs, ewPounds, ewOzs, ewHalfOzs)}>Calculate</Button>
                    <Button variant="contained" color="primary">Submit</Button>
                </form>
            </Card>
        );
    }


}

export default (withStyles(styles)(WeightForm));