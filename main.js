//var collection
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

//setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(55, windowWidth / windowHeight, 0.1, 3000 )
camera.position.set(0,0,14);

// renderer setup
var renderer = new THREE.WebGLRenderer();
renderer.setSize(windowWidth, windowHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;//best performance shadow map

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
var mainLights = new THREE.Group();
var skyLight = new THREE.PointLight(0xffffbb, 1,1000);
skyLight.position.set(300,300,-300);
skyLight.castShadow = true;
mainLights.add(skyLight);

var hemisphere = new THREE.HemisphereLight(0xffffbb,0x080820,0.3);
mainLights.add(hemisphere);

//---PLANE---
var planeG = new THREE.PlaneGeometry(1000,1000,50,50);
var planeT = new THREE.MeshPhongMaterial({color: 0x348c31});
for (let i = 0;i<1000;i+=51){//loop to deform plane for a river
    planeG.attributes.position.setZ(35+i,-20);
}
for (let i = 0;i<16;i++){
    planeG.attributes.position.setZ(1004+i,-20);
}
for (let i = 0;i<900;i+=51){//raising land inside of river area, hill-like
    planeG.attributes.position.setZ(37+i,30);
    for (let j= 0;j<14;j++){
        planeG.attributes.position.setZ(37+i+j,30);
    }
}

planeG.attributes.position.needsUpdate = true;
var plane = new THREE.Mesh(planeG,planeT);
plane.position.set(50,-20,0);
plane.rotation.x = -Math.PI/2;
plane.receiveShadow = true;
//River
var riverPlaneG = new THREE.PlaneBufferGeometry(400,400,20,20);
for (let i = 0;i<400;i++){//loop to deform river plane randomly to mimick water behaviour
    let j = Math.floor(Math.random() * 2);
    riverPlaneG.attributes.position.setZ(i,-j);
}
var riverPlane = new THREE.Mesh(riverPlaneG,fountainWaterM);
riverPlane.rotation.x = -Math.PI/2;
scene.add(riverPlane);
riverPlane.position.set(350,-21,-300);

//SkyBox
let skyArray = [];
let ft = new THREE.TextureLoader().load("images/bluecloud_ft.jpg");
let bk = new THREE.TextureLoader().load("images/bluecloud_bk.jpg");
let up = new THREE.TextureLoader().load("images/bluecloud_up.jpg");
let dn = null;//unnecessary to load as not visible
let rt = new THREE.TextureLoader().load("images/bluecloud_rt.jpg");
let lf = new THREE.TextureLoader().load("images/bluecloud_lf.jpg");

skyArray.push(new THREE.MeshBasicMaterial( { map: ft }));
skyArray.push(new THREE.MeshBasicMaterial( { map: bk }));
skyArray.push(new THREE.MeshBasicMaterial( { map: up }));
skyArray.push(new THREE.MeshBasicMaterial( { map: dn }));
skyArray.push(new THREE.MeshBasicMaterial( { map: rt }));
skyArray.push(new THREE.MeshBasicMaterial( { map: lf }));
var skyBox = new THREE.Group();

for(let i=0;i<6;i++){
    skyArray[i].side = THREE.BackSide;
    let skyboxG = new THREE.BoxBufferGeometry(2000,2000,2000);
    let skybox = new THREE.Mesh(skyboxG, skyArray);
    skyBox.add(skybox);
}
scene.add(skyBox);

//car + 2nd car
car.position.set(20,-16,60);
var car3 = car.clone();
car3.position.set(-90,-16,40);
car3.rotation.y = Math.PI/2;

//trees
var forest = new THREE.Group();
for(let i=0;i<450;i+=25){
    let j = Math.floor(Math.random() * 70); //place trees at random distances and height to eachother
    var treeClone = tree.clone();
    treeClone.position.set(-350+j*3,-10-j/15,-420+i+j/5);
    forest.add(treeClone);
}
var forest2 = forest.clone();
forest2.position.set(0,0,488);


//adding road blocks together to make a longer road
var road = new THREE.Group();
road.position.set(-100,-20,475);//defining the starting point
road.rotation.y = Math.PI/2;//rotating road
var roadLength = 20;//define the length of the road here
for(let i=0;i<roadLength;i++){
    var roadPieceClone = roadPiece.clone();
    roadPieceClone.position.set(0+i*50,0,0);
    road.add(roadPieceClone);
}
var road2 = road.clone();//second road
road2.position.set(525,-20,50);
road2.rotation.y = Math.PI;
road.receiveShadow = true;
road2.receiveShadow = true;

//adding objects to scene
scene.add(plane);
scene.add(torusKnot);
scene.add(loadingSymbol);
scene.add(car,car3);
scene.add(miniCar, miniTree);
scene.add(fountain);
scene.add(road, road2);
scene.add(forest, forest2);
scene.add(lots);
scene.add(apartment);
scene.add(temple);
scene.add(mainLights);
scene.add(placedRoadLights);
scene.add(advertSign);

//Character controls setup
//initiate keyboard
var keyboard = {};
function keyDown(event){
    keyboard[event.keyCode] = true;
}
function keyUp(event){
    keyboard[event.keyCode] = false;
}
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

var skyLightStatus = true;
// logic
var update = function()
{
    torusKnot.rotation.x += 0.005;
    torusKnot.rotation.y += 0.005;
    loadingSymbol.rotation.x += 0.08;
    document.onkeydown = function(lights) {
        switch (lights.keyCode) {
            case 84: //turn night on and off
                if(skyLightStatus == true){
                    scene.remove(mainLights);
                    scene.remove(skyBox);
                    skyLightStatus = false;
                }
                else{
                    scene.add(skyBox);
                    scene.add(mainLights);
                    skyLightStatus = true;
                }
                break;
        }
    };
    if(keyboard[87]){ //W key - Forwards
        camera.position.x -= Math.sin(camera.rotation.y)*1;
        camera.position.z -= Math.cos(camera.rotation.y)*1;
    }
    if(keyboard[83]){//S Key - Backwards
        camera.position.x += Math.sin(camera.rotation.y)*1;
        camera.position.z += Math.cos(camera.rotation.y)*1;
    }
    if(keyboard[65]){//A Key - Turn left
        camera.rotation.y += Math.PI/2 * 0.02;
    }
    if(keyboard[68]){//D Key - Turn right
        camera.rotation.y -= Math.PI/2 * 0.02;
    }
    //car movement
    car.position.x -=0.5;
    if(car.position.x < -450){
        car.position.x = 450;
    }
    car3.position.z +=0.5;
    if(car3.position.z > 450){
        car3.position.z = -450;
    }
    //testing

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