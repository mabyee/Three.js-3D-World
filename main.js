//var collection
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

//setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 5000 )
camera.position.set(1,10,70);

// renderer setup
var renderer = new THREE.WebGLRenderer();
renderer.setSize(windowWidth, windowHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enable = true;


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
var skyLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.9);
scene.add(skyLight);

//---PLANE---
var planeG = new THREE.PlaneGeometry(1000,1000);
var planeT = new THREE.MeshPhongMaterial({color: 0x00ff00});
var plane = new THREE.Mesh(planeG,planeT);
plane.position.set(50,-20,0);
plane.rotation.x = -Math.PI/2;
plane.receiveShadow = true;

//SkyBox TODO: Add night box and trigger on button press (night/day)
let skyArray = [];
let ft = new THREE.TextureLoader().load("images/bluecloud_ft.jpg");
let bk = new THREE.TextureLoader().load("images/bluecloud_bk.jpg");
let up = new THREE.TextureLoader().load("images/bluecloud_up.jpg");
let dn = new THREE.TextureLoader().load("images/bluecloud_dn.jpg");
let rt = new THREE.TextureLoader().load("images/bluecloud_rt.jpg");
let lf = new THREE.TextureLoader().load("images/bluecloud_lf.jpg");

skyArray.push(new THREE.MeshBasicMaterial( { map: ft }));
skyArray.push(new THREE.MeshBasicMaterial( { map: bk }));
skyArray.push(new THREE.MeshBasicMaterial( { map: up }));
skyArray.push(new THREE.MeshBasicMaterial( { map: dn }));
skyArray.push(new THREE.MeshBasicMaterial( { map: rt }));
skyArray.push(new THREE.MeshBasicMaterial( { map: lf }));

for(let i=0;i<6;i++){
    skyArray[i].side = THREE.BackSide;
    let skyboxG = new THREE.BoxGeometry(4000,4000,4000);
    let skybox = new THREE.Mesh(skyboxG, skyArray);
    scene.add(skybox);
}

//pillars
for(let i = 0; i < 100; i+=20){ //adjusted so the distance between pillars is 20
    var pillarClone = pillar.clone();
        pillarClone.position.set(i,0,0);
        scene.add(pillarClone);
}
//car

//stairs
for(let i = 0; i < 10; i+=2){
    var templeStairClone = templeStair.clone();
        templeStairClone.position.set(40,-12-i,i);
        templeStairClone.scale.set(1+i/50,1,1);
        scene.add(templeStairClone);
}
//statue bases
for(let i=0;i<125;i+=25){
    for(let j=0;j<150;j+=25){
        var statueBaseClone = statueBase.clone();
        statueBaseClone.position.set(80,-10,-25-j);
        scene.add(statueBaseClone);
    }
    statueBaseClone.position.set(0,-10,-25-i);
    scene.add(statueBaseClone);
}
//trees
for(let i=0;i<900;i+=25){
    let j = Math.floor(Math.random() * 70); //place trees at random distances and height to eachother
    var treeClone = treeTrunk.clone();
    treeClone.position.set(-400+j*3,-10-j/15,-420+i+j/5);
    scene.add(treeClone);
}
//remaining temple objects
scene.add(plane);
scene.add(templeParts);
scene.add(torusKnot);
scene.add(loadingSymbol);
scene.add(treeTrunk);
scene.add(car);

// logic
var update = function()
{
    torusKnot.rotation.x += 0.005;
    torusKnot.rotation.y += 0.005;
    loadingSymbol.rotation.x += 0.08;
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