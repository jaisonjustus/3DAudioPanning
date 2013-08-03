var TRON = TRON || {};

var Asylum = TRON.Asylum = {

	_viewport : {
		width : window.innerWidth + 48,
		height : window.innerHeight + 48
	},

	_cameraProperties : {
		fov : 45,
		aspect : this._viewport.width / this._viewport.height,
		near : 1,
		far : 40000
	},

	_renderer : new THREE.WebGLRenderer(),

	_scene : new THREE.Scene(),

	_camera : new THREE.PerspectiveCamera(
		this._cameraProperties.fov,
		this._cameraProperties.aspect,
		this._cameraProperties.near,
		this._cameraProperties.far
	),

	_placeCamera : function()	{
		this._camera.position.set(0,0,-70);
		this._camera.lookAt(new THREE.Vector3(0,0,0));
		this._scene.add(this._camera);
	},

	_gameElements : {},

	_textures : {
		floorAndRoof : new THREE.ImageUtils.loadTexture("images/floor-and-roof.png"),
		walls : new THREE.ImageUtils.loadTexture("images/walls.jpg")
	}

	_createFloorAndRoof : function()	{
		var geometry = new THREE.CubeGeometry(150, 5, 500),
				material = null;

		this._textures.floorAndRoof.wrapS = this._textures.floorAndRoof.wrapT = THREE.RepeatWrapping;
		material = new MeshBasicMaterial({ map : this._textures.floorAndRoof });
		material.overdraw = true;

		this._gameElements.roof = this._gameElements.floor = new THREE.Mesh(geometry, material);
		this._gameElements.roof.position.y = 15;
		this._gameElements.floor.position.y = -15;
	},

	_createBoundryWalls : function()	{
		var geometry = {},
				material = null;

		geometry.vertical = new THREE.CubeGeometry(5, 30, 150);
		geometry.horizontal = new THREE.CubeGeometry(150, 30, 50);

		this._textures.walls.wrapS = this._textures.walls.wrapT = THREE.RepeatWrapping;
		material = new THREE.MeshBasicMaterial({ map: this._textures.walls });
		material.overdraw = true;

		this._gameElements.leftWall = this._gameElements.rightWall = new THREE.Mesh(geometry.horizontal, material);
		this._gameElements.frontWall = this._gameElements.backWall = new THREE.Mesh(geometry.vertical, material);

		this._gameElements.frontWall.position.z = 50;
		this._gameElements.backWall.position.z = -75;
		this._gameElements.rightWall.position.x = 75;
		this._gameElements.leftWall.position.x = -75;
	},

	_addGameElementsToScene : function()	{
		for(var element in this._gameElements)	{
			
		}
	},
	
	init : function()	{
		_placeCamera();
		_createFloorAndRoof();
		_createBoundryWalls();
	}

}