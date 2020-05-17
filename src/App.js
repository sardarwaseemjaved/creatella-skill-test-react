import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    fetch('/products')
      .then(response => response.json())
      .then(json => {
        setTimeout(_ => {
          this.setState({
            data: json
          });
        }, 2000);

      });
  }

  render() {
    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {JSON.stringify(this.state.data)}

      </div>
    );
  }
}

export default App;
