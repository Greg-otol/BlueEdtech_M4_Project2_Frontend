import React from "react";
import "../Header/Header.css";
import { Link } from "react-router-dom";

function Header() {
  function toggleMenu(event) {
    if (event.type === "touchstart") event.preventDefault();
    const nav = document.getElementById("nav");
    nav.classList.toggle("active");
    const active = nav.classList.contains("active");
    event.currentTarget.setAttribute("aria-expanded", active);
    if (active) {
      event.currentTarget.setAttribute("aria-label", "Fechar Menu");
      document.body.style.overflow = "hidden";
    } else {
      event.currentTarget.setAttribute("aria-label", "Abrir Menu");
      document.body.style.overflow = "visible";
    }
  }

  const menuLinks = document.querySelectorAll('#menu a[href^="#"]');

  function getDistanceFromTheTop(element) {
    const id = element.getAttribute("href");
    return document.querySelector(id).offsetTop;
  }

  function scrollToSection(event) {
    event.preventDefault();
    const distanceFromTheTop = getDistanceFromTheTop(event.target) - 90;
    smoothScrollTo(0, distanceFromTheTop);
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", scrollToSection);
  });

  function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== "undefined" ? duration : 400;

    const easeInOutQuart = (time, from, distance, duration) => {
      if ((time /= duration / 2) < 1)
        return (distance / 2) * time * time * time * time + from;
      return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
      const time = new Date().getTime() - startTime;
      const newX = easeInOutQuart(time, startX, distanceX, duration);
      const newY = easeInOutQuart(time, startY, distanceY, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      window.scroll(newX, newY);
    }, 1000 / 60);
  }
  return (
    <>
      <header id="header">
        <img id="logo" src={require("../../assets/img/logo.png")} alt="logo" />
        <nav id="nav">
          <button
            aria-label="Abrir Menu"
            id="btn-mobile"
            aria-haspopup="true"
            aria-controls="menu"
            aria-expanded="false"
            onClick={toggleMenu}
          >
            Menu
            <span id="hamburger"></span>
          </button>
          <ul id="menu" role="menu">
            <li>
              <Link to={{ pathname: "/" }}>
                <img src={require("../../assets/icons/home.png")} alt="" />
              </Link>
            </li>
            <li>
              <Link to={{ pathname: "/create" }}>
                <img src={require("../../assets/icons/plus-square.png")} alt="" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div id="space"></div>
    </>
  );
}

export default Header;
