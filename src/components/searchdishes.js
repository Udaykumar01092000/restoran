import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from './reducer';
import { fetchDishes } from '../apis/apis'; // Import the fetch function
import '../components/searchdishes.css';

function SearchDishes() {
    const [dishName, setDishName] = useState("");
    const [dishes, setDishes] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleQuantityChange = (id, value) => {
        setQuantities({ ...quantities, [id]: value });
    };

    useEffect(() => {
        if (dishName.length > 2) {
            setLoading(true);
            setError(null);
            fetchDishes(17.37240, 78.43780, dishName)
                .then((res) => {
                    const restaurantData = res.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards;
                    if (restaurantData) {
                        setDishes(restaurantData.slice(1));
                    } else {
                        setDishes([]);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setError('Failed to fetch dishes');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setDishes([]);
        }
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
                        {dishes.map((item) => {
                            const dishId = item?.card?.card?.info?.id;
                            const quantity = quantities[dishId] || 1;

                            return (
                                <div className="col" key={dishId}>
                                    <div className="card h-100 p-4">
                                        <h4 className="card-title">
                                            {item?.card?.card?.restaurant?.info?.name},
                                            <h5>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                                </svg>
                                                {item?.card?.card?.restaurant?.info?.areaName}
                                            </h5>
                                        </h4>
                                        <h6>⭐{item?.card?.card?.info?.ratings?.aggregatedRating.rating} Rating, Time to deliver</h6>
                                        <button className="restaurant-view" onClick={() => {
                                            navigate(`/restaurant/${item?.card?.card?.restaurant?.info?.id}/${item?.card?.card?.restaurant?.info?.name}`);
                                        }}>
                                            View Restaurant
                                        </button>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/${item?.card?.card?.info?.imageId}`}
                                                    className="card-img-top h-80" alt="..." />
                                            </div>
                                            <div className="card-body col-lg-6">
                                                <h5 className="card-title">{item?.card?.card?.info?.name}</h5>
                                                <p className="card-text" id="card-desc">
                                                    {item?.card?.card?.info?.description}
                                                </p>
                                                <input
                                                    type="number"
                                                    value={quantity}
                                                    onChange={(e) => handleQuantityChange(dishId, parseInt(e.target.value))}
                                                />
                                                <p className="card-text"><b>₹ {item?.card?.card?.info?.price / 100}/-</b></p>
                                                <button className="restaurant-view" onClick={() => {
                                                    dispatch(
                                                        addToCart({
                                                            Name: item?.card?.card?.info?.name,
                                                            Description: item?.card?.card?.info?.description,
                                                            Price: item?.card?.card?.info?.price / 100,
                                                            Img: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_600/${item?.card?.card?.info?.imageId}`,
                                                            Quantity: quantity,
                                                            RestaurantName: item?.card?.card?.restaurant?.info?.name,
                                                        })
                                                    );
                                                    setQuantities({ ...quantities, [dishId]: 1 });
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                                    </svg>
                                                    Add to cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {dishName.length >= 2 && dishes.length === 0 && !loading && !error && (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-warning" role="status">
                            <span className="visually-hidden">No dishes found</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default SearchDishes;