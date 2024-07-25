import React from 'react';
import '../App.css'

function Shimmer() {
  const shimmerItems = Array.from({ length: 8 });

  return (
    <div className="row row-cols-1 row-cols-md-4 g-4 pt-4">
      {shimmerItems.map((_, index) => (
        <div className="col" key={index}>
          <div className="card custom-card" aria-hidden="true">
            <div className="placeholder card-img-top" alt="" />
            <div className="card-body">
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-12"></span>
              </h5>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-12"></span>
                <span className="placeholder col-12"></span>
                <span className="placeholder col-12"></span>
                <span className="placeholder col-12"></span>
                <span className="placeholder col-12"></span>
              </p>
              <button className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Shimmer;
