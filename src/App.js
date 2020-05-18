import React, { Component } from 'react';
import './assets/styles.css';
import ProductServices from './services/products';
import AdsServices from './services/ads';
import Products from './components/products'
import Spinner from './components/spinner'
import SORT_BY_TYPES, { SORT_TYPES } from './constants/sortTypes'
import Select from './components/select'
import { sortArray } from './components/array';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: SORT_TYPES[0],
      sortBy: SORT_BY_TYPES[0],
      page: 1,
      products: [],
      adUrls: [],
      loadingProducts: false,
      endOfCatalogue: false
    };
    this.ProductServices = new ProductServices();
    this.AdsServices = new AdsServices()
  }

  componentDidMount() {
    this.fetchProducts()
    this.fetchRandomAd()
    document.addEventListener('scroll', this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  fetchRandomAd = (index) => {
    this.AdsServices.getAdUrl()
      .then(nextAdUrl => {
        if (!nextAdUrl) {
          return false
        }
        const { adUrls } = this.state;
        let prevAdUrl = null;

        if (adUrls.length) {
          prevAdUrl = adUrls[adUrls.length - 1]
        }

        if (prevAdUrl === nextAdUrl) {  //don't show same ad twice in a row
          return this.fetchRandomAd()
        }
        else {
          this.setState({ adUrls: [...adUrls, nextAdUrl] })
        }
      })

  }

  fetchProducts = () => {

    const { sortBy, page, products } = this.state;

    this.setState({ loadingProducts: true })

    this.ProductServices.getProducts(page, sortBy)
      .then(nextPageProducts => {
        if (nextPageProducts.length > 0) {
          this.fetchRandomAd();//Ad to be shown after this batch
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

  handleSortByChange = async (event) => {
    await this.setState({ sortBy: event.target.value, products: [] });
    this.fetchProducts()
  }

  handleSortChange = async (event) => {
    this.setState({ sort: event.target.value });
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById('root');
    if (this.isBottom(wrappedElement)) {
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
    const { products, loadingProducts, endOfCatalogue, adUrls, sortBy, sort } = this.state;
    return (
      <div className="container-fluid">

        <header>

          <div className="App App-header">
            <h2>Welcome to Products Grid</h2>
            <p className="App-intro">
              Here you're sure to find a bargain on some of the finest ascii available to purchase.
              Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.
          </p>
          </div>

          <div className="App">
            <p>But first, a word from our sponsors:</p>
            {
              adUrls.length ?
                <img alt="advert" src={adUrls[0]} ></img>
                : null
            }
          </div>

        </header>

        <div className="d-flex flex-row-reverse mx-2">
          <div id="sort mx-1">
            <Select dataArray={SORT_TYPES} value={sort} onChange={this.handleSortChange} />
          </div>

          <div id="sort-by mx-1">
            <Select dataArray={SORT_BY_TYPES} value={sortBy} onChange={this.handleSortByChange} />
          </div>
          <label className="m-1">Sort:</label>
        </div>

        <section id="products-container border">
          <Products
            dataArray={sortArray({
              array: products,
              sortByProperty: sortBy,
              isAscending: sort === 'ascending'
            })}
            adList={adUrls}
          />
        </section>

        <div className="d-block">
          {loadingProducts && <Spinner />}
        </div>

        <div className="d-block">
          {endOfCatalogue && <span>~ end of catalogue ~</span>}
        </div>

      </div >
    );
  }
}

export default App;