var Panner = Panner || {};

var Main = Panner.Main = {

	viewport : {
		width : window.innerWidth,
		height : window.innerHeight
	},

	renderer : null,

	scene : null,

	camera : null,

	canvas : document.getElementById('panner-canvas'),

	init : function()	{
		var self = this;

		this.scene = new THREE.Scene();
		this.renderer = new THREE.WebGLRenderer();
		this.camera = new THREE.PerspectiveCamera(45, self.viewport.width/self.viewport.height, 1, 1000)
	},

	render : function()	{
		this.init();

		this.camera.position.set(0,0,0);
		this.scene.add(this.camera);
		this.renderer.render(this.scene, this.camera);
		this.canvas.appendChild(this.renderer.domElement);
	}

};