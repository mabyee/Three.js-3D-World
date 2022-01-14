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

