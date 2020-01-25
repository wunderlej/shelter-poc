import React from 'react';
import './App.css';

const catExample = {
  name: "Tormund",
  room: 1,
  picture: "image.png",
  data: {
    date: Date,
    weight: 0.0
  }
}

class App extends React.Component {

  state = {
    name: "",
    weight: 0.0
  }

  changeHandler = () => {

  }

  render() {

    const roomNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, "Hall", "Office"]


    return (
      <div className="App">
        <div className="">Please select your room:
          <select>
            {roomNumbers.map(num => {
              return <option>{num}</option>
            })}
          </select>
        </div>

        <div className="pet-container">
          <h3>Cat Information</h3>
          <form className="form-container">
            <label>Name: <input type="text" autoFocus /></label>
            <div>
              <label>lbs: <input type="number" max="25" min="0" /></label><label>oz: <input type="number" max="15.5" min="0" /></label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }


}

export default App;
