//Road

//Fountain
var fountain = new THREE.Group();
//Fountain Structure
var fountainBaseG = new THREE.CylinderBufferGeometry(20,20,5,32,32,true);
var fountainBaseM = new THREE.MeshPhongMaterial({color: 0xffffff});
fountainBaseM.side = THREE.DoubleSide;//render both inside and outside
var fountainBase = new THREE.Mesh(fountainBaseG,fountainBaseM);

var fountainBottomG = new THREE.CylinderBufferGeometry(20,20,1,32,32);
var fountainBottom = new THREE.Mesh(fountainBottomG,fountainBaseM);
fountainBottom.position.set(0,-2,0);
fountain.add(fountainBottom);
fountain.add(fountainBase);
fountain.position.set(150,-18,0);

    //Spout
    //Base Water
var fountainWaterG = new THREE.CylinderBufferGeometry(19.9,19.9,3,32,32);
var fountainWaterM = new THREE.MeshPhongMaterial({color: 0x0000ff, transparent: true, opacity: 0.5});
var fountainWater = new THREE.Mesh(fountainWaterG,fountainWaterM);
fountain.add(fountainWater);
    //Flowing Water?

//Road
var roadG = new THREE.BoxBufferGeometry(50,1,40);
var roadM = new THREE.MeshPhongMaterial({color: 0x000000});
var roadPiece = new THREE.Mesh(roadG,roadM);

var roadMarkingG = new THREE.PlaneGeometry(8,2);
var roadMarkingM = new THREE.MeshPhongMaterial({color: 0xffffff});
var roadMarking = new THREE.Mesh(roadMarkingG,roadMarkingM);
roadMarking.position.set(0,0.51,0);
roadMarking.rotation.x = -Math.PI/2;

for(let i = 0;i<50;i+=16.67){
    roadMarkingClone = roadMarking.clone();
    roadMarkingClone.position.set(-21+i,0.51,0);
    roadPiece.add(roadMarkingClone);
}
//Apartment
var apartment = new THREE.Group();
apartment.position.set(100,30,140);

//var apartmentTexture = new THREE.TextureLoader().load("images/apartments2.png");

var apartmentBuildingG = new THREE.BoxBufferGeometry(100,100,100);
var apartmentBuildingM = new THREE.MeshPhongMaterial({color: 0xf8f8f8, //map:apartmentTexture
});
var apartmentBuilding = new THREE.Mesh(apartmentBuildingG,apartmentBuildingM);
apartmentBuilding.receiveShadow = true;
apartmentBuilding.castShadow = true;
apartment.add(apartmentBuilding);

//Lots
var lots = new THREE.Group();
lots.position.set(0,-20.1,0);

var lotM = new THREE.MeshPhongMaterial({color: 0x404040});
var lot1G = new THREE.BoxBufferGeometry(150,1,200);
var lot1 = new THREE.Mesh(lot1G,lotM);
lot1.receiveShadow = true;
lot1.position.set(40,0,-60);

var lot2G = new THREE.BoxBufferGeometry(150,1,150);
var lot2 = new THREE.Mesh(lot2G,lotM);
lot2.position.set(100,0,140);
lot2.receiveShadow = true;
lots.add(lot1,lot2);
lots.receiveShadow = true;

//road lights
var roadLights = new THREE.Group();
var roadLightM = new THREE.MeshPhongMaterial({color:0xd9dad9});
    //ground
var roadLightGroundG = new THREE.CylinderBufferGeometry(3,3,1,8);
var roadLightGround = new THREE.Mesh(roadLightGroundG,roadLightM);
roadLightGround.receiveShadow = true;
roadLightGround.castShadow = true;
roadLights.add(roadLightGround);
    //stem
var roadLightStemG = new THREE.CylinderBufferGeometry(0.6,0.6,25,16);
var roadLightStem = new THREE.Mesh(roadLightStemG,roadLightM);
roadLightStem.castShadow = true;
roadLightStem.receiveShadow = true;
roadLights.add(roadLightStem);
    //bend
var roadLightBendG = new THREE.TorusGeometry(4,0.6,16,50,3.142);
var roadLightBend = new THREE.Mesh(roadLightBendG,roadLightM);
roadLightBend.castShadow = true;
roadLightBend.receiveShadow = true;
roadLights.add(roadLightBend);
    //lantern
var roadLightLanternG = new THREE.CylinderBufferGeometry(1,3,3,16);
var roadLightLanternM = new THREE.MeshPhongMaterial({color: 0xf8e1bb, emissive: 0xffffff, transparent: true, opacity: 0.8});
var roadLightLantern = new THREE.Mesh(roadLightLanternG,roadLightLanternM);
roadLights.add(roadLightLantern);
var lanternLight = new THREE.PointLight(0xf8e1bb, 0.8, 60);
roadLightLantern.add(lanternLight);
lanternLight.castShadow = true;
    //part placements
roadLightGround.position.set(0,-20,0);
roadLightStem.position.set(0,-7,0);
roadLightBend.position.set(4,5.5,0);
roadLightLantern.position.set(8,4.5,0);
lanternLight.position.set(8,3,0);
    //placing lights around the map
var placedRoadLights = new THREE.Group();
function createLampPost(x,z,rot){ //function to reduce steps for making each lamp post
    let roadLight = roadLights.clone();
    roadLight.position.set(x,0,z);
    roadLight.rotation.y = rot;
    return roadLight;
}
placedRoadLights.add(createLampPost(-70,0,Math.PI));//using function
//placedRoadLights.add(createLampPost(-25,18,-Math.PI/2));
placedRoadLights.add(createLampPost(105,18,-Math.PI/2));
placedRoadLights.add(createLampPost(-200,18,-Math.PI/2));
//placedRoadLights.add(createLampPost(160,80,Math.PI/2));
placedRoadLights.add(createLampPost(40,80,Math.PI/2));
placedRoadLights.add(createLampPost(250,18,-Math.PI/2));

var advertSign = new THREE.Group();
var advertSignTexture = new THREE.TextureLoader().load("images/welcomeText.png");
advertSign.position.set(400,25,-170);
var advertG = new THREE.BoxBufferGeometry(40,20,1);
var advertM = new THREE.MeshLambertMaterial({map:advertSignTexture});
var advert = new THREE.Mesh(advertG,advertM);

function createPole(x){
    let advertPoleG = new THREE.CylinderBufferGeometry(0.5,0.5,20,8);
    let advertPoleM = new THREE.MeshPhongMaterial({color: 0x040404});
    let advertPole = new THREE.Mesh(advertPoleG,advertPoleM);
    advertPole.position.set(x,-10,-1);
    return advertPole;
}
advertSign.add(advert);
advertSign.add(createPole(-10));
advertSign.add(createPole(10));