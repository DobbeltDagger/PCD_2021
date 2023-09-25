import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { worldData } from './myWorldsData.js';


//////////////////////////////////////////
// class for all 3d objects in environment
class Object {
  
  // constructor(x, y, z) {
  constructor(modelUrl, position, rotation, lights, video, presenter) {
    this.modelUrl = modelUrl || ""; // path for model
    this.model; // for the model itself!!
    this.position = { x: position.x || 0, y: position.y || 0, z: position.z || 0 };
    this.rotation = rotation || 0;
    this.modelIsLoaded = false;
    this.lights = lights || []; // for lights around object!! ..
    this.video = video || "";
    // bio and text for presenter
    this.presenter = presenter || {}
  }


  //////////////////////////////////////////
  // setup this object
  init(loader, scene) {
    console.log("Hej INIT!")
    this.loadModel(loader, scene, this.modelUrl) // '/assets/2023_models/gltf/Flower/Flower.glb');
  }


  //////////////////////////////////////////
  // set the vid src and play the vid
  playVideo() {

    // empty the elm ...
    const vidWrap = document.getElementById("videoWrapper");
    console.log("vidWrap:", vidWrap);
    const vid = document.querySelector("#videoWrapper video");
    console.log("vid:", vid);

    // maybe change the source here??
    // or this is maybe another function??

    vid.classList.remove("hidden");
    // vid.play();
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