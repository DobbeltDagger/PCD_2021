import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


//////////////////////////////////////////
// class for all 3d objects in environment
class Object {
  
  constructor(x, y, z) {
    this.model = null;
    this.position = { x: x || 0, y: y || 0, z: z || 0 };
    this.rotation = 0;
    this.modelIsLoaded = false;
    this.video = "";
  }


  //////////////////////////////////////////
  // setup this object
  init() {
    console.log("Hej INIT!")
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