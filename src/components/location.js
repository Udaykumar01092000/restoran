import React, { useState, useEffect } from 'react';
import { fetchLocationSuggestions, fetchLocationDetails } from '../apis/apis'; // Import from the unified API file
import './location.css';

const LocationSelector = ({handleModalClose, setLocation }) => {
  const [userLocationSearch, setUserLocationSearch] = useState("");
  const [locationSuggestion, setLocationSuggestion] = useState([]);

  useEffect(() => {
    if (userLocationSearch) {
      fetchLocationSuggestions(userLocationSearch)
        .then((res) => {
          if (res.data.data) {
            setLocationSuggestion(res.data.data);
          }
        })
        .catch(error => {
          console.error("Error fetching location suggestions:", error);
        });
    }
  }, [userLocationSearch]);

  return (
    <div style={{ textAlign: "center" }}>
      <input
        placeholder='search locations' 
        value={userLocationSearch}
        onChange={(e) => setUserLocationSearch(e.target.value)}
        name="locations" 
      />
      <br />
      <br />
      {userLocationSearch !== "" ? locationSuggestion.map((item, i) => (
        <label key={i}>
          <input
            type="radio"
            className="location-name"
            onClick={() => {
              fetchLocationDetails(item.place_id)
                .then((res) => {
                  let locationData = res.data.data[0].geometry.location;
                  setLocation({
                    lat: locationData.lat,
                    long: locationData.lng
                  });
                  setLocationSuggestion([]);
                })
                .catch(error => {
                  console.error("Error fetching location details:", error);
                });
            }}
            name="locations"
          />
          {item.description}<br/><br/>
        </label>
      )) : " "}
      <br/><br/>
      <button type="button" className="locationbtn" onClick={handleModalClose}>Change Location</button>
    </div>
  );
};

export default LocationSelector;
