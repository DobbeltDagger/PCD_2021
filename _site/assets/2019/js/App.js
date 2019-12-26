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

      document.getElementById('mobileNav').classList.toggle("hide");
      document.getElementById('burgerIcon').classList.toggle('hide');
      document.getElementById('crossIcon').classList.toggle('hide');

    })
    
  },

}