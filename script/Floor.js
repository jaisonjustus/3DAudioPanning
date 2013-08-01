var Panner = Panner || {};

var WorldObject = Panner.WorldObject = {

	return {
		get : function()	{
			mycubeGeom = new THREE.CubeGeometry( 10, 10, 10);
			mycubeMat = new THREE.MeshBasicMaterial({color: 0x000000});
			mycube = new THREE.Mesh( mycubeGeom, mycubeMat);
			scene.add(mycube);
		}
};