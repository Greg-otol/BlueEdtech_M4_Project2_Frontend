import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CarDetails/CarDetails.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function CarDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [car, setCar] = useState([]);

  useEffect(() => {
    axios
      .get(`https://otol-cars.herokuapp.com/${id}`)
      .then((response) => {
        setCar(response.data);
      }, [])
      .catch(() => {
        console.log("erro");
      });
  });

  function deletePost(id) {
    axios
      .delete(`https://otol-cars.herokuapp.com/delete/${id}`)
      .then(() => navigate("/"));
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="Details" key={car._id}>
          <h1>{car.name}</h1>
          <img className="detail-img" src={car.image} alt="Car" />
          <h2>{car.year}</h2>
          <div className="btns">
            <Link to={{ pathname: `/update/${car._id}` }}>
              <button id="edit">Editar</button>
            </Link>
            <Link to={{ pathname: `/delete/${car._id}` }}>
              <button id="delete" onClick={() => deletePost(car._id)}>
                Remover
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CarDetails;
