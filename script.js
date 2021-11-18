//var collection
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

//setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 1000 )
camera.position.set(0,0,5);

// renderer setup
var renderer = new THREE.WebGLRenderer();
renderer.setSize(windowWidth, windowHeight);
document.body.appendChild(renderer.domElement);

//adjust size on windows resize
window.addEventListener('resize',function()
{
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
});

//OrbitControls
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// lighting
var light = new THREE.PointLight(0xffffff,2,100);
light.position.set(50,50,50);
//scene.add(light);

var AmbientLight = new THREE.AmbientLight(0xffffff,0.3,100);
scene.add(AmbientLight);

// ------ CAR MODEL -------
// Car Body
var bodyG = new THREE.BoxGeometry(3,1.5,1.5);
var bodyM = new THREE.MeshPhongMaterial({color: 0x00ff00});
var body = new THREE.Mesh(bodyG,bodyM);

// Car Wheels
var wheelG = new THREE.CylinderGeometry(0.4,0.4,1.75,16);
var wheelM = new THREE.MeshPhongMaterial({color: 0x808080});
var wheelFront = new THREE.Mesh(wheelG,wheelM);
var wheelBack = new THREE.Mesh(wheelG,wheelM);
//rotate wheel by 90 degrees
wheelFront.rotation.x = Math.PI / 2;
wheelBack.rotation.x = Math.PI / 2;

body.add(wheelFront);
body.add(wheelBack);;

// Car Boot
var bootG = new THREE.BoxGeometry(0.75,0.75,1.5);
var bootM = new THREE.MeshPhongMaterial({color: 0x00ff00});
var boot = new THREE.Mesh(bootG,bootM);

body.add(boot);

// Car Windows
var windowG = new THREE.BoxGeometry(1,0.5,1.51);
var windowM = new THREE.MeshPhongMaterial({color: 0xffffff});
var carWindowFront = new THREE.Mesh(windowG,windowM);
var carWindowBack = new THREE.Mesh(windowG,windowM);

body.add(carWindowFront);
body.add(carWindowBack);

// Car Windscreen
var windscreenG = new THREE.BoxGeometry(3.01,0.55,1.05);
var windscreenM = new THREE.MeshPhongMaterial({color: 0xffffff});
var windscreen = new THREE.Mesh(windscreenG,windscreenM);

body.add(windscreen);

// Car Lights
var carLightG = new THREE.CylinderGeometry(0.2,0.1,0.2,16);
var carLightM = new THREE.MeshPhongMaterial({color: 0xffff00});
var carLightLeft = new THREE.Mesh(carLightG,carLightM);
var carLightRight = new THREE.Mesh(carLightG,carLightM);

// Point lights for the car
var lightLeft = new THREE.PointLight(0xffffff,0.3,5);
var lightRight = new THREE.PointLight(0xffffff,0.3,5);

carLightLeft.add(lightLeft);
carLightRight.add(lightRight);
//rotating lights
carLightLeft.rotation.z = Math.PI / 2;
carLightRight.rotation.z = Math.PI / 2;

lightLeft.position.y = 0.2;
lightRight.position.y = 0.2;

body.add(carLightLeft);
body.add(carLightRight);

//test wall
var wallG = new THREE.BoxGeometry(0.5,3,3);
var wallM = new THREE.MeshPhongMaterial({color: 0xff0000});
var wall1 = new THREE.Mesh(wallG,wallM);
wall1.position.x = -5;
scene.add(wall1);
// position of car components
// X
wheelFront.position.x = 0.85;
wheelBack.position.x = -1.35;
boot.position.x = -1.85;
carWindowBack.position.x = 0.6;
carWindowFront.position.x = -0.6;
carLightLeft.position.x = -2.2;
carLightRight.position.x = -2.2;
// Y
wheelFront.position.y = -0.5;
wheelBack.position.y = -0.5;
boot.position.y = -0.375;
carWindowFront.position.y = 0.3;
carWindowBack.position.y = 0.3;
windscreen.position.y = 0.35;
carLightLeft.position.y = -0.4;
carLightRight.position.y = -0.4;
// Z
carLightLeft.position.z = -0.45;
carLightRight.position.z = 0.45;

// adding elements to scene
scene.add(body);

// logic
var update = function()
{
    //body.rotation.x += 0.001;
    //body.rotation.y += 0.0005;
};

// scene renderer
var render = function()
{
    renderer.render(scene, camera);
};

// loop
var loop = function()
{
    requestAnimationFrame(loop);

    update();
    render();
};

loop();