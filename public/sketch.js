// global threejs variables
let container;
let renderer;
let camera;
let loader;
let lastRenderTime;
let scene;

// environment variables
let current = 0;
let scenes  = [];
let roomSize = 30;

let col = [];
let sphere, dome;

// communication
// let socket;

window.addEventListener('load', onLoad);

function onLoad(){
  container = document.querySelector('#sketch');
  let wid = 400;
  let hei = 400;

  // INITIALIZATION
  renderer = new THREE.WebGLRenderer({ });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(wid, hei);
  container.appendChild(renderer.domElement);
	scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(80, wid/hei, 0.1, 1000);

  loader = new THREE.TextureLoader();
  createEnvironment();

  // EVENTS
  window.addEventListener('resize', onWindowResize, true );
	update();

	// COMMUNICATION
	// socket = io();
	// socket.on('mode', changeMode);
}

/*
 * === EVENTS ===
 */
function onWindowResize(){
  let wid = 400;
  let hei = 400;

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(wid, hei);
	camera.aspect = wid/hei;
  camera.updateProjectionMatrix();
}


function update(){
	window.requestAnimationFrame(animate);
}
function animate(timestamp) {
  let delta = Math.min(timestamp - lastRenderTime, 500);
  lastRenderTime = timestamp;

	renderer.render(scene, camera);
	window.requestAnimationFrame(animate);
}


/*
 * === ENVIRONMENT ===
 */
function createEnvironment(){
  col[0] = new THREE.Color( 0xff0000 );
  col[1] = new THREE.Color( 0x00ff00 );
  col[2] = new THREE.Color( 0x0000ff );

	scene.add(new THREE.DirectionalLight({
		color: 0xffffff,
	}));

	createBall();
	createDome();
}
function createBall(){
	let spGeo = new THREE.SphereGeometry(5, 20, 20);
	let spMat = new THREE.MeshPhongMaterial({
		color: col[0],
	})

	sphere = new THREE.Mesh(spGeo, spMat);
	sphere.position.set(0, 0, -15);
	scene.add(sphere);
}
function createDome(){
	let domeGeo = new THREE.SphereGeometry(500, 32, 32);
	let domeMat = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		wireframe: true,
	})

	dome = new THREE.Mesh(domeGeo, domeMat);
	scene.add(dome);
}
function changeMode(mode){
	sphere.material.color = col[mode];
}
