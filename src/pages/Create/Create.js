import "../Create/Create.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

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

export default function Create() {
  const cleanForm = () => {
    document.getElementById("myform").reset();
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationPost),
  });
  const addPost = (data) =>
    axios
      .post(`https://otol-cars.herokuapp.com/create`, data)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        console.log("erro");
      });

  return (
    <>
      <Header />
      <div className="createCar">
        <div className="container">
          <main>
            <div className="card-post">
              <h1>Cadastrar novo carro</h1>
              <div className="line-post"></div>
              <div className="card-body-post">
                <form id="myform" onSubmit={handleSubmit(addPost)}>
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
                  <div className="btn-post">
                    <button id="register" type="submit" onClick={cleanForm}>
                      Salvar
                    </button>
                    <Link to={{ pathname: "/" }}>
                      <button id="close">Cancelar</button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
