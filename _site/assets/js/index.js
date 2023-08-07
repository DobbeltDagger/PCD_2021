import { setupEnterBtnClick, init3D, initVideos, animate } from '/assets/js/setup3Dworld.js';


window.addEventListener("DOMContentLoaded", (e) => {
  // setup burger menu click
  const burgerBtn = document.getElementById("burger");
  console.log("burgerBtn:", burgerBtn);
  burgerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("burger was clicked!");
  })
  
  // init out threejs world
  // animate has to run latest, because it loops!
  setupEnterBtnClick();
  init3D();
  initVideos();
  animate();
})