import {
  setupEnterBtnClick,
  setupWorldNav,
  init3D,
  animate
} from '/assets/js/setup3Dworld.js';
import {
  setupCloseOverlayButton,
  setupWhiteLogoClose
} from './functions.js';


window.addEventListener("DOMContentLoaded", (e) => {
  // setup burger menu click
  const burgerBtn = document.getElementById("burger");
  burgerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("burger was clicked!");

    const navElm = document.getElementById("mobileNavWrapper");
    if (navElm.classList.contains("hide")) {
      navElm.classList.remove("hide")
    } else {
      navElm.classList.add("hide");
    }
  })
  
  
  // init out threejs world
  // animate has to run latest, because it loops!
  setupEnterBtnClick();
  setupCloseOverlayButton();
  setupWhiteLogoClose();
  setupWorldNav();
  init3D();
  animate();
})