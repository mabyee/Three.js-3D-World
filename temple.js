//Temple Model
//pillars
var pillar = null;
var pillarGeom = new THREE.BoxGeometry(5, 20, 5, 10, 10, 10);
var m = new THREE.MeshPhongMaterial( {
color: 0xbababa,
shininess: 20,
} );
pillar = new THREE.Mesh(pillarGeom, m);
twisting(pillarGeom, 18);
pillar = new THREE.Mesh(pillarGeom, m);
function twisting(geometry, degree) { //twisting the pillars
    const quaternion = new THREE.Quaternion();
    var positionAttribute = geometry.getAttribute( 'position' );
    const vertex = new THREE.Vector3();
    for ( let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex++ ) {
    vertex.fromBufferAttribute( positionAttribute, vertexIndex );
    const yPos = vertex.y;
    const upVec = new THREE.Vector3(0, 1, 0);
    quaternion.setFromAxisAngle(upVec, (Math.PI/180)*degree*yPos);
    vertex.applyQuaternion(quaternion);
    geometry.attributes.position.setXYZ( vertexIndex, vertex.x, vertex.y, vertex.z ); //adjusting vertex positions
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals(); //updating the vertex positions
}
var temple = new THREE.Group(); // adding all objects as one for efficiency

//pillar base and top
var pillarBaseG = new THREE.BoxGeometry(7,2,7);
var pillarBase = new THREE.Mesh(pillarBaseG,m);
pillarBase.castShadow = true;
pillarBase.receiveShadow = true;
pillar.add(pillarBase);
pillarBase.position.set(0,-11,0);
var pillarTopG = new THREE.BoxGeometry(7,2,7);
var pillarTop = new THREE.Mesh(pillarTopG,m);
pillarTop.receiveShadow = true;
pillarTop.castShadow = true;
pillar.add(pillarTop);
pillarTop.position.set(0,11,0);
//Roof
var templeRoofG = new THREE.BoxGeometry(100,10,150);
var templeRoof = new THREE.Mesh(templeRoofG,m);
templeRoof.position.set(40,16,-65);
//Floor + stairs
var templefloorG = new THREE.BoxGeometry(100,2,150);
var templeFloor = new THREE.Mesh(templefloorG,m);
templeFloor.position.set(40,-12,-65);
var templeStairG = new THREE.BoxGeometry(100,2,40);
var templeStair = new THREE.Mesh(templeStairG,m);
for(let i = 0; i < 10; i+=2){
    var templeStairClone = templeStair.clone();
        templeStairClone.position.set(40,-12-i,i);
        templeStairClone.scale.set(1+i/50,1,1);
        templeStairClone.receiveShadow = true;
        templeStairClone.castShadow = true;
        temple.add(templeStairClone);
}
//Walls
var templeWallG = new THREE.BoxGeometry(8,42,130);
var templeWallL = new THREE.Mesh(templeWallG,m);
templeWallL.position.set(-14,0,-75);

var templeWallR = new THREE.Mesh(templeWallG,m);
templeWallR.position.set(94,0,-75);

var templeWallBG = new THREE.BoxGeometry(116,42,5);
var templeWallB = new THREE.Mesh(templeWallBG,m);
templeWallB.position.set(40,0,-140);

//pillars
for(let i = 0; i < 100; i+=20){ //adjusted so the distance between pillars is 20
    var pillarClone = pillar.clone();
        pillarClone.position.set(i,0,0);
        pillarClone.receiveShadow = true;
        pillarClone.castShadow = true;
        temple.add(pillarClone);
}

//temple parts
temple.add(templeWallL, templeWallR, templeWallB, templeFloor, templeRoof);
templeWallL.receiveShadow = true;
templeWallL.castShadow = true;
templeWallR.receiveShadow = true;
templeWallR.castShadow = true;
templeWallB.receiveShadow = true;
templeWallB.castShadow = true;
templeFloor.receiveShadow = true;
templeFloor.castShadow = true;
templeRoof.receiveShadow = true;
templeRoof.castShadow = true;

//Art/Statue bases + light + cover
var statue = new THREE.Group();
var statueBaseG = new THREE.BoxGeometry(10,5,10);
var statueBaseM = new THREE.MeshPhongMaterial({color: 0x050505});
var statueBase = new THREE.Mesh(statueBaseG,statueBaseM);
statueBase.castShadow = true;
statueBase.receiveShadow = true;
statue.add(statueBase);

var templeLightG = new THREE.BoxGeometry(2,2,2);
var templeLightM = new THREE.MeshPhongMaterial({color: 0x505050});
var templeLight = new THREE.Mesh(templeLightG,templeLightM);
templeLight.receiveShadow = true;
templeLight.castShadow = true;
templeLight.position.set(0,21,0);

var templeLightG2 = new THREE.BoxGeometry(1,1,1);
var templeLightM2= new THREE.MeshPhongMaterial({color: 0xffffff, emissive: 0xffffff, transparent: true, opacity: 0.8});
var templeLight2 = new THREE.Mesh(templeLightG2,templeLightM2);
templeLight.add(templeLight2);
templeLight2.position.set(0,-1,0);

let templePointLight = new THREE.PointLight(0xffffa0,0.5,30);
templePointLight.castShadow = true;
templePointLight.position.set(0,9,-25);
temple.add(templePointLight); // TODO: Make an array and lots of lights. FOR LOOP + ADD DOES NOT WORK

statue.add(templeLight);

var baseCoverG = new THREE.BoxGeometry(10,15,10);
var baseCoverM = new THREE.MeshPhongMaterial({color: 0xffffff, transparent: true, opacity: 0.2, shininess: 100});
var baseCover = new THREE.Mesh(baseCoverG,baseCoverM);
baseCover.position.set(0,10,0);
statue.add(baseCover);

for(let i=0;i<125;i+=25){
    for(let j=0;j<150;j+=25){
        var statueBaseClone = statue.clone();
        statueBaseClone.position.set(80,-10,-25-j);
        statueBaseClone.receiveShadow = true;
        statueBaseClone.castShadow = true;
        temple.add(statueBaseClone);
    }
    statueBaseClone.position.set(0,-10,-25-i);
    statueBaseClone.receiveShadow = true;
    statueBaseClone.castShadow = true;
    temple.add(statueBaseClone);
}

//Artworks/Statues
//Art 1 - Rotating Torus Knot
var torusG = new THREE.TorusKnotGeometry(2,0.5,60,8,2,5);
var torusM = new THREE.MeshPhongMaterial({color:0xffff00});
var torusKnot = new THREE.Mesh(torusG,torusM);
torusKnot.position.set(0,0,-25);
//Art 2 - Loading symbol
var loadingG = new THREE.RingGeometry(3,5,15,1,0,3.2);
var loadingM = new THREE.MeshPhongMaterial({color:0x0000ff});
var loadingSymbol = new THREE.Mesh(loadingG,loadingM);
loadingSymbol.position.set(0,0,-50);
loadingSymbol.rotation.y = Math.PI/2;
//Art 3 - Tree
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
treeTop.receiveShadow = true;
treeTop.rotation.x = Math.PI/2;
treeTop.position.set(0,10,0);
tree.add(treeTop);
//Art 4 - TODO