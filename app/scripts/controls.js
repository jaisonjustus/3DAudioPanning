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

	_bind : function(context, callback)	{
		return function()	{
			callback.apply(context, arguments);
		}
	}
	
};