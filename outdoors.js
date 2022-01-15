//Road

//Fountain
var fountain = new THREE.Group();
//Fountain Structure
var fountainBaseG = new THREE.CylinderGeometry(20,20,5,32,32,true);
var fountainBaseM = new THREE.MeshPhongMaterial({color: 0xffffff});
fountainBaseM.side = THREE.DoubleSide;//render both inside and outside
var fountainBase = new THREE.Mesh(fountainBaseG,fountainBaseM);

var fountainBottomG = new THREE.CylinderGeometry(20,20,1,32,32);
var fountainBottom = new THREE.Mesh(fountainBottomG,fountainBaseM);
fountainBottom.position.set(0,-2,0);
fountain.add(fountainBottom);
fountain.add(fountainBase);
fountain.position.set(150,-18,0);

    //Spout
    //Base Water
var fountainWaterG = new THREE.CylinderGeometry(19.9,19.9,3,32,32);
var fountainWaterM = new THREE.MeshPhongMaterial({color: 0x0000ff, transparent: true, opacity: 0.5});
var fountainWater = new THREE.Mesh(fountainWaterG,fountainWaterM);
fountain.add(fountainWater);
    //Flowing Water?
//River

//Road
var roadG = new THREE.BoxGeometry(50,1,40);
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
//Trafficlight?


//Parking lot
var parkingLot = new THREE.Group();
parkingLot.position.set(300,-20,-75);

var parkingMainG = new THREE.BoxGeometry(150,1,250);
var parkingMain = new THREE.Mesh(parkingMainG,roadM);
parkingLot.add(parkingMain);