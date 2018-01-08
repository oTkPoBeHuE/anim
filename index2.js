'use strict';

const node3d = require('node-3d-ready-raub');
const THREE = node3d.three;

const camera = new THREE.PerspectiveCamera(75, node3d.canvas.width / node3d.canvas.height, 1, 1000);
camera.position.z = 50;
camera.position.y = 100;

const scene = new THREE.Scene();
const mixer = new THREE.AnimationMixer(scene);
const clock = new THREE.Clock();

const ambientLight = new THREE.AmbientLight(0xcccccc);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xff4400, 5, 30);
pointLight.position.set(5, 0, 0);
scene.add(pointLight);

const fs = require('fs');

THREE.FileLoader.prototype.load = (url, onLoad, onProgress, onError) => {
	fs.readFile(url, (err, data) => {
		if (err) {
			return onError(err);
		}
		onLoad(data);
	});
};

const loader = new THREE.JSONLoader();
loader.load('models/monster/monster.json', (geometry, materials) => {
	// adjust color a bit
	const material = materials[0];
	material.morphTargets = true;
	material.color.setHex(0xffaaaa);
	for (let i = 0; i < 729; i++) {
		const mesh = new THREE.Mesh(geometry, materials);
		// random placement in a grid
		const x = (i % 27 - 13.5) * 2 + THREE.Math.randFloatSpread(1);
		const z = (Math.floor(i / 27) - 13.5) * 2 + THREE.Math.randFloatSpread(1);
		mesh.position.set(x, 0, z);
		const s = THREE.Math.randFloat(0.00075, 0.001);
		mesh.scale.set(s, s, s);
		mesh.rotation.y = THREE.Math.randFloat(-0.25, 0.25);
		mesh.matrixAutoUpdate = false;
		mesh.updateMatrix();
		scene.add(mesh);
		mixer
			.clipAction(geometry.animations[0], mesh)
			.setDuration(1) // one second
			.startAt(-Math.random()) // random phase (already running)
			.play(); // let's go
	}
});

function animation() {
	const timer = Date.now() * 0.0005;
	camera.position.x = Math.cos(timer) * 10;
	camera.position.y = 4;
	camera.position.z = Math.sin(timer) * 10;
	mixer.update(clock.getDelta());
	camera.lookAt(scene.position);

	node3d.renderer.render(scene, camera);

	node3d.frame(animation);
}

node3d.frame(animation);

