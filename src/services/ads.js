import config from '../config'
import { handleError, handleResponseError } from '../utils/error'
class AdsServices { 
    async getAdUrl() {
        let url = config.ADS_URL + "r=" + Math.floor(Math.random() * 1000)
        console.log('url:', url); 
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    handleResponseError(response);
                }
                return response.blob();
            })
            .then(nextAd => URL.createObjectURL(nextAd))
            .catch(error => {
                handleError(error)
            });
    }

}
export default AdsServices;