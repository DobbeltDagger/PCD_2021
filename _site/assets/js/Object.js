import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { worldData } from './myWorldsData.js';


//////////////////////////////////////////
// class for all 3d objects in environment
class Object {
  
  // constructor(x, y, z) {
  constructor(modelUrl, position, rotation, lights, videoUrl, presenter) {
    this.modelUrl = modelUrl || ""; // path for model
    this.model; // for the model itself!!
    this.position = { x: position.x || 0, y: position.y || 0, z: position.z || 0 };
    this.rotation = rotation || 0;
    this.modelIsLoaded = false;
    this.lights = lights || []; // for lights around object!! ..
    this.videoUrl = videoUrl || "";
    // bio and text for presenter
    this.presenter = presenter || {}
  }


  //////////////////////////////////////////
  // setup this object
  init(loader, scene) {
    console.log("init was run")
    this.loadModel(loader, scene, this.modelUrl) // '/assets/2023_models/gltf/Flower/Flower.glb');
  }


  //////////////////////////////////////////
  // set up the video source!
  prepareVideo() {
    const vid = document.querySelector("#videoWrapper video");
    // console.log("vid:", vid);
    vid.pause();
    vid.src = this.videoUrl;
  }


  //////////////////////////////////////////
  // set the vid src and play the vid
  playVideo() {
    // empty the elm ...
    // const vidWrap = document.getElementById("videoWrapper");
    // console.log("vidWrap:", vidWrap);
    const vid = document.querySelector("#videoWrapper video");
    console.log("vid:", vid);
    vid.classList.remove("hidden");
    vid.play();
  }


  //////////////////////////////////////////
  // setup the slides here
  prepareSlides() {

    const slWrap = document.getElementById("slideWrapper");
    
    slWrap.innerHTML = "";

    // build slides
    // slide 1
    const slide1 = document.createElement("div");
    const inside = document.createElement("div");
    inside.className = "inside";
    const portrait = document.createElement("img");
    portrait.src = this.presenter.portraitUrl;
    const bio = document.createElement("div");
    bio.innerHTML = this.presenter.bio;
    // slide 2
    const slide2 = document.createElement("div");
    const insideTwo = document.createElement("div");
    insideTwo.className = "inside";
    const secondImg = document.createElement("img");
    secondImg.src = this.presenter.secondImg;
    const textElm = document.createElement("div");
    textElm.innerHTML = this.presenter.text;

    // append stuff
    inside.appendChild(portrait);
    inside.appendChild(bio);
    slide1.appendChild(inside)
    slWrap.appendChild(slide1);
    // append for slide 2
    insideTwo.appendChild(secondImg);
    insideTwo.appendChild(textElm)
    slide2.appendChild(insideTwo);
    slWrap.appendChild(slide2);
  }


  //////////////////////////////////////////
  // styart paying the slideshow here!
  playSlides() {
    const slWrap = document.getElementById("slideWrapper");
    
    // remove 
    
    // show the slideshow
    slWrap.classList.add("shown");

    const slides = document.querySelectorAll("#slideWrapper > div");
    console.log("slides:", slides);
    let currentSlide = 0;

    // hide all the slides
    function hideSlides() {
      for(let i = 0; i < slides.length; i++) { slides[i].classList.remove("shown"); }
    }

    // now, start slides
    const slidesInterval = setInterval(function() {
      hideSlides();
      slides[currentSlide].classList.add("shown");
      currentSlide++;
      if (currentSlide >= slides.length) currentSlide = 0;
    }, 1000);    
  }


  //////////////////////////////////////////
  // load the model  
  loadModel(loader, scene, modelPath) {

    // loader.load( '../models/ArnarsPeber/apple.gltf',
    loader.load( modelPath,
      (gltf) => {
        scene.add( gltf.scene );
    
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object 
        
        this.model = gltf.scene;

        // set the position
        this.model.position.set(
          this.position.x,
          this.position.y,
          this.position.z
        )
        // set the rotation
        // ...
      },
      // called while loading is progressing
      (xhr) => {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        if ( (xhr.loaded / xhr.total * 100) == 100 ) {
          this.modelIsLoaded = true; // set model loaded to true
          console.log("this.modelIsloaded:", this.modelIsLoaded);
        }
      },
      // called when loading has errors
      (error) => {
        console.log( 'An error happened' );
      }
    );    
  }


}

export {
  Object
}