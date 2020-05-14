import React from 'react';
import { db } from './Firebase';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import WeightForm from './WeightForm';

const styles = {
    root: {
    }
}

class Cats extends React.PureComponent {
    state = {
        cats: [],
        pounds: 0,
        ozs: 0,
        halfOzs: 0
    }

    changeHandler = (e) => {
        this.setState({ roomNumber: e.target.value })
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

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = () => {

    }

    convertWeight = (pounds, ozs, halfOzs) => {
        let total = 0
        total += halfOzs
        total += (ozs * 10)
        total += (pounds * 16 * 10)
        return total;
    }

    render() {
        const { cats, pounds, ozs, halfOzs } = this.state;

        return (
            <div>
                {cats.length !== 0 &&
                    cats.map((cat, index) => {
                        return (
                            <div key={index}>
                                <div>{cat.name}</div>
                                <div>Room: {cat.room}</div>
                                {
                                    cat.weightData.map(data => {
                                        return (
                                            <div>
                                                <div>{moment(Date(data.seconds)).format('MM/DD/YYYY')}</div>
                                                <div>{data.weight}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        );
    }


}

export default (withStyles(styles)(Cats));