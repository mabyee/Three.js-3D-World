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
//Base Water
var fountainWaterG = new THREE.CylinderBufferGeometry(19.9,19.9,3,32,32);
var fountainWaterM = new THREE.MeshPhongMaterial({color: 0x0000ff, transparent: true, opacity: 0.5});
var fountainWater = new THREE.Mesh(fountainWaterG,fountainWaterM);
fountain.add(fountainWater);
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
apartment.position.set(0,-20,0);
function createApartmentBuilding(SizeX,SizeY,SizeZ,colourHEX,PosX,PosZ){ //modular apartments function
    let apartmentBuildingG = new THREE.BoxBufferGeometry(SizeX,SizeY,SizeZ);
    let apartmentBuildingM = new THREE.MeshPhongMaterial({color: colourHEX});
    let apartmentBuilding = new THREE.Mesh(apartmentBuildingG,apartmentBuildingM);
    apartmentBuilding.receiveShadow = true;
    apartmentBuilding.castShadow = true;
    apartmentBuilding.position.set(PosX,(SizeY/2),PosZ);//setting the Y position to half of the Y height, as the objects coordinate is the center of the building
    let lotG = new THREE.BoxBufferGeometry(SizeX+20,1,SizeZ+20);//adding the lot just around the building
    let lotM = new THREE.MeshPhongMaterial({color: 0x404040});
    let lot = new THREE.Mesh(lotG,lotM);
    apartmentBuilding.add(lot);
    lot.position.set(0,-(SizeY/2),0);//making sure the lot starts at the bottom of the building
    return apartmentBuilding;
}
apartment.add(createApartmentBuilding(100,100,100,0xf88f8f,350,130));
apartment.add(createApartmentBuilding(125,80,80,0xf88f8f,150,120));
apartment.add(createApartmentBuilding(80,150,80,0xf88f8f,-30,200));
apartment.add(createApartmentBuilding(50,200,50,0xf88f8f,-45,350));

//temple lot
var templeLotM = new THREE.MeshPhongMaterial({color: 0x404040});
var templeLotG = new THREE.BoxBufferGeometry(150,1,200);
var templeLot = new THREE.Mesh(templeLotG,templeLotM);
templeLot.receiveShadow = true;
templeLot.position.set(40,-20.1,-60);

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