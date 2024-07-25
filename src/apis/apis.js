import axios from 'axios';

const API_BASE_URL = 'https://www.swiggy.com/dapi/restaurants/list/v5';

export const fetchRestaurants = (lat, lng) => {
  return axios.get(`${API_BASE_URL}?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);
};
// Location API
const LOCATION_API_BASE_URL = 'https://www.swiggy.com/dapi/misc';

export const fetchLocationSuggestions = (query) => {
  return axios.get(`${LOCATION_API_BASE_URL}/place-autocomplete?input=${query}&types=`);
};

export const fetchLocationDetails = (placeId) => {
  return axios.get(`${LOCATION_API_BASE_URL}/address-recommend?place_id=${placeId}`);
};

// restaurantspec

const Restaurantspec = 'https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true';

export const fetchRestaurantSpec = (restaurantId, lat = 17.37240, lng = 78.43780) => {
  return axios.get(`${Restaurantspec}&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`);
};

// search dishes
const SearchDishes = 'https://www.swiggy.com/dapi/restaurants/search/v3';

export const fetchDishes = (lat, lng, dishName) => {
  const url = `${SearchDishes}?lat=${lat}&lng=${lng}&str=${dishName}&trackingId=c51c1c22-a61f-5af6-3f56-1ea2aa05c7ac&submitAction=ENTER&queryUniqueId=239a5db1-ac00-4ce1-28c4-b7129fa41fab`;
  return axios.get(url);
};

// search Restaurants
// apis/apiConfig.js
const SearchRestaurants = 'https://www.swiggy.com/dapi/restaurants/search/v3';

export const fetchSearchRestaurants = (lat, lng, dishName) => {
  const url = `${SearchRestaurants}?lat=${lat}&lng=${lng}&str=${dishName}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=3445c27e-9767-0109-930c-a7c5b2183e33`;
  return axios.get(url);
};
