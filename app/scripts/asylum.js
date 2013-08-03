var TRON = TRON || {};

var Asylum = TRON.Asylum = {

	_cameraProperties : {
		fov : 45,
		aspect : (window.innerWidth + 48) / (window.innerHeight + 48),
		near : 1,
		far : 40000
	},

	_renderer : null,

	_scene : null,

	_camera : null,

	_placeCamera : function()	{
		this._camera.position.set(0,0,-70);
		this._camera.lookAt(new THREE.Vector3(0,0,0));
		this._scene.add(this._camera);
	},

	_gameElements : {},

	_textures : {
		floorAndRoof : new THREE.ImageUtils.loadTexture("images/floor-and-roof.png"),
		walls : new THREE.ImageUtils.loadTexture("images/wall.jpg")
	},

	_prepareBasicComponents : function()	{
		this._renderer = new THREE.WebGLRenderer();
		this._renderer.setSize(window.innerWidth - 2, window.innerHeight - 2);

		this._scene = new THREE.Scene();
		
		this._camera = new THREE.PerspectiveCamera(
			this._cameraProperties.fov,
			this._cameraProperties.aspect,
			this._cameraProperties.near,
			this._cameraProperties.far
		);
	},

	_prepareDOM : function()	{
		var container = document.getElementById('container');
		container.appendChild(this._renderer.domElement);
	},

	_createFloorAndRoof : function()	{
		var geometry = new THREE.CubeGeometry(150, 5, 500),
				material = null;

		this._textures.floorAndRoof.wrapS = this._textures.floorAndRoof.wrapT = THREE.RepeatWrapping;
		material = new THREE.MeshBasicMaterial({ map : this._textures.floorAndRoof });
		material.overdraw = true;

		this._gameElements.floor = new THREE.Mesh(geometry, material);
		this._gameElements.roof = new THREE.Mesh(geometry, material);
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

		this._gameElements.rightWall = new THREE.Mesh(geometry.horizontal, material)
		this._gameElements.leftWall = new THREE.Mesh(geometry.horizontal, material);
		this._gameElements.backWall = new THREE.Mesh(geometry.vertical, material);
		this._gameElements.frontWall = new THREE.Mesh(geometry.vertical, material);

		this._gameElements.frontWall.position.z = 50;
		this._gameElements.backWall.position.z = -75;
		this._gameElements.rightWall.position.x = 75;
		this._gameElements.leftWall.position.x = -75;
	},

	_addGameElementsToScene : function()	{
		for(var element in this._gameElements)	{
			this._scene.add(this._gameElements[element]);
		}
	},

	_render : function()	{
		this._renderer.render(this._scene, this._camera);
	},

	_animate : function()	{
		var that = this;

		requestAnimationFrame(TRON.Asylum._animate);
		TRON.Asylum._render();
	},
	
	init : function()	{
		this._prepareBasicComponents();
		this._prepareDOM();
		this._placeCamera();
		this._createFloorAndRoof();
		this._createBoundryWalls();
		this._addGameElementsToScene();
		this._animate();
	}

}