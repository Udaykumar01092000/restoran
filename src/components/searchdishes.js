import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from './reducer';
import ScrollToTopButton from './scrolltop';
import '../components/searchdishes.css';
import { fetchSearchDishes } from '../apis/apis'; // Import the API function

function SearchDishes() {
    const [dishName, setDishName] = useState("");
    const [dishes, setDishes] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (dishName.length > 2) {
            setLoading(true);
            fetchSearchDishes(17.37240, 78.43780, dishName) // Use the imported function
                .then((res) => {
                    console.log(res);
                    if (res.data.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH) {
                        setDishes(res.data.data?.cards[1]?.groupedCard?.cardGroupMap.DISH.cards.slice(1));
                    }
                    setLoading(false);
                }).catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        }
    }, [dishName]);

    console.log(dishes);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleQuantityChange = (id, value) => {
        setQuantities({ ...quantities, [id]: value });
    };

    return (
        <>
            <div style={{ textAlign: "center" }}>
                <h2>Search Dishes</h2>
                <form className="d-flex justify-content-center" role="search">
                    <div className="col-md-6 col-lg-4 m-2 clearable-input">
                        <input
                            value={dishName}
                            onChange={(e) => {
                                setDishName(e.target.value);
                            }}
                            className="form-control"
                            aria-label="Search"
                            type="search"
                            placeholder="Type your dish name"
                        />
                    </div>
                </form>
            </div>
            <div className="container dishes-display">
                {loading ? 
                    <div className="d-flex justify-content-center m-2">
                        <div className="spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : <div className="row row-cols-1 row-cols-md-2 g-2 m-1">
                        {dishes.map((item, i) => {
                            const dishId = item?.card?.card?.info?.id;
                            const quantity = quantities[dishId] || 1;

                            return <div className="col" key={i}>
                                        <div className="card h-100 p-4">
                                            <h4 className="card-title">
                                                {item?.card?.card?.restaurant?.info?.name}
                                            </h4>
                                            <h6>Rating :⭐{item?.card?.card?.info?.ratings?.aggregatedRating?.rating}/5 </h6>
                                            <div>
                                                <button className="restaurant-view"
                                                onClick={() => {
                                                    navigate(`/restaurant/${item?.card?.card?.restaurant?.info?.id}/${item?.card?.card?.restaurant?.info?.name}`);
                                                }}
                                                >
                                                    View Restaurant
                                                </button>
                                            </div>
                                            <div className="row m-3">
                                                <div className="col-lg-6">
                                                    <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.card?.card?.info?.imageId}`}
                                                        className="card-img-top h-220" alt="..." />
                                                </div>
                                                <div className="card-body col-lg-6">
                                                    <h5 className="card-title">{item?.card?.card?.info?.name}</h5>
                                                    {item?.card?.card?.info?.description && (
                                                        <div>
                                                            <p className="card-text" id="card-desc">
                                                                <b>Description: </b> 
                                                            
                                                            {item.card.card.info.description}
                                                            </p>
                                                        </div>
                                                    )}<br/>
                                                    <p><b>Qty : </b><input
                                                        type="number"
                                                        value={quantity}
                                                        onChange={(e) => handleQuantityChange(dishId, parseInt(e.target.value))}
                                                    /></p>
                                                    <p className="card-text"><b>Price : </b>₹{item.card.card.info.price / 100}/-</p>
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
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 19 19">
                                                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7-1a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                                        </svg> &nbsp;Add to cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>;
                        })}
                    </div>}
            </div>
            <ScrollToTopButton />
        </>
    );
}

export default SearchDishes;