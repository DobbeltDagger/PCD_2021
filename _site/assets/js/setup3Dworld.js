import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Object } from "/assets/js/Object.js";
import { worldData } from './myWorldsData.js';
import { hideOverlay } from './functions.js';

// global vars
let isEnterClicked = false;
let objects = [];
let loader;
let cube;
let light1, light2;
let scene, camera, renderer, controls;

// setup how to navigate cam
let currFlyMode = "pan"; // zoom out, pan, zoom in, overlays!
let timeToChangeFlyMode = false; // this trickers new flyMode to begin ..


/////////////////////////////////////////////
// handle user event click!
const setupEnterBtnClick = () => {
  const enterBtn = document.getElementById("enterBtn");
  enterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("clicked!");
    isEnterClicked = true;
    enterBtn.classList.add("hidden");

    const vid = document.querySelector("#videoWrapper video");
    vid.play();
  })
}


/////////////////////////////////////////////
// setup a test way to navigate worlds easy!
const setupWorldNav = () => {

  // honey
  document.getElementById("wn0").addEventListener("click", function(e) {
    e.preventDefault(); console.log("wn1 clicked! Honey");
    flyTo(0);
  })
  // Arnar
  document.getElementById("wn1").addEventListener("click", function(e) {
    e.preventDefault(); console.log("wn2 clicked! Arnar");
    flyTo(1);
  })
  // Jussi
  document.getElementById("wn2").addEventListener("click", function(e) {
    e.preventDefault(); console.log("wn3 clicked! Jussi");
    flyTo(2);
  })
  // Renée
  document.getElementById("wn3").addEventListener("click", function(e) {
    e.preventDefault(); console.log("wn4 clicked! Renée");
    flyTo(3);
  })
  // Markus + Signe
  document.getElementById("wn4").addEventListener("click", function(e) {
    e.preventDefault(); console.log("wn5 clicked! Markus+Signe");
    flyTo(4);
  })
  // Richard
  document.getElementById("wn5").addEventListener("click", function(e) {
    e.preventDefault(); console.log("wn6 clicked! Richard");
    flyTo(5);
  })
}


/////////////////////////////////////////////
// I am flying to destination now!!
const flyTo = (destination) => {
  console.log("flyTo -> destination:", destination);

  // Zoom out
  // pan to next world
  // Zoom in
  // start overlays!!

  changeFlyMode(currFlyMode); // testing

  // for now, just start video and slides
  objects[destination].prepareVideo();
  objects[destination].playVideo();
  objects[destination].prepareSlides();
  objects[destination].playSlides();
}



/////////////////////////////////////////////
// set the mode of navigation! ..
// MODES: // zoomOut, pan, zoomIn, overlays
const changeFlyMode = () => {

  // show global var
  console.log("changeFlyMode -> current flyMode:", currFlyMode);

  if (currFlyMode == "zoomOut") {
    currFlyMode = "pan";
  }

  if (currFlyMode == "pan") {
    currFlyMode = "zoomIn";
  }
  
  if (currFlyMode == "zoomIn") {
    currFlyMode = "overlays";
  }
  
  if (currFlyMode == "overlays") {
    currFlyMode = "zoomOut";
  }

  // It's time to change modes!
  // timeToChangeFlyMode = true;
}


/////////////////////////////////////////////
// is it time to change to the next mode?? - this runs all the time!...
const handleFlyMode = () => {

  

}


/////////////////////////////////////////////
// setup the threejs world
const init3D = () => {

  // scene
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  renderer = new THREE.WebGLRenderer({ alpha: true }); // transparent now
  renderer.setSize( window.innerWidth, window.innerHeight );
  const threeElm = document.getElementById("threeWrapper");
  if (typeof threeElm !== 'undefined' && threeElm !== null) { threeElm.appendChild( renderer.domElement ); }

  controls = new OrbitControls( camera, renderer.domElement );

  // light
  light1 = new THREE.PointLight(0xffffff, 2)
  light1.position.set(2.5, 2.5, 2.5)
  scene.add(light1)
  light2 = new THREE.PointLight(0xffffff, 2)
  light2.position.set(-2.5, 2.5, 2.5)
  scene.add(light2)

  // axisHelper
  scene.add(new THREE.AxesHelper(5))

  // geo
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  // const material = new THREE.MeshBasicMaterial( { color: 0x00ff66 } );
  var material = new THREE.MeshLambertMaterial({color: 0xff0000, transparent: true, opacity: 0.75});
  cube = new THREE.Mesh( geometry, material );
  cube.position.set(1, 1, 1)
  scene.add( cube );

  // set camera up
  camera.position.set( 0, 0, 5 );
  controls.update();


  // GLTF loader
  loader = new GLTFLoader();

  // My world objects array
  for (let i = 0; i < worldData.length; i++) {
    console.log("worldData[i]:", worldData[i]);
    const rndX = (Math.random() * 4) - 2;
    const rndY = (Math.random() * 4) - 2;
    const rndZ = (Math.random() * 4) - 2;
    const pos = { x: rndX, y: rndY, z: rndZ };
    objects[i] = new Object(
      worldData[i].modelUrl,
      pos, // worldData[i].position,
      worldData[i].rotation,
      worldData[i].lights,
      worldData[i].videoUrl,
      worldData[i].presenter
    )
    objects[i].init(loader, scene);
  }

  ///////////////////////////////
  // resize
  window.addEventListener( 'resize', onWindowResize, false );
  function onWindowResize() {
    console.log("resizing")
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

}


///////////////////////////////
// Animate the scene
const animate = () => {
	requestAnimationFrame( animate );

  handleFlyMode(); // is it time to change modes?

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

  // rotate all objects in array
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].modelIsLoaded == true) {
      objects[i].model.rotation.x += 0.01;
      objects[i].model.rotation.y += 0.01;
    }
  }

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();  
	renderer.render( scene, camera );
}


///////////////////////////////
export {
  setupEnterBtnClick,
  setupWorldNav,
  init3D,
  animate
}