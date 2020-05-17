import config from '../config'
import { handleError, handleResponseError } from '../utils/error'
class ProductServices {
    async getProducts(page, sort) {
        let url = this.createUrl(page, sort);
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    handleResponseError(response);
                }
                return response.json();
            })
            .catch(error => {
                handleError(error)
            });
    }

    //This will help us to create a general "getProducts" service for 4 different calls
    //1. if we have page and sort type
    //2. if we have page but not sort type
    //3. if we don't have page but have sort type
    //4. if we dont' have page nor sort type

    createUrl(page, sort) {
        if (page && sort)
            return config.PRODUCTS_URL + `/_page=${page}&_sort=${sort}`
        else if (page && !sort)
            return config.PRODUCTS_URL + `/_page=${page}`
        else if (!page && sort)
            return config.PRODUCTS_URL + `/_sort=${sort}`
        else
            return config.PRODUCTS_URL
    }
}
export default ProductServices;