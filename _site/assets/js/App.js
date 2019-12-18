//////////////////////
function App() {
  // nothing here yet
}

/////////////////////////
App.prototype = {

  //////////////////
  init: function() {

    console.log("App init was run");

    // get the menu burger
    let burgerBtn = document.getElementById('burger');
    burgerBtn.addEventListener('click', (e)=> {
      console.log("burger was clicked!")
      e.preventDefault();

      const mnav = document.getElementById('mobileNav');
      mnav.classList.toggle("hide");
    })
    
  },

}