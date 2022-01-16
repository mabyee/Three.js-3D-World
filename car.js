// Car
var car = new THREE.Group;
var carBodyG = new THREE.BoxGeometry(30,8,15);
var carBodyM = new THREE.MeshPhongMaterial({color: 0x787878});
var carBody = new THREE.Mesh(carBodyG,carBodyM);
carBody.receiveShadow = true;
carBody.castShadow = true;
carBody.position.set(1,1,1);
car.add(carBody);

function createWheel(){ //function for creating as many wheels as I need
    let wheelG = new THREE.CylinderGeometry(3,3,3,16);
    let wheelM = new THREE.MeshPhongMaterial({color:0x333333});
    let wheel = new THREE.Mesh(wheelG,wheelM);
    wheel.receiveShadow = true;
    wheel.castShadow = true;
    wheel.rotation.x = Math.PI/2;
    return wheel;
}
var wheelFR = createWheel();// creating instances of the wheel
var wheelFL = createWheel();
var wheelBR = createWheel();
var wheelBL = createWheel();

wheelFR.position.set(-9,-1,9);//positioning each wheel at a different point around the car
car.add(wheelFR);
wheelFL.position.set(-9,-1,-7);
car.add(wheelFL);
wheelBR.position.set(11,-1,9);
car.add(wheelBR);
wheelBL.position.set(11,-1,-7);
car.add(wheelBL);

var carTopG = new THREE.BoxGeometry(22,7,15);
var carTopM = new THREE.MeshPhongMaterial({color: 0x787878});
var carTop = new THREE.Mesh(carTopG,carTopM);
carTop.receiveShadow = true;
carTop.castShadow = true;
carTop.position.set(5,8,1);
car.add(carTop);
//car windows
function createWindow(){
    let carWindowG = new THREE.BoxGeometry(9,5,15.1);
    let carWindowM = new THREE.MeshPhongMaterial({color: 0xffffff, transparent: true, opacity: 0.4, shininess: 100, emissive: 0x787878});
    let carWindow = new THREE.Mesh(carWindowG,carWindowM);
    return carWindow;
}
var carWindowF = createWindow();
var carWindowB = createWindow();

carWindowF.position.set(0,8,1);
car.add(carWindowF);
carWindowB.position.set(10,8,1);
car.add(carWindowB);

var carWindow2G = new THREE.BoxGeometry(22.1,5,12);
var carWindow2M = new THREE.MeshPhongMaterial({color: 0xffffff, transparent: true, opacity: 0.4, shininess: 100, emissive: 0x787878});
var carWindowFront = new THREE.Mesh(carWindow2G,carWindow2M);

car.add(carWindowFront);
carWindowFront.position.set(5,8,1);
//car door handels
function createDoorHandels(){
    let doorHandleG = new THREE.BoxGeometry(2,0.7,16);
    let doorHandleM = new THREE.MeshPhongMaterial({color: 0x0f0f0f});
    let doorHandle = new THREE.Mesh(doorHandleG,doorHandleM);
    doorHandle.receiveShadow = true;
    doorHandle.castShadow = true;
    return doorHandle;
}
var doorHandleF = createDoorHandels();
var doorHandleB = createDoorHandels();

car.add(doorHandleF, doorHandleB);
doorHandleF.position.set(2,4,1);
doorHandleB.position.set(12,4,1);
//car light bars
var lightBarG = new THREE.BoxGeometry(1,1,14);
var lightBarBM = new THREE.MeshPhongMaterial({color: 0xff160c, emissive: 0xff160c});
var lightBarFM = new THREE.MeshPhongMaterial({color: 0xadd8e6, emissive: 0xadd8e6});

var lightBarB = new THREE.Mesh(lightBarG, lightBarBM);
var lightBarF = new THREE.Mesh(lightBarG, lightBarFM);
car.add(lightBarB, lightBarF);
lightBarB.position.set(16,5,1);
lightBarF.position.set(-14,4,1);
//making mini copy
var miniCar = car.clone();
//adding lights to the car
var lightBarLightF = new THREE.PointLight(0xadd8e6,0.8,200);
lightBarLightF.castShadow = true;

car.add(lightBarLightF);
lightBarLightF.position.set(-14.1,4,1);
var lightBarLightB = new THREE.PointLight(0xff160c,0.5,50);
lightBarLightB.castShadow = true;
car.add(lightBarLightB);
lightBarLightB.position.set(16.1,5,1);