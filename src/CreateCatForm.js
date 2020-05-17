import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Typography, IconButton } from '@material-ui/core';


const styles = {
    root: {
        marginTop: '75px',
        padding: '15px',
        margin: '7.5px'
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    textLabel: {
        margin: '10px 0',
        fontSize: '1rem'
    },
    nameTextField: {
        marginBottom: '10px'
    },
    dateWeightContainer: {
        display: 'flex',
        marginBottom: '5px'
    },
    dateTextField: {
        minWidth: '160px',
        marginRight: '5px'
    },
    weightContainer: {
        display: 'flex'
    },
    weightTextField: {
        margin: '0 2.5px'
    },
    addOrSubtractContainer: {
        marginLeft: 'auto'
    }
}

class CreateCatForm extends React.PureComponent {

    state = {
        name: '',
        room: '',
        weightData: [
            {
                data: '',
                weight: 0
            }
        ]
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    addNewWeightDate = () => {
        let newArray = [...this.state.weightData]
        newArray.push({ data: '', weight: 0 })
        this.setState({ weightData: newArray })
    }

    subtractNewWeightDate = () => {
        let newArray = [...this.state.weightData]
        newArray.pop()
        this.setState({ weightData: newArray })
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
        const { name, room, weightData } = this.state;
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <form className={classes.formContainer}>
                    <Typography className={classes.textLabel}>Cat Information</Typography>
                    <TextField variant="outlined" label="Name" type="text" color="primary" name="name" value={name} onChange={this.handleChange} autoFocus className={classes.nameTextField} />
                    <TextField variant="outlined" label="Room #" type="text" color="primary" name="room" value={room} onChange={this.handleChange} />
                    <Typography className={classes.textLabel}>Weight Data</Typography>
                    {weightData.map((data, index) => (
                        <div className={classes.dateWeightContainer} key={index}>
                            <TextField variant="outlined" type="date" color="primary" className={classes.dateTextField} />
                            <div className={classes.weightContainer}>
                                <TextField variant="outlined" label="lbs" type="int" color="primary" className={classes.weightTextField} />
                                <TextField variant="outlined" label="ozs" type="int" color="primary" className={classes.weightTextField} />
                                <TextField variant="outlined" label="hoz" type="int" color="primary" className={classes.weightTextField} />
                            </div>
                        </div>
                    ))}
                    <div className={classes.addOrSubtractContainer}>
                        <IconButton onClick={this.addNewWeightDate} color="primary">+</IconButton>
                        <IconButton onClick={this.subtractNewWeightDate} color="primary">-</IconButton>
                    </div>

                    <Button color="primary">Submit</Button>
                </form>
            </Paper>
        );
    }


}

export default (withStyles(styles)(CreateCatForm));