//var collection
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

//setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 1000 )
camera.position.set(1,10,70);

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
var AmbientLight = new THREE.AmbientLight(0xffffff,0.7,100);
scene.add(AmbientLight);
var pointLight1 = new THREE.PointLight(0xffff00,1,100);
pointLight1.position.set(30,30,30);
scene.add(pointLight1);
var pointLight2 = new THREE.PointLight(0xffff00,1,100);
pointLight2.position.set(-30,30,-100);
scene.add(pointLight2);

//---PLANE---
var planeG = new THREE.PlaneGeometry(10,10);
var planeT = new THREE.MeshPhongMaterial({color: 0xff00ff});
var planeM = new THREE.Mesh(planeG,planeT);
planeM.rotation.x = -Math.PI/2;

//pillars
scene.add(pillar);
for(let i = 0; i < 100; i+=20){ //adjusted so the distance between pillars is 20
    var pillarClone = pillar.clone();
        pillarClone.position.set(i,0,0);
        scene.add(pillarClone);
}
//stairs
for(let i = 0; i < 10; i+=2){
    var templeStairClone = templeStair.clone();
        templeStairClone.position.set(40,-12-i,i);
        templeStairClone.scale.set(1+i/50,1,1);
        scene.add(templeStairClone);
}
//statue bases
for(let i=0;i<125;i+=25){
    for(let j=0;j<125;j+=25){
        var statueBaseClone = statueBase.clone();
        statueBaseClone.position.set(80,-10,-25-j);
        scene.add(statueBaseClone);
    }
    statueBaseClone.position.set(0,-10,-25-i);
    scene.add(statueBaseClone);
}
//remaining temple objects
scene.add(templeParts);

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