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

