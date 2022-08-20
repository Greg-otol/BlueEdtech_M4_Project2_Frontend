import "../Footer/Footer.css";

function Footer() {
  return (
    <footer>
      <p>Developed by Gregório Neto &copy;</p>
      <a
        href="https://www.linkedin.com/in/greg%C3%B3rio-neto-a0119b239/"
        target="_blank"
      >
        <img src={require("../../assets/img/linkedin.png")} />
      </a>
      <a href="https://github.com/GregorioGrGeOtOl" target="_blank">
        <img src={require("../../assets/img/git.png")} />
      </a>
    </footer>
  );
}

export default Footer;
