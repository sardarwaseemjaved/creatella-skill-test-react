import React, { Component } from 'react';
import './App.css';
import ProductServices from './services/products';
import AdsServices from './services/ads';
import Products from './components/products'
import Spinner from './components/spinner'
import SORT_TYPES from './constants/sortTypes'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: SORT_TYPES[0],
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
        if (!nextAdUrl)
          return false
        console.log('nextAdUrl:', nextAdUrl)
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

        // if (!nextAd)
        // return alert('Make sure Ads blocker is disabled.');
        // let nextAdUrl = URL.createObjectURL(nextAd) // create url to use as image source
        // console.log('nextAdUrl:', nextAdUrl, 'lastAdUrl:', lastAdUrl, lastAdUrl == lastAdUrl)
        // if (lastAdUrl && (lastAdUrl === nextAdUrl)) { //don't show same ad twice in a row
        //   console.log('lastAdUrl:', lastAdUrl && (lastAdUrl === nextAdUrl))
        // return this.fetchRandomAd();
        // }
        // else {
        //   this.setState({ lastAdUrl: nextAdUrl })
        //   return nextAdUrl;
        // }
      })

  }

  fetchProducts = () => {

    const { sortBy, page, products } = this.state;

    this.setState({ loadingProducts: true })

    this.ProductServices.getProducts(page, sortBy)
      .then(nextPageProducts => {
        console.log(nextPageProducts.length + ' products loaded for page ' + page);
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

  handleSortingChange = async (event) => {
    await this.setState({ sortBy: event.target.value, products: [] });
    this.fetchProducts()
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById('root');
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
    const { products, loadingProducts, endOfCatalogue, adUrls, sortBy } = this.state;
    console.log('adUrls:', JSON.stringify(adUrls));

    return (
      <div className="App">

        <div className="App-header">
          <h2>Welcome to Products Grid</h2>
          <p className="App-intro">
            Here you're sure to find a bargain on some of the finest ascii available to purchase.
            Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.
          </p>
        </div>
        {console.log(adUrls[0])}
        {
          adUrls.length ?
            <img alt="advert" src={adUrls[0]} ></img>
            : null
        }
        <label>Sort by:</label>
        <select value={sortBy} onChange={this.handleSortingChange} id="sort-by">
          {
            SORT_TYPES.map(type => <option value={type}>{type}</option>)
          }
        </select>
        <Products dataArray={products} adList={adUrls} />

        {loadingProducts && <Spinner />}

        {endOfCatalogue && <span>~ end of catalogue ~</span>}

      </div >
    );
  }
}

export default App;
