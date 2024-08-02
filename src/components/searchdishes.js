import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from './reducer';
import { fetchSearchDishes } from '../apis/apis'; // Import the fetch function
import '../components/searchdishes.css';

function SearchDishes() {
    const [dishName, setDishName] = useState("");
    const [dishes, setDishes] = useState([]); // Initialize as an empty array
    const [quantities, setQuantities] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleQuantityChange = (id, value) => {
        setQuantities({ ...quantities, [id]: value });
    };

    useEffect(() => {
        if (!dishName) {
            setDishes([]);
            setHasSearched(false); 
            return;
        }
        
        setLoading(true); // Start loading when fetching data
    
        fetchSearchDishes(17.37240, 78.43780, dishName)
            .then((res) => {
                // Log entire response to understand its structure
                console.log('API Response:', res.data);
    
                // Extract dishes data correctly, skipping the first item
                const allDishesData = res.data?.data?.cards || [];
                const dishesData = allDishesData.slice(1).flatMap(card => 
                    card?.groupedCard?.cardGroupMap?.DISH?.cards || []
                );
    
                // Log dishesData to see its structure
                console.log('Dishes Data:', dishesData);
    
                // Map dishes data to a formatted array with validation
                const formattedDishes = dishesData.map(card => {
                    const dish = card?.card?.card;
                    if (dish && dish.info) {
                        return {
                            ...dish.info,
                            restaurant: dish.restaurant?.info,
                        };
                    }
                    return null; // Skip invalid dishes
                }).filter(dish => dish !== null); // Remove any null entries
    
                setDishes(formattedDishes);
                setHasSearched(true);
            })
            .catch((err) => {
                console.error('Fetch error:', err);
                setError('Failed to fetch dishes');
                setDishes([]); // Ensure dishes is an array
                setHasSearched(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [dishName]);
    
        
    return (
        <>
            <div style={{ textAlign: "center" }}>
                <h2>Search Dishes</h2>
                <form className="d-flex justify-content-center" role="search">
                    <div className="col-md-6 col-lg-4 m-2 clearable-input">
                        <input
                            className="form-control"
                            aria-label="Search"
                            onChange={(e) => setDishName(e.target.value)}
                            placeholder="Search Dishes"
                            value={dishName}
                        />
                    </div>
                </form>
            </div>
            <div className="container dishes-display">
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="d-flex justify-content-center">
                        <p className="text-danger">{error}</p>
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-md-2 g-2">
                        {hasSearched && dishes.length === 0 ? (
                            <div className="d-flex justify-content-center">
                                 <p>No dishes found</p>
                            </div>
                        ):
                         dishes.length > 0 ? (
                            dishes.map((dish, index) => {
                                const dishId = dish?.id || index; // Use index as fallback if id is missing
                                const quantity = quantities[dishId] || 1;
                                return (
                                    <div className="col" key={dishId}>
                                        <div className="card h-100 p-4">
                                            <h4 className="card-title">
                                                {dish.restaurant?.name},
                                            </h4>
                                            <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                                    </svg>
                                                    {dish.restaurant?.locality}
                                                </b><br/>
                                            <h6>⭐{dish?.ratings?.aggregatedRating?.rating} Rating</h6>
                                            <button className="restaurant-view" onClick={() => {
                                                navigate(`/restaurant/${dish.restaurant?.id}/${dish.restaurant?.name}`);
                                            }}>
                                                View Restaurant
                                            </button>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/${dish?.imageId}`}
                                                        className="card-img-top h-80" alt={dish?.name} />
                                                </div>
                                                <div className="card-body col-lg-6">
                                                    <h5 className="card-title">{dish?.name}</h5>
                                                    <p className="card-text" id="card-desc">
                                                        <b>Price:</b>{" " + dish?.price/100 + ".00"}
                                                    </p>
                                                    <input
                                                        type="number"
                                                        value={quantity}
                                                        onChange={(e) => handleQuantityChange(dishId, e.target.value)}
                                                        min="1"
                                                    /><br/><br/>
                                                    <button className="restaurant-view"
                                                        onClick={() => {
                                                            dispatch(
                                                            addToCart({
                                                                        Name: dish?.name,
                                                                        Description: dish?.description,
                                                                        Price: dish?.price / 100,
                                                                        Img: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/${dish?.imageId}`,
                                                                        Quantity: quantity,
                                                                        RestaurantName: dish.restaurant?.name,
                                                                    })
                                                            );
                                                        setQuantities({ ...quantities, [dishId]: 1 });
                                                    }}>
                                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                                                         <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                                                     </svg>
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : null}
                    </div>
                )}
            </div>
        </>
    );
}

export default SearchDishes;
