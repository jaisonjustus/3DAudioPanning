/* Wrapping AudioCOntext. */
window.AudioContext = (
	window.AudioContext ||
	window.webkitAudioContext ||
	null
);

/* App namespace. */
var TRON = TRON || {};

/**
 * Module to handle the ambience for the asylum
 * @module Ambience
 * @namespance TRON
 */
var Ambience = TRON.Ambience = {

	_context : null,

	_audioSources : {
		telephone : 'telephone',
		systemactivated : 'systemactivated'
	},

	_sounds : {},

	init : function()	{
		this._context = new AudioContext();
		this._createSoundNodes();
	},

	_createSoundNodes : function()	{
		for(var source in this._audioSources)	{
			var tempSource = {};

			tempSource.source = this._context.createBufferSource();
			tempSource.volume = this._context.createGain();
			tempSource.panner = this._context.createPanner();

			tempSource.volume.gain.value = 5;
			tempSource.source.connect(tempSource.volume);
			tempSource.volume.connect(tempSource.panner);
			tempSource.panner.connect(this._context.destination);
			tempSource.source.loop = true;

			this._sounds[source] = tempSource;

			this._getSound(this._audioSources[source], this._attachSound, this);
		}
	},

	_attachSound : function()	{
		console.log(arguments);
	},

	_getSound : function(source, callback, context)	{

		var url = 'sounds/' + source + '.mp3',
				XHR = null;
				
		XHR = new XMLHttpRequest();
		XHR.open("GET", url, true);
		XHR.responseType = "arraybuffer";
		XHR.context = context;
		XHR.identifier = source;
		XHR.onload = callback;
		XHR.send();
	}

};