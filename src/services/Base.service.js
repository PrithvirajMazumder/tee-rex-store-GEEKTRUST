export default class BaseService {
    BASE_URL = 'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart';

    getApiUrl = (url) => `${this.BASE_URL}/${url}`;
}