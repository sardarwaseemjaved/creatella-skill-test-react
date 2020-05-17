import React, { Component } from 'react';
import './App.css';
import ProductServices from './services/products';
import Products from './components/products'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.ProductServices = new ProductServices();
  }

  componentDidMount() {
    this.fetchProducts()
  }

  fetchProducts = () => {
    this.ProductServices.getProducts().then(products => this.setState({ products }));
  }

  render() {
    const { products } = this.state;

    return (
      <div className="App">

        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Products dataArray={products} />

      </div>
    );
  }
}

export default App;
