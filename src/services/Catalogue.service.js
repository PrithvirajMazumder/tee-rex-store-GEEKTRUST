import axios from "axios";
import BaseService from "./Base.service";

export default class CatalogueService extends BaseService {
    END_POINT = 'catalogue.json';

    getProducts = async () => {
        return await axios.get(this.getApiUrl(this.END_POINT))
            .then(resp => resp.data)
            .catch(error => {
                throw (error.message);
            });
    }
}