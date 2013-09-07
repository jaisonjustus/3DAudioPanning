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
		telephone : {
			source : 'telephone',
			pos : { x : 0, y : 0, z : -30 },
			gain : 0.3,
			loop : true,
			mode : '3D'
		},
		systemactivated : {
			source : 'systemactivated',
			pos : { x : 68, y : 0, z : 33 },
			gain : 0.3,
			loop : true,
			mode : '3D'
		},
		bgscore : {
			source : 'bgscore',
			pos : { x : 0, y : 0, z : 0 },
			gain : 1.5,
			loop : true,
			mode : '2D'
		}
	},

	_sounds : {},

	init : function()	{
		this._context = new AudioContext();
		this._createSoundNodes();
	},

	_createSoundNodes : function()	{
		for(var source in this._audioSources)	{
			var tempSource = {},
					pos = this._audioSources[source].pos;

			tempSource.source = this._context.createBufferSource();
			tempSource.volume = this._context.createGain();
			tempSource.volume.gain.value = this._audioSources[source].gain;

			if(this._audioSources[source].mode === '3D')	{
				tempSource.panner = this._context.createPanner();
				tempSource.source.connect(tempSource.volume);
				tempSource.volume.connect(tempSource.panner);
				tempSource.panner.connect(this._context.destination);
				tempSource.source.loop = this._audioSources[source].mode
				

				this._sounds[source] = tempSource;
				this.setAmbienceSounds(this._audioSources[source].source, pos.x, pos.y, pos.z);
				this._getSound(this._audioSources[source].source, this._attachSound, this);
			}else	{
				tempSource.source.connect(tempSource.volume);
				tempSource.volume.connect(this._context.destination);
				tempSource.source.loop = this._audioSources[source].mode

				this._sounds[source] = tempSource;
				this._getSound(this._audioSources[source].source, this._attachSound, this);
			}
		}
	},

	_attachSound : function()	{
		var that = this.context,
				sound = that._sounds[this.identifier],
				response = this.response;

		sound.source.buffer = that._context.createBuffer(response, false);
	  sound.source.start(that._context.currentTime);
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
	},

	setAmbienceSounds : function(identifier, x, y, z)	{
		this._sounds[identifier].x = x;
		this._sounds[identifier].y = y;
		this._sounds[identifier].z = z;
	}

};