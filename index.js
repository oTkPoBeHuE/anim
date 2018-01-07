'use strict';
const node3d = require('node-3d-ready-raub');
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
//console.log('XMLHttpRequest', new XMLHttpRequest());
const THREE = node3d.three;

// Камера
const camera = new THREE.PerspectiveCamera(50, node3d.canvas.width / node3d.canvas.height, 1, 2000);
camera.position.set(2, 4, 5);
//---------
const clock = new THREE.Clock();
//---------
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.035);
const mixer = new THREE.AnimationMixer(scene);
//---------
const loader = new THREE.JSONLoader();

node3d.renderer.render(scene, camera);

const pointLight = new THREE.PointLight(0xffffff, 1, 100000);
scene.add(pointLight);
pointLight.position.x = 200;
pointLight.position.y = 2000;
pointLight.position.z = 500;

console.log('Load ....');
loader.load('./models/monster/monster.js', (geometry, materials) => {
	// adjust color a bit
	const material = materials[0];
	material.morphTargets = true;
	material.color.setHex(0xffaaaa);
	console.log('geometry', geometry);
	console.log('materials', materials);
	// for (let i = 0; i < 729; i++) {
	// 	const mesh = new THREE.Mesh(geometry, materials);
	// 	// random placement in a grid
	// 	const x = (i % 27 - 13.5) * 2 + THREE.Math.randFloatSpread(1);
	// 	const z = (Math.floor(i / 27) - 13.5) * 2 + THREE.Math.randFloatSpread(1);
	// 	mesh.position.set(x, 0, z);
	// 	const s = THREE.Math.randFloat(0.00075, 0.001);
	// 	mesh.scale.set(s, s, s);
	// 	mesh.rotation.y = THREE.Math.randFloat(-0.25, 0.25);
	// 	mesh.matrixAutoUpdate = false;
	// 	mesh.updateMatrix();
	// 	scene.add(mesh);
	// 	mixer
	// 		.clipAction(geometry.animations[0], mesh)
	// 		.setDuration(1) // one second
	// 		.startAt(-Math.random()) // random phase (already running)
	// 		.play(); // let's go
	// }
});

function animation() {
	node3d.renderer.render(scene, camera);
	node3d.frame(animation);
}

node3d.frame(animation);

// container = document.getElementById('container');
// function init() {
// 	loader.load('./models/monster/monster.js', function(geometry, materials) {
// 		// adjust color a bit
// 		const material = materials[0];
// 		material.morphTargets = true;
// 		material.color.setHex(0xffaaaa);
// 		for (let i = 0; i < 729; i++) {
// 			const mesh = new THREE.Mesh(geometry, materials);
// 			// random placement in a grid
// 			const x = (i % 27 - 13.5) * 2 + THREE.Math.randFloatSpread(1);
// 			const z = (Math.floor(i / 27) - 13.5) * 2 + THREE.Math.randFloatSpread(1);
// 			mesh.position.set(x, 0, z);
// 			const s = THREE.Math.randFloat(0.00075, 0.001);
// 			mesh.scale.set(s, s, s);
// 			mesh.rotation.y = THREE.Math.randFloat(-0.25, 0.25);
// 			mesh.matrixAutoUpdate = false;
// 			mesh.updateMatrix();
// 			scene.add(mesh);
// 			mixer
// 				.clipAction(geometry.animations[0], mesh)
// 				.setDuration(1) // one second
// 				.startAt(-Math.random()) // random phase (already running)
// 				.play(); // let's go
// 		}
// 	});
// 	// lights
// 	const ambientLight = new THREE.AmbientLight(0xcccccc);
// 	scene.add(ambientLight);
// 	const pointLight = new THREE.PointLight(0xff4400, 5, 30);
// 	pointLight.position.set(5, 0, 0);
// 	scene.add(pointLight);
// 	// renderer
// 	renderer = new THREE.WebGLRenderer();
// 	renderer.setPixelRatio(window.devicePixelRatio);
// 	renderer.setSize(window.innerWidth, window.innerHeight);
// 	container.appendChild(renderer.domElement);
// 	// stats
// 	stats = new Stats();
// 	container.appendChild(stats.dom);
// 	// events
// 	window.addEventListener('resize', onWindowResize, false);
// }
// //
// function onWindowResize(event) {
// 	renderer.setSize(window.innerWidth, window.innerHeight);
// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();
// }
// //
// function animate() {
// 	requestAnimationFrame(animate);
// 	render();
// 	stats.update();
// }
//
// function render() {
// 	const timer = Date.now() * 0.0005;
// 	camera.position.x = Math.cos(timer) * 10;
// 	camera.position.y = 4;
// 	camera.position.z = Math.sin(timer) * 10;
// 	mixer.update(clock.getDelta());
// 	camera.lookAt(scene.position);
// 	renderer.render(scene, camera);
// }
