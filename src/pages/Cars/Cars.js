import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Cars/Cars.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";


function Cars() {

  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get(`https://otol-cars.herokuapp.com/`)
      .then((response) => {
        setCars(response.data);
      }, [])
      .catch(() => {
        console.log("erro");
      });
  });

  return (
    <>
      <Header />
      <div className="cards">
        {cars.map((car) => {
          return (
            <div className="card" key={car._id}>
              <Link to={{ pathname: `/details/${car._id}` }}>
                <h2>{car.name}</h2>
                <img className="all-img" src={car.image} alt="Car" />
              </Link>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default Cars;
