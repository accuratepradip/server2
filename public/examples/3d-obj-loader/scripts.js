var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 100000);

scene.background = new THREE.Color(0x8697b0)

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 1000;
camera.position.x = 800;
camera.position.y = 200;

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;
var object;
var materials;


var zoomInButton = document.createElement("button");
zoomInButton.innerHTML = "Zoom In";
document.body.appendChild(zoomInButton);

var zoomOutButton = document.createElement("button");
zoomOutButton.innerHTML = "Zoom Out";
document.body.appendChild(zoomOutButton);

// Apply CSS styling for positioning
zoomInButton.style.position = "absolute";
zoomInButton.style.top = "20px"; // Adjust the top position as needed
zoomInButton.style.left = "20px"; // Adjust the left position as needed

zoomOutButton.style.position = "absolute";
zoomOutButton.style.top = "60px"; // Adjust the top position as needed
zoomOutButton.style.left = "20px"; // Adjust the left position as needed

zoomOutButton.addEventListener("click", function () {
	camera.position.z += 100;
	camera.position.x += 100;
	camera.position.y += 100;
});
zoomInButton.addEventListener("click", function () {
	camera.position.z -= 100;
	camera.position.x -= 100;
	camera.position.y -= 100;
});


var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(40, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(40, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 0.5);
backLight.position.set(100, 0, -100).normalize();

fillLight.castShadow = false;
backLight.castShadow = false;
keyLight.castShadow = false;
scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath("/examples/3d-obj-loader/assets/");
mtlLoader.setPath("/examples/3d-obj-loader/assets/");
mtlLoader.load("Cylinder.mtl", function (loadedmaterials) {
	materials = loadedmaterials;
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setPath('/examples/3d-obj-loader/assets/');
	objLoader.setMaterials(materials)
	objLoader.load('Cylinder_2.obj', function (object1) {
		object1.position.x = 160;

		scene.add(object1);
		object = object1;
	});
});


var animate = function () {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
};

animate();