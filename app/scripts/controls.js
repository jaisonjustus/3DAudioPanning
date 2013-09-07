var TRON = TRON || {};

var Controls = TRON.Controls = {

	_onMouseMove : function()	{

	},

	_onKeyDown : function()	{

	},

	_onKeyUp : function()	{

	},

	init : function()	{
		document.addEventListener( 'mousemove', bind( this, this._onMouseMove ), false );
		document.addEventListener( 'keydown', bind( this, this._onKeyDown ), false );
		document.addEventListener( 'keyup', bind( this, this._onKeyUp ), false );	
	},

	controlRender : function()	{
		this.renderMouse();
		this.renderKeyboard();
	},

	renderMouse : function()	{

	},

	renderKeyboard : function()	{
		if(moveLeft) thetaD += 90;
		else if(moveRight) thetaD -= 90;
		else if(moveBackward) thetaD += 180;
		
		theta = thetaD * Math.PI / 180;
		movePoint = new THREE.Vector3(0,0,0);
		movePoint.set(Math.sin(theta), 0, Math.cos(theta));
		detectCollision(movePoint);
		
		if((moveForward || moveLeft || moveRight || moveBackward) && !collision)
		camera.position.add(this.movePoint);
		var p = camera.matrixWorld.getPosition();
		
		ctx.listener.setPosition(p.x, p.y, p.z);
	},

	_bind : function(context, callback)	{
		return function()	{
			callback.apply(context, arguments);
		}
	}
	
};