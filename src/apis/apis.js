// apis/apis.js
import axios from 'axios';
import API_CONFIG from './apiconfig';

// Fetch restaurants
export const fetchRestaurants = (lat, lng) => {
  const url = `${API_CONFIG.API_BASE_URL}?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
  return axios.get(url);
};

// Fetch location suggestions
export const fetchLocationSuggestions = (query) => {
  const url = `${API_CONFIG.LOCATION_API_BASE_URL}/place-autocomplete?input=${query}&types=`;
  return axios.get(url);
};

// Fetch location details
export const fetchLocationDetails = (placeId) => {
  const url = `${API_CONFIG.LOCATION_API_BASE_URL}/address-recommend?place_id=${placeId}`;
  return axios.get(url);
};

// Fetch restaurant specification
export const fetchRestaurantSpec = (restaurantId, lat = 17.37240, lng = 78.43780) => {
  const url = `${API_CONFIG.RESTAURANT_SPEC}&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`;
  return axios.get(url);
};

// Search dishes
export const fetchSearchDishes = (lat, lng, dishName) => {
  const url = `${API_CONFIG.SEARCH_DISHES}?lat=${lat}&lng=${lng}&str=${dishName}&trackingId=2d324f12-ea65-5956-c494-06ea4619cb7b&submitAction=ENTER&queryUniqueId=40a6c7c9-a19c-96dc-8eb5-0a349b87d346`;
  return axios.get(url);
};
// Search restaurants
export const fetchSearchRestaurants = (lat, lng, dishName) => {
  const url = `${API_CONFIG.SEARCH_RESTAURANTS}?lat=${lat}&lng=${lng}&str=${dishName}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=3445c27e-9767-0109-930c-a7c5b2183e33`;
  return axios.get(url);
};
