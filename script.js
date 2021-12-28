//var collection
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

//setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 1000 )
camera.position.set(1,-10,10);

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
var AmbientLight = new THREE.AmbientLight(0xffffff,0.3,100);
scene.add(AmbientLight);

//---PLANE---
var planeG = new THREE.PlaneGeometry(10,10);
var planeT = new THREE.MeshPhongMaterial({color: 0xff00ff});
var planeM = new THREE.Mesh(planeG,planeT);
planeM.rotation.x = -Math.PI/2;

// Car Controls

//Markers
markerMx.position.x = 5;
markerMy.position.y = 5;
markerMz.position.z = 5;
//---CAR---
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
//test wall
var wallG = new THREE.BoxGeometry(0.5,3,3);
var wallM = new THREE.MeshPhongMaterial({color: 0xff0000});
var wall1 = new THREE.Mesh(wallG,wallM);
wall1.position.x = -5;

// attach camera to car
body.add( camera );
camera.position.set( 10,4,0 );
camera.lookAt( body.position );
// adding elements to scene
scene.add(body);
scene.add(wall1);
scene.add(planeM);
scene.add(markerMx);
scene.add(markerMy);
scene.add(markerMz);

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