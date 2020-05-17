import React, { Component } from 'react';
import './App.css';
import ProductServices from './services/products';
import Products from './components/products'
import Spinner from './components/spinner'
import SORT_TYPES from './constants/sortTypes'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: SORT_TYPES[0],
      page: 1,
      products: [],
      loadingProducts: false,
      endOfCatalogue: false
    };
    this.ProductServices = new ProductServices();
  }

  componentDidMount() {
    this.fetchProducts()
    document.addEventListener('scroll', this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  fetchProducts = () => {

    const { sort, page, products } = this.state;

    this.setState({ loadingProducts: true })

    this.ProductServices.getProducts(page, sort)
      .then(nextPageProducts => {
        console.log(nextPageProducts.length + ' products loaded for page ' + page);
        if (nextPageProducts.length > 0) {
          this.setState({
            products: [...products, ...nextPageProducts],
            page: page + 1,
            loadingProducts: false
          })
          document.addEventListener('scroll', this.trackScrolling);
        }
        else {
          this.setState({
            endOfCatalogue: true,
            page: page + 1,
            loadingProducts: false
          })
        }
        // commentId: com-listner-2
        // this will add scroll end event listner again
        // which was removed by com-listner-1
      })
      .catch(error => console.log(error.message))
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById('products');
    if (this.isBottom(wrappedElement)) {
      console.log('bottom reached');

      // commentId: com-listner-1
      // remove bottom reached listner or it will keep calling trackScrolling function
      // and will call api multiple times although user did't want to load more products
      // com-listner-2 will add listner again if required
      document.removeEventListener('scroll', this.trackScrolling);

      this.fetchProducts()
    }
  };

  isBottom(el) {
    return el && el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  render() {
    const { products, loadingProducts, endOfCatalogue } = this.state;

    return (
      <div className="App">

        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Products dataArray={products} />

        {loadingProducts && <Spinner />}

        {endOfCatalogue && <span>~ end of catalogue ~</span>}

      </div>
    );
  }
}

export default App;
