import "../UpdateCar/UpdateCar.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as yup from "yup";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useEffect } from "react";

const validationPost = yup.object().shape({
  name: yup
    .string()
    .required("O nome é obrigatório!")
    .max(50, "Nome máximo de 50 caracteres!"),
  image: yup
    .string()
    .required("A URL da imagem é obrigatório!")
    .max(500, "URL máximo de 500 caracteres!"),
  year: yup
    .string()
    .required("O ano é obrigatório!")
    .max(4, "Ano máximo de 4 números!"),
});

function UpdateCar() {

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationPost),
  });

  useEffect(() => {
    axios
      .get(`https://otol-cars.herokuapp.com/${id}`)
      .then((response) => {
        reset(response.data);
        console.log(reset)
      })
      .catch(() => {
        console.log("erro");
      });
  }, []);

  const addPut = (data) =>
    axios
      .put(`https://otol-cars.herokuapp.com/update/${id}`, data)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        console.log("erro");
      });

  return (
    <>
      <Header />
      <main>
        <div className="card-put">
          <h1>Atualizar carro</h1>
          <div className="line-put"></div>
          <div className="card-body-put">
            <form onSubmit={handleSubmit(addPut)}>
              <div className="fields">
                <label>Modelo</label>
                <input type="text" name="name" {...register("name")} />
                <p className="error-message">{errors.name?.message}</p>
              </div>
              <div className="fields">
                <label>URL da imagem</label>
                <textarea
                  type="text"
                  name="image"
                  {...register("image")}
                ></textarea>
                <p className="error-message">{errors.image?.message}</p>
              </div>
              <div className="fields">
                <label>Ano</label>
                <input type="number" name="year" {...register("year")} />
                <p className="error-message">{errors.year?.message}</p>
              </div>
              <div className="btn-put">
                <button type="submit">Atualizar</button>
                <Link to={{pathname: "/"}}>
                <button type="submit">Cancelar</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default UpdateCar;
