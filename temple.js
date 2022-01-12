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


var templeParts = new THREE.Mesh; // adding all objects as one for efficiency
templeParts.add(templeWallL, templeWallR, templeWallB, templeFloor, templeRoof);