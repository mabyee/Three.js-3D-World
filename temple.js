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
//pillar base and top
var pillarBaseG = new THREE.BoxGeometry(7,2,7);
var pillarBase = new THREE.Mesh(pillarBaseG,m);
pillar.add(pillarBase);
pillarBase.position.set(0,-11,0);
var pillarTopG = new THREE.BoxGeometry(7,2,7);
var pillarTop = new THREE.Mesh(pillarTopG,m);
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
//Walls
var templeWallG = new THREE.BoxGeometry(8,42,130);
var templeWallL = new THREE.Mesh(templeWallG,m);
templeWallL.position.set(-14,0,-75);

var templeWallR = new THREE.Mesh(templeWallG,m);
templeWallR.position.set(94,0,-75);

var templeWallBG = new THREE.BoxGeometry(116,42,5);
var templeWallB = new THREE.Mesh(templeWallBG,m);
templeWallB.position.set(40,0,-140);

//temple parts
var templeParts = new THREE.Mesh; // adding all objects as one for efficiency
templeParts.add(templeWallL, templeWallR, templeWallB, templeFloor, templeRoof);

//Art/Statue bases + light
var statueBaseG = new THREE.BoxGeometry(10,5,10);
var statueBase = new THREE.Mesh(statueBaseG,m);

var statueLight = new THREE.PointLight(0xff00ff,0.5,20,2);
statueBase.add(statueLight);
statueLight.position.set(0,10,0);

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
var treeTrunkG = new THREE.CylinderGeometry(2,3,20,10,1);
var treeTrunkM = new THREE.MeshPhongMaterial({color:0x964b00});
var treeTrunk = new THREE.Mesh(treeTrunkG,treeTrunkM);
treeTrunk.position.set(-30,-10,0);
var treeTopG = new THREE.TorusKnotGeometry(5,5,170,6,14,16); //using torus knot geometry to make the tree top
var treeTopM = new THREE.MeshPhongMaterial({color:0x618a3d});
var treeTop = new THREE.Mesh(treeTopG,treeTopM);
treeTop.rotation.x = Math.PI/2;
treeTop.position.set(0,10,0);
treeTrunk.add(treeTop);

