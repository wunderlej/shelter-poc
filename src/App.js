import React from 'react';
import './App.css';

const data = [
  {
    name: "Tormund",
    room: "1",
    picture: "image.png",
    data: {
      date: Date,
      weight: 0.0
    }
  },
  {
    name: "Sandor",
    room: "2",
    picture: "image.png",
    data: {
      date: Date,
      weight: 0.0
    }
  },
  {
    name: "Girl Cat",
    room: "2",
    picture: "image.png",
    data: {
      date: Date,
      weight: 0.0
    }
  }
]

const roomNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, "Hall", "Office"]

class App extends React.Component {

  state = {
    roomNumber: "1"
  }

  changeHandler = (e) => {
    this.setState({ roomNumber: e.target.value })
  }

  componentDidMount() {

  }

  render() {

    let filteredData =
      data.filter(cat => {
        return cat.room === this.state.roomNumber
      })
    console.log(filteredData)

    return (
      <div className="App">
        <div className="">Please select your room:
          <select value={this.state.roomNumber} onChange={this.changeHandler}>
            {roomNumbers.map((num, i) => {
              return <option key={i}>{num}</option>
            })}
          </select>
        </div>

        <div className="pet-container">
          <h3>Cat Information</h3>
          {/* <form className="form-container">
            <label>Name: <input type="text" autoFocus /></label>
            <div>
              <label>lbs: <input type="number" max="25" min="0" /></label><label>oz: <input type="number" max="15.5" min="0" /></label>
            </div>
            <button type="submit">Submit</button>
          </form> */}
        </div>
        <div>
          {filteredData.map((cat, i) => {
            return <h1 key={i}>{cat.name}</h1>
          })}
        </div>

      </div>
    );
  }


}

export default App;
