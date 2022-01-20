//Temple Model
//pillars
var pillarG = new THREE.BoxBufferGeometry(5, 20, 5, 10, 10, 10);
var pillarM = new THREE.MeshPhongMaterial({color: 0xbababa});
var pillar = new THREE.Mesh(pillarG, pillarM);
twisting(pillarG, 18);
pillar = new THREE.Mesh(pillarG, pillarM);
function twisting(geometry, degree) { //twisting the pillars
    let quaternion = new THREE.Quaternion();
    let positionAttribute = geometry.getAttribute('position');
    let vertex = new THREE.Vector3();
    for ( let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex++ ) {//loop
        vertex.fromBufferAttribute( positionAttribute, vertexIndex );
        let yPos = vertex.y;
        let upVec = new THREE.Vector3(0, 1, 0);
        quaternion.setFromAxisAngle(upVec, (Math.PI/180)*degree*yPos);//quaternion used to calulate the rotation to a Vector3, thus finding a point
        vertex.applyQuaternion(quaternion);
        geometry.attributes.position.setXYZ( vertexIndex, vertex.x, vertex.y, vertex.z ); //adjusting vertex positions
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals(); //updating the vertex positions
}
var temple = new THREE.Group(); // adding all objects as one to avoid adding items seperately to the scene
//pillar base and top
var pillarBaseG = new THREE.BoxBufferGeometry(7,2,7);
var pillarBase = new THREE.Mesh(pillarBaseG,pillarM);
pillarBase.castShadow = true;
pillarBase.receiveShadow = true;
pillar.add(pillarBase);
pillarBase.position.set(0,-11,0);
var pillarTopG = new THREE.BoxBufferGeometry(7,2,7);
var pillarTop = new THREE.Mesh(pillarTopG,pillarM);
pillarTop.receiveShadow = true;
pillarTop.castShadow = true;
pillar.add(pillarTop);
pillarTop.position.set(0,11,0);
//Roof + Floor + Stairs
var templeRoofG = new THREE.BoxBufferGeometry(100,10,150);
var templeRoof = new THREE.Mesh(templeRoofG,pillarM);
templeRoof.position.set(40,16,-65);
var templefloorG = new THREE.BoxBufferGeometry(100,2,150);
var templeFloor = new THREE.Mesh(templefloorG,pillarM);
templeFloor.position.set(40,-12,-65);
temple.add(templeFloor, templeRoof);
templeFloor.receiveShadow = true;
templeFloor.castShadow = true;
templeRoof.receiveShadow = true;
templeRoof.castShadow = true;
var templeStairG = new THREE.BoxBufferGeometry(100,2,40);
var templeStair = new THREE.Mesh(templeStairG,pillarM);
for(let i = 0; i < 10; i+=2){
    var templeStairClone = templeStair.clone();
        templeStairClone.position.set(40,-12-i,i);
        templeStairClone.scale.set(1+i/50,1,1);
        templeStairClone.receiveShadow = true;
        templeStairClone.castShadow = true;
        temple.add(templeStairClone);
}
//Walls
function createWall(SizeX,SizeY,SizeZ,PosX,PosY,PosZ){
    var templeWallG = new THREE.BoxBufferGeometry(SizeX,SizeY,SizeZ);
    var templeWall = new THREE.Mesh(templeWallG,pillarM);
    templeWall.position.set(PosX,PosY,PosZ);
    templeWall.receiveShadow = true;
    templeWall.castShadow = true;
    return templeWall;
}
temple.add(createWall(8,42,130,-14,0,-75));
temple.add(createWall(8,42,130,94,0,-75));
temple.add(createWall(116,42,5,40,0,-140));
//pillars
for(let i = 0; i < 100; i+=20){ //adjusted so the distance between pillars is 20
    var pillarClone = pillar.clone();
        pillarClone.position.set(i,0,0);
        pillarClone.receiveShadow = true;
        pillarClone.castShadow = true;
        temple.add(pillarClone);
}
//Art/Statue bases + light + cover
var statue = new THREE.Group();
var statueBaseG = new THREE.BoxBufferGeometry(10,5,10);
var statueBaseM = new THREE.MeshPhongMaterial({color: 0xffffff});
var statueBase = new THREE.Mesh(statueBaseG,statueBaseM);
statueBase.castShadow = true;
statueBase.receiveShadow = true;
statue.add(statueBase);
//light holders
var templeLightG = new THREE.BoxBufferGeometry(2,2,2);
var templeLightM = new THREE.MeshPhongMaterial({color: 0x505050});
var templeLight = new THREE.Mesh(templeLightG,templeLightM);
templeLight.receiveShadow = true;
templeLight.castShadow = true;
templeLight.position.set(0,21,0);
var templeLightG2 = new THREE.BoxBufferGeometry(1,1,1);
var templeLightM2= new THREE.MeshPhongMaterial({color: 0xffffff, emissive: 0xffffff, transparent: true, opacity: 0.8});
var templeLight2 = new THREE.Mesh(templeLightG2,templeLightM2);
templeLight.add(templeLight2);
templeLight2.position.set(0,-1,0);
statue.add(templeLight);
//Glass cover for statue
var baseCoverG = new THREE.BoxBufferGeometry(10,15,10);
var baseCoverM = new THREE.MeshPhongMaterial({color: 0x565656, transparent: true, opacity: 0.2, shininess: 100});//transparent: true and the opacity make it look like glass
var baseCover = new THREE.Mesh(baseCoverG,baseCoverM);
baseCover.position.set(0,10,0);
statue.add(baseCover);
//Lights above statues
var statueLight = new THREE.PointLight(0xfffff0, 1, 20);
statue.add(statueLight);
statueLight.position.set(0,15,0);
statueLight.castShadow = true;

for(let i=0;i<125;i+=25){
    var statueBaseClone = statue.clone();
    statueBaseClone.position.set(0,-10,-25-i);
    statueBaseClone.receiveShadow = true;
    statueBaseClone.castShadow = true;
    temple.add(statueBaseClone);
}
//Tables in Temple
function placeTable(x,y){
    let tableG = new THREE.CylinderGeometry(6, 2, 10, 8);
    let tableM = new THREE.MeshPhongMaterial({color: 0xf88f8f});
    let table = new THREE.Mesh(tableG, tableM);
    let tableBaseG = new THREE.CylinderGeometry(4,4,1,16);
    let tableBaseM = new THREE.MeshPhongMaterial({color: 0x000000});
    let tableBase = new THREE.Mesh(tableBaseG,tableBaseM);
    table.add(tableBase);
    tableBase.position.set(0,-5,0);
    table.position.set(x,-6,y);
    return table;
}
temple.add(placeTable(60,-90));
temple.add(placeTable(80,-120));
temple.add(placeTable(80,-60));
temple.add(placeTable(60,-30));
//Tree
var tree = new THREE.Group;
var treeTrunkG = new THREE.CylinderGeometry(2,3,20,10,1);
var treeTrunkM = new THREE.MeshPhongMaterial({color:0x964b00});
var treeTrunk = new THREE.Mesh(treeTrunkG,treeTrunkM);
treeTrunk.position.set(0,0,0);
treeTrunk.castShadow = true;
treeTrunk.receiveShadow = true;
tree.add(treeTrunk);
var treeTopG = new THREE.TorusKnotGeometry(5,5,170,6,14,16); //using torus knot geometry to make the tree top
var treeTopM = new THREE.MeshPhongMaterial({color:0x618a3d});
var treeTop = new THREE.Mesh(treeTopG,treeTopM);
treeTop.castShadow = true;
treeTop.rotation.x = Math.PI/2;
treeTop.position.set(0,10,0);
tree.add(treeTop);

//Artworks/Statues
//Art 1 - Rotating Torus Knot
var torusG = new THREE.TorusKnotGeometry(2,0.5,60,8,2,5);
var torusM = new THREE.MeshPhongMaterial({color:0xffff00});
var torusKnot = new THREE.Mesh(torusG,torusM);
torusKnot.castShadow = true;
torusKnot.position.set(0,0,-25);
//Art 2 - Loading symbol
var loadingG = new THREE.RingGeometry(3,5,15,1,0,3.2);
var loadingM = new THREE.MeshPhongMaterial({color:0x0000ff});
var loadingSymbol = new THREE.Mesh(loadingG,loadingM);
loadingSymbol.position.set(0,0,-50);
loadingSymbol.rotation.y = Math.PI/2;
//Art 3 - miniCar
miniCar.scale.set(0.25,0.25,0.25);//using scale to make a smaller copy of the original car
miniCar.position.set(0,-6.5,-75);
miniCar.rotation.y = Math.PI;
//Art 4 - miniTree
var miniTree = tree.clone();
miniTree.scale.set(0.25,0.25,0.25);
miniTree.position.set(0,-5,-100);
//Art 5 - minFlag
var miniFlag = flag.clone();
miniFlag.scale.set(0.1,0.1,0.1);
miniFlag.position.set(0,-8,-115);
miniFlag.rotation.y = Math.PI/2;
