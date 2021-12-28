// Direction Markers X,Y,Z for easier work
var markerGx = new THREE.BoxGeometry(10,0.5,0.5);
var markerGy = new THREE.BoxGeometry(0.5,10,0.5);
var markerGz = new THREE.BoxGeometry(0.5,0.5,10);
var markerTx = new THREE.MeshPhongMaterial({color: 0xffff00});
var markerTy = new THREE.MeshPhongMaterial({color: 0xff00ff});
var markerTz = new THREE.MeshPhongMaterial({color: 0x00ffff});
var markerMx = new THREE.Mesh(markerGx,markerTx);
var markerMy = new THREE.Mesh(markerGy,markerTy);
var markerMz = new THREE.Mesh(markerGz,markerTz);

