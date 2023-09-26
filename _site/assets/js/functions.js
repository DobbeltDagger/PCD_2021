////////////////////////////////////////
// turn on the overlay
const showOverlay = () => {

  // show overlay close button
  document.getElementById("closeOverlay").classList.remove("hidden");
  // show all overlays!
  document.getElementById("threeWrapper").classList.remove("hidden");
  document.getElementById("videoWrapper").classList.remove("hidden");
  document.getElementById("presenterWrapper").classList.remove("hidden");
  // show white logo!
  document.querySelector("#logo a.round img").classList.add("hidden")
  document.querySelector("#logo a.roundWhite img").classList.remove("hidden");
}


////////////////////////////////////////
// hide the overlay
const hideOverlay = () => {

  // show overlay close button
  document.getElementById("closeOverlay").classList.add("hidden");
  // show all overlays!
  document.getElementById("threeWrapper").classList.add("hidden");
  document.getElementById("videoWrapper").classList.add("hidden");
  document.getElementById("presenterWrapper").classList.add("hidden");
  // show white logo!
  document.querySelector("#logo a.round img").classList.remove("hidden")
  document.querySelector("#logo a.roundWhite img").classList.add("hidden");
}



/////////////////////////////////////////////
// closing overlay button
const setupCloseOverlayButton = () => {
  const btn = document.getElementById("closeOverlay");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    hideOverlay();
  })
}


/////////////////////////////////////////////
// closing overlay with overlay logo!
const setupWhiteLogoClose = () => {
  const whLogo = document.querySelector(".roundWhite");
  whLogo.addEventListener("click", (e) => {
    e.preventDefault();
    hideOverlay();
  })
}


/////////////////////////////////////////////
export {
  showOverlay,
  hideOverlay,
  setupCloseOverlayButton,
  setupWhiteLogoClose
}